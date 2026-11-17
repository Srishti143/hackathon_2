import fs from 'fs';
import path from 'path';

// Manual .env.local parser
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error("❌ .env.local file not found!");
            return null;
        }
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Remove quotes
                env[key] = value;
            }
        });
        return env;
    } catch (err) {
        console.error("❌ Error reading .env.local:", err);
        return null;
    }
}

async function testConnection() {
    console.log("🔍 Starting Gemini API Diagnostic (Raw Fetch)...");

    const env = loadEnv();
    if (!env || !env.GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY not found in .env.local");
        return;
    }

    const apiKey = env.GEMINI_API_KEY;
    console.log(`🔑 API Key found: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        console.log("📡 Fetching models list...");
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`❌ API Request Failed: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Response:", text);
            return;
        }

        const data = await response.json();
        console.log("✅ API Connection Successful!");
        console.log(`📋 Found ${data.models ? data.models.length : 0} models.`);

        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => console.log(` - ${m.name.replace('models/', '')}`));
        }

        // Test Generation
        console.log("\n🧪 Testing Generation with gemini-flash-latest...");
        const genUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
        const genResponse = await fetch(genUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Hello, are you working?" }] }]
            })
        });

        if (!genResponse.ok) {
            const errorText = await genResponse.text();
            console.error(`❌ Generation Test Failed: ${genResponse.status}`);
            console.error(errorText);
        } else {
            const genData = await genResponse.json();
            console.log("✅ Generation Test Passed!");
            console.log("Response:", genData.candidates?.[0]?.content?.parts?.[0]?.text);
        }

    } catch (error) {
        console.error("❌ Network Error:", error.message);
    }
}

testConnection();
