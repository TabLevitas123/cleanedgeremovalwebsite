"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * FaqAccordion Component
 *
 * Displays a list of frequently asked questions in an accordion format.
 * Users can click on questions to expand/collapse the answers.
 */
const FaqAccordion = ({ faqs, initialOpenId }) => {
    const [openId, setOpenId] = (0, react_1.useState)(initialOpenId || null);
    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };
    return (<div className="space-y-4">
      {faqs.map((faq) => (<div key={faq.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
          <button className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors" onClick={() => toggleFaq(faq.id)} aria-expanded={openId === faq.id} aria-controls={`faq-answer-${faq.id}`}>
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              {faq.question}
            </span>
            <Icon_1.default name={openId === faq.id ? 'chevron-up' : 'chevron-down'} className="text-neutral-500 dark:text-neutral-400 flex-shrink-0 ml-2"/>
          </button>
          
          <div id={`faq-answer-${faq.id}`} className={`px-4 overflow-hidden transition-all duration-300 ${openId === faq.id
                ? 'max-h-96 pb-4'
                : 'max-h-0'}`}>
            <p className="text-neutral-600 dark:text-neutral-400">
              {faq.answer}
            </p>
          </div>
        </div>))}
    </div>);
};
exports.default = FaqAccordion;
//# sourceMappingURL=FaqAccordion.js.map