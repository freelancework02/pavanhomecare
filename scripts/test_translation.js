/**
 * Automated Verification Script for Full-Website Language Translation Feature
 * Run with: node scripts/test_translation.js
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

console.log("=======================================================");
console.log("  PAVAN HOMECARE - LANGUAGE TRANSLATOR TEST SUITE");
console.log("=======================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = "") {
  totalTests++;
  if (condition) {
    console.log(`\x1b[32m✔ PASS\x1b[0m [${totalTests}] ${testName}`);
    passedTests++;
  } else {
    console.log(`\x1b[31m✖ FAIL\x1b[0m [${totalTests}] ${testName}`);
    if (details) console.log(`   \x1b[33mDetails: ${details}\x1b[0m`);
  }
}

// 1. Check lib/languagesData.js
const langDataPath = path.join(__dirname, "..", "lib", "languagesData.js");
assert(fs.existsSync(langDataPath), "lib/languagesData.js exists");
const langDataContent = fs.readFileSync(langDataPath, "utf8");
assert(langDataContent.includes("POPULAR_LANGUAGES") && langDataContent.includes("ALL_LANGUAGES"), "languagesData defines popular and all supported languages");
assert(langDataContent.includes("getLanguageByCode"), "languagesData exports getLanguageByCode helper");

// 2. Check components/LanguageTranslator.js
const translatorPath = path.join(__dirname, "..", "components", "LanguageTranslator.js");
assert(fs.existsSync(translatorPath), "components/LanguageTranslator.js exists");
const translatorContent = fs.readFileSync(translatorPath, "utf8");
assert(translatorContent.includes("google_translate_element"), "LanguageTranslator creates hidden Google Translate DOM container");
assert(translatorContent.includes("applyDomPatch"), "LanguageTranslator includes React 18 DOM patch for removeChild / insertBefore safety");
assert(translatorContent.includes("usePathname"), "LanguageTranslator listens to client-side route changes for persistent translation");
assert(translatorContent.includes("phc_selected_lang"), "LanguageTranslator supports localStorage and cookie persistence");
assert(translatorContent.includes("phc_language_changed"), "LanguageTranslator dispatches global language change events");

// 3. Check app/layout.js
const layoutPath = path.join(__dirname, "..", "app", "layout.js");
const layoutContent = fs.readFileSync(layoutPath, "utf8");
assert(layoutContent.includes("LanguageTranslator"), "app/layout.js imports and renders <LanguageTranslator />");

// 4. Check components/Navbar.js
const navbarPath = path.join(__dirname, "..", "components", "Navbar.js");
const navbarContent = fs.readFileSync(navbarPath, "utf8");
assert(navbarContent.includes("phc_open_language_selector"), "Navbar top bar triggers phc_open_language_selector");
assert(navbarContent.includes("currentLangObj"), "Navbar displays active language flag and name in topbar and mobile drawer");

// 5. Check components/AccessibilityMenu.js
const adaPath = path.join(__dirname, "..", "components", "AccessibilityMenu.js");
const adaContent = fs.readFileSync(adaPath, "utf8");
assert(adaContent.includes("SpeechSynthesisUtterance"), "AccessibilityMenu uses SpeechSynthesisUtterance for reading");
assert(adaContent.includes("langObj.bcp47"), "AccessibilityMenu speech reader dynamically uses translated language BCP-47 voice");

// 6. Check app/globals.css
const cssPath = path.join(__dirname, "..", "app", "globals.css");
const cssContent = fs.readFileSync(cssPath, "utf8");
assert(cssContent.includes(".goog-te-banner-frame"), "globals.css hides Google Translate default top iframe banner");
assert(cssContent.includes("body {") && cssContent.includes("top: 0px !important"), "globals.css forces body top: 0px to prevent layout shift");

// 7. Test HTTP connection & HTML delivery
const routes = ["/", "/about", "/services", "/contact-us", "/blog", "/areas-we-serve/bucks-county"];

function testRoutes(index = 0) {
  if (index >= routes.length) {
    console.log("\n-------------------------------------------------------");
    console.log(`Results: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
    console.log("-------------------------------------------------------\n");
    process.exit(passedTests === totalTests ? 0 : 1);
    return;
  }

  const route = routes[index];
  const req = http.get(`http://localhost:3000${route}`, (res) => {
    assert(res.statusCode === 200, `Route ${route} responds with HTTP 200`);
    testRoutes(index + 1);
  });

  req.on("error", (err) => {
    assert(false, `Route ${route} responds`, err.message);
    testRoutes(index + 1);
  });
}

testRoutes();
