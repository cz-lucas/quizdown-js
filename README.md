# quizdown 

> Markdownish syntax to instantly create simple interactive quiz apps for your static website.

I'm working on this project in my free time to learn more about modern web development and languages. This is a toy project and should not be used in serious projects for now. 

### 🚀 Try the [quizdown live editor](https://bonartm.github.io/quizdown-live-editor/)

- supports markdown text formatting, images, syntax highlighting and math rendering.
- different [quiz-types](./docs/syntax.md): single-choice, multiple-choice, sequence.
- support for [hints and explanations](./docs/syntax.md#hints-and-comments).
- [options](./docs/options.md) for color theme, question shuffling, localization.
- can be easily included in any website, static site generator or [other web projects](./docs/module_import.md).
- mobile friendly with touch support for all question types.

## Usage

quizdown is easy to setup and best used in combination with existing static site generators like *Jekyll*, *Hugo* or *Sphinx*. Check out the extensions
[hugo-quiz](https://github.com/bonartm/hugo-quiz) and [sphinxcontrib-quizdown](https://github.com/bonartm/sphinxcontrib-quizdown).

### 📚 [Documentation](./docs/)



## Stand-alone Example


To keep the bundle size low, syntax highlighting and math rendering are implemented in separate extensions that can be loaded and registered manually if needed: 

```html
<head>
	...
    <script src="./build/quizdown.js"></script>
	<script src="./build/extensions/quizdownKatex.js"></script>
	<script src="./build/extensions/quizdownHighlight.js"></script>
	<script>
		quizdown.register(quizdownKatex).register(quizdownHighlight).init();
	</script>
	...
</head>
```

Write questions within a `quizdown` class (edit in the [🚀quizdown editor](https://bonartm.github.io/quizdown-live-editor/?code=---%0AprimaryColor%3A%20steelblue%0AshuffleQuestions%3A%20false%0AshuffleAnswers%3A%20true%0A---%0A%0A%23%23%23%20Select%20your%20superpowers!%0A%0A-%20%5B%20%5D%20Enhanced%20Strength%0A-%20%5B%20%5D%20Levitation%0A-%20%5Bx%5D%20Shapeshifting%0A%0A%23%23%23%20What%27s%20the%20capital%20of%20Germany%3F%0A%0A%3E%20Hint%3A%20The%20_largest_%20city%20in%20Germany...%0A%0A1.%20%5Bx%5D%20Berlin%0A1.%20%5B%20%5D%20Frankfurt%0A1.%20%5B%20%5D%20Paris%0A1.%20%5B%20%5D%20Cologne)):

```html
...
<div class="quizdown">
	---
	primaryColor: steelblue
	shuffleQuestions: false
	shuffleAnswers: true
	---

	### Select your superpowers!

	- [ ] Enhanced Strength
	- [ ] Levitation
	- [x] Shapeshifting

	### What's the capital of Germany?

	> Hint: The _largest_ city in Germany...

	1. [x] Berlin
	1. [ ] Frankfurt
	1. [ ] Paris
	1. [ ] Cologne
</div>
...
```

## Register a new language
You can register a new language that is supported by highlight.js with 
``` javascript
// Parameters: name of the language, hljsDefineRobot-method
quizdownHighlight.registerHljsLanguage("robot", hljsDefineRobot);
```

## Set the theme for hljs
You can change the highlight.js with
``` javascript
// Parameters: the path/url the the theme
quizdownHighlight.setTheme("https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.css");
```

## Contributing

Pull requests and feature requests are welcome. For major changes, please open an issue first to discuss what you would like to change. I'm happy for any feedback on how to improve the code base. 

### Wish List

- support for videos via youtube api (https://github.com/bonartm/quizdown-js/issues/10)
- customizable reward page at the end of the quiz (https://github.com/bonartm/quizdown-js/issues/14)
- fill in the blanks quiz (https://github.com/bonartm/quizdown-js/issues/17)
- link quizzes on different pages together via a results summary page (https://github.com/bonartm/quizdown-js/issues/18)

### How To

After cloning, install the packages with 

```bash
npm install
```

Build the library with

```bash
npm run build
```

You can also preview a live version with

```bash
npm run dev
```


## Credits

Inspired by the [mermaid library](https://mermaid-js.github.io/mermaid/#/) and the python package [quizdown](https://github.com/jjfiv/quizdown).
