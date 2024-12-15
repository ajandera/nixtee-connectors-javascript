const NixteeClient = require("./NixteeClient");

async function main() {
  const client = new NixteeClient();

  try {
    // Authenticate and get token
    const token = await client.authorize("user@example.com", "password123");
    console.log("Token:", token);

    // Example of using the train function
    const trainResponse = await client.train({ data: "your training data here" });
    console.log("Train response:", trainResponse);

    // Other functions can be used similarly
    // const saveResponse = await client.save("modelId", { param: "value" });
    // const loadResponse = await client.load("modelId");
    // const predictResponse = await client.predict("modelId", { input: "data" });
    // const classifyResponse = await client.classify("modelId", { input: "data" });

  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
