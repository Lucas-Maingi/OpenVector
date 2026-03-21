const crypto = require('crypto');

/**
 * Technical Proof of Immutability
 * This script demonstrates the SHA-256 sensitivity to data tampering.
 */

function generateHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
}

const originalContent = "Target email identified: maingilucas0@gmail.com. Source: GitHub.";
const originalHash = generateHash(originalContent);

console.log("=== Forensic Integrity Test ===");
console.log("Original Content:", originalContent);
console.log("Original Hash:   ", originalHash);

// Scenario: Someone tries to change the email in the content
const tamperedContent = "Target email identified: attacker@evil.com. Source: GitHub.";
const tamperedHash = generateHash(tamperedContent);

console.log("\n--- Tampering Attempt detected ---");
console.log("Tampered Content:", tamperedContent);
console.log("New Hash:        ", tamperedHash);

if (originalHash !== tamperedHash) {
    console.log("\n✅ SUCCESS: Cryptographic signature correctly identified the data mutation.");
} else {
    console.log("\n❌ FAILURE: Hash collision or logic error.");
}
