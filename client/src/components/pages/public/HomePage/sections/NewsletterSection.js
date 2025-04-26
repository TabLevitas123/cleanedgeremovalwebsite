"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NewsletterSignup_1 = __importDefault(require("../../../../molecules/NewsletterSignup")); // Corrected path again
const NewsletterSection = () => {
    return (<section className="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Render the NewsletterSignup molecule */}
          <NewsletterSignup_1.default />
        </div>
      </div>
    </section>);
};
exports.default = NewsletterSection;
//# sourceMappingURL=NewsletterSection.js.map