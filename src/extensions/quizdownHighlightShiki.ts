import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import batch from 'highlight.js/lib/languages/dos';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import type { QuizdownExtension } from '../quizdown.js';

// this does not work....
// ['javascript', 'python', 'bash'].forEach(async (langName) => {
//     const langModule = await import(`highlight.js/lib/languages/${langName}`);
//     hljs.registerLanguage(langName, langModule);
// });

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('batch', batch);
hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);

function highlighter(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(code, { language: validLanguage }).value;
}

interface QuizdownHighlightExtension extends QuizdownExtension {
    registerHljsLanguage(name: string, lang: (hljs: object) => any);
    setTheme(theme: string);
}

let quizdownHighlight: QuizdownHighlightExtension = {
    setup: function (quizdown) {
        quizdown
            .getMarkedParser()
            .setOptions({ highlight: highlighter, langPrefix: 'hljs lang-' });
    },
    /**
    * Registers a custom language definition for highlight.js to be used with quizdown.
    *
    * @param name - The name of the custom language. This will be used in code blocks.
    * @param lang - A function that receives the hljs instance and returns a language definition object.
    *               This defines the syntax highlighting rules for the custom language.
    */
    registerHljsLanguage: function (name: string, lang: (hljs: object) => any) {
        if (typeof lang === "function") {
            hljs.registerLanguage(name, lang);
        } else {
            console.error(name + " can't be registerd");
        }
    },
    /*
    * Sets the theme.
    * @param theme - The path or URL (e.g. jsdelivr to the theme)
    */
    async setTheme(theme) {
        if (!theme.endsWith(".css")) {
            console.error("Theme is not a css file");
            return;
        }

        // Find the shadow host element (change the selector as needed)
        const shadowHost = document.querySelector('.quizdown');
        if (!shadowHost || !shadowHost.shadowRoot) {
            console.error("Shadow root not found");
            return;
        }
        const shadowRoot = shadowHost.shadowRoot;

        // Remove previous theme style (if any)
        const oldStyle = shadowRoot.querySelector('style[data-hljs-theme]');

        if (oldStyle) oldStyle.remove();

        try {
            const cssText = await fetch(theme).then(res => res.text());
            const styleTag = document.createElement('style');
            styleTag.setAttribute('data-hljs-theme', theme);
            styleTag.textContent = cssText;
            shadowRoot.appendChild(styleTag);
        } catch (e) {
            console.error("Failed to fetch or apply theme CSS:", e);
        }
    }
};

export default quizdownHighlight;
