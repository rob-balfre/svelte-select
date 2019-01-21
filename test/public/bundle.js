(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var svelte = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		factory(exports);
	}(commonjsGlobal, (function (exports) {
		function assign(tar, src) {
			for (var k in src) tar[k] = src[k];
			return tar;
		}

		// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2

		const now = (typeof process !== 'undefined' && process.hrtime)
		    ? () => {
		        const t = process.hrtime();
		        return t[0] * 1e3 + t[1] / 1e6;
		    }
		    : () => self.performance.now();
		function collapseTimings(timings) {
		    const result = {};
		    timings.forEach(timing => {
		        result[timing.label] = Object.assign({
		            total: timing.end - timing.start
		        }, timing.children && collapseTimings(timing.children));
		    });
		    return result;
		}
		class Stats {
		    constructor({ onwarn }) {
		        this.startTime = now();
		        this.stack = [];
		        this.currentChildren = this.timings = [];
		        this.onwarn = onwarn;
		        this.warnings = [];
		    }
		    start(label) {
		        const timing = {
		            label,
		            start: now(),
		            end: null,
		            children: []
		        };
		        this.currentChildren.push(timing);
		        this.stack.push(timing);
		        this.currentTiming = timing;
		        this.currentChildren = timing.children;
		    }
		    stop(label) {
		        if (label !== this.currentTiming.label) {
		            throw new Error(`Mismatched timing labels (expected ${this.currentTiming.label}, got ${label})`);
		        }
		        this.currentTiming.end = now();
		        this.stack.pop();
		        this.currentTiming = this.stack[this.stack.length - 1];
		        this.currentChildren = this.currentTiming ? this.currentTiming.children : this.timings;
		    }
		    render(component) {
		        const timings = Object.assign({
		            total: now() - this.startTime
		        }, collapseTimings(this.timings));
		        // TODO would be good to have this info even
		        // if options.generate is false
		        const imports = component && component.imports.map(node => {
		            return {
		                source: node.source.value,
		                specifiers: node.specifiers.map(specifier => {
		                    return {
		                        name: (specifier.type === 'ImportDefaultSpecifier' ? 'default' :
		                            specifier.type === 'ImportNamespaceSpecifier' ? '*' :
		                                specifier.imported.name),
		                        as: specifier.local.name
		                    };
		                })
		            };
		        });
		        const hooks = component && {
		            oncreate: !!component.templateProperties.oncreate,
		            ondestroy: !!component.templateProperties.ondestroy,
		            onstate: !!component.templateProperties.onstate,
		            onupdate: !!component.templateProperties.onupdate
		        };
		        const computed = new Set(component.computations.map(c => c.key));
		        return {
		            props: Array.from(component.expectedProperties).filter(key => !computed.has(key)),
		            timings,
		            warnings: this.warnings,
		            imports,
		            hooks
		        };
		    }
		    warn(warning) {
		        this.warnings.push(warning);
		        this.onwarn(warning);
		    }
		}

		// Reserved word lists for various dialects of the language

		var reservedWords = {
		  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
		  5: "class enum extends super const export import",
		  6: "enum",
		  strict: "implements interface let package private protected public static yield",
		  strictBind: "eval arguments"
		};

		// And the keywords

		var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

		var keywords = {
		  5: ecma5AndLessKeywords,
		  6: ecma5AndLessKeywords + " const class extends export import super"
		};

		var keywordRelationalOperator = /^in(stanceof)?$/;

		// ## Character categories

		// Big ugly regular expressions that match characters in the
		// whitespace, identifier, and identifier-start categories. These
		// are only applied when a character is found to actually have a
		// code point above 128.
		// Generated by `bin/generate-identifier-regex.js`.

		var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08bd\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fef\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7b9\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
		var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";

		var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
		var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

		nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

		// These are a run-length and offset encoded representation of the
		// >0xffff code points that are a valid part of identifiers. The
		// offset starts at 0x10000, and each pair of numbers represents an
		// offset to the next range, and then a size of the range. They were
		// generated by bin/generate-identifier-regex.js

		// eslint-disable-next-line comma-spacing
		var astralIdentifierStartCodes = [0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,477,28,11,0,9,21,190,52,76,44,33,24,27,35,30,0,12,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,26,230,43,117,63,32,0,257,0,11,39,8,0,22,0,12,39,3,3,20,0,35,56,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,270,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,689,63,129,68,12,0,67,12,65,1,31,6129,15,754,9486,286,82,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,15,7472,3104,541];

		// eslint-disable-next-line comma-spacing
		var astralIdentifierCodes = [509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,525,10,176,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,4,9,83,11,7,0,161,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,280,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,19306,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239];

		// This has a complexity linear to the value of the code. The
		// assumption is that looking up astral identifier characters is
		// rare.
		function isInAstralSet(code, set) {
		  var pos = 0x10000;
		  for (var i = 0; i < set.length; i += 2) {
		    pos += set[i];
		    if (pos > code) { return false }
		    pos += set[i + 1];
		    if (pos >= code) { return true }
		  }
		}

		// Test whether a given character code starts an identifier.

		function isIdentifierStart(code, astral) {
		  if (code < 65) { return code === 36 }
		  if (code < 91) { return true }
		  if (code < 97) { return code === 95 }
		  if (code < 123) { return true }
		  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code)) }
		  if (astral === false) { return false }
		  return isInAstralSet(code, astralIdentifierStartCodes)
		}

		// Test whether a given character is part of an identifier.

		function isIdentifierChar(code, astral) {
		  if (code < 48) { return code === 36 }
		  if (code < 58) { return true }
		  if (code < 65) { return false }
		  if (code < 91) { return true }
		  if (code < 97) { return code === 95 }
		  if (code < 123) { return true }
		  if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
		  if (astral === false) { return false }
		  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
		}

		// ## Token types

		// The assignment of fine-grained, information-carrying type objects
		// allows the tokenizer to store the information it has about a
		// token in a way that is very cheap for the parser to look up.

		// All token type variables start with an underscore, to make them
		// easy to recognize.

		// The `beforeExpr` property is used to disambiguate between regular
		// expressions and divisions. It is set on all token types that can
		// be followed by an expression (thus, a slash after them would be a
		// regular expression).
		//
		// The `startsExpr` property is used to check if the token ends a
		// `yield` expression. It is set on all token types that either can
		// directly start an expression (like a quotation mark) or can
		// continue an expression (like the body of a string).
		//
		// `isLoop` marks a keyword as starting a loop, which is important
		// to know when parsing a label, in order to allow or disallow
		// continue jumps to that label.

		var TokenType = function TokenType(label, conf) {
		  if ( conf === void 0 ) conf = {};

		  this.label = label;
		  this.keyword = conf.keyword;
		  this.beforeExpr = !!conf.beforeExpr;
		  this.startsExpr = !!conf.startsExpr;
		  this.isLoop = !!conf.isLoop;
		  this.isAssign = !!conf.isAssign;
		  this.prefix = !!conf.prefix;
		  this.postfix = !!conf.postfix;
		  this.binop = conf.binop || null;
		  this.updateContext = null;
		};

		function binop(name, prec) {
		  return new TokenType(name, {beforeExpr: true, binop: prec})
		}
		var beforeExpr = {beforeExpr: true};
		var startsExpr = {startsExpr: true};

		// Map keyword names to token types.

		var keywords$1 = {};

		// Succinct definitions of keyword token types
		function kw(name, options) {
		  if ( options === void 0 ) options = {};

		  options.keyword = name;
		  return keywords$1[name] = new TokenType(name, options)
		}

		var types = {
		  num: new TokenType("num", startsExpr),
		  regexp: new TokenType("regexp", startsExpr),
		  string: new TokenType("string", startsExpr),
		  name: new TokenType("name", startsExpr),
		  eof: new TokenType("eof"),

		  // Punctuation token types.
		  bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}),
		  bracketR: new TokenType("]"),
		  braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}),
		  braceR: new TokenType("}"),
		  parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}),
		  parenR: new TokenType(")"),
		  comma: new TokenType(",", beforeExpr),
		  semi: new TokenType(";", beforeExpr),
		  colon: new TokenType(":", beforeExpr),
		  dot: new TokenType("."),
		  question: new TokenType("?", beforeExpr),
		  arrow: new TokenType("=>", beforeExpr),
		  template: new TokenType("template"),
		  invalidTemplate: new TokenType("invalidTemplate"),
		  ellipsis: new TokenType("...", beforeExpr),
		  backQuote: new TokenType("`", startsExpr),
		  dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}),

		  // Operators. These carry several kinds of properties to help the
		  // parser use them properly (the presence of these properties is
		  // what categorizes them as operators).
		  //
		  // `binop`, when present, specifies that this operator is a binary
		  // operator, and will refer to its precedence.
		  //
		  // `prefix` and `postfix` mark the operator as a prefix or postfix
		  // unary operator.
		  //
		  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
		  // binary operators with a very low precedence, that should result
		  // in AssignmentExpression nodes.

		  eq: new TokenType("=", {beforeExpr: true, isAssign: true}),
		  assign: new TokenType("_=", {beforeExpr: true, isAssign: true}),
		  incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}),
		  prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true}),
		  logicalOR: binop("||", 1),
		  logicalAND: binop("&&", 2),
		  bitwiseOR: binop("|", 3),
		  bitwiseXOR: binop("^", 4),
		  bitwiseAND: binop("&", 5),
		  equality: binop("==/!=/===/!==", 6),
		  relational: binop("</>/<=/>=", 7),
		  bitShift: binop("<</>>/>>>", 8),
		  plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true}),
		  modulo: binop("%", 10),
		  star: binop("*", 10),
		  slash: binop("/", 10),
		  starstar: new TokenType("**", {beforeExpr: true}),

		  // Keyword token types.
		  _break: kw("break"),
		  _case: kw("case", beforeExpr),
		  _catch: kw("catch"),
		  _continue: kw("continue"),
		  _debugger: kw("debugger"),
		  _default: kw("default", beforeExpr),
		  _do: kw("do", {isLoop: true, beforeExpr: true}),
		  _else: kw("else", beforeExpr),
		  _finally: kw("finally"),
		  _for: kw("for", {isLoop: true}),
		  _function: kw("function", startsExpr),
		  _if: kw("if"),
		  _return: kw("return", beforeExpr),
		  _switch: kw("switch"),
		  _throw: kw("throw", beforeExpr),
		  _try: kw("try"),
		  _var: kw("var"),
		  _const: kw("const"),
		  _while: kw("while", {isLoop: true}),
		  _with: kw("with"),
		  _new: kw("new", {beforeExpr: true, startsExpr: true}),
		  _this: kw("this", startsExpr),
		  _super: kw("super", startsExpr),
		  _class: kw("class", startsExpr),
		  _extends: kw("extends", beforeExpr),
		  _export: kw("export"),
		  _import: kw("import"),
		  _null: kw("null", startsExpr),
		  _true: kw("true", startsExpr),
		  _false: kw("false", startsExpr),
		  _in: kw("in", {beforeExpr: true, binop: 7}),
		  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
		  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
		  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
		  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
		};

		// Matches a whole line break (where CRLF is considered a single
		// line break). Used to count lines.

		var lineBreak = /\r\n?|\n|\u2028|\u2029/;
		var lineBreakG = new RegExp(lineBreak.source, "g");

		function isNewLine(code, ecma2019String) {
		  return code === 10 || code === 13 || (!ecma2019String && (code === 0x2028 || code === 0x2029))
		}

		var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

		var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

		var ref = Object.prototype;
		var hasOwnProperty = ref.hasOwnProperty;
		var toString = ref.toString;

		// Checks if an object has a property.

		function has(obj, propName) {
		  return hasOwnProperty.call(obj, propName)
		}

		var isArray = Array.isArray || (function (obj) { return (
		  toString.call(obj) === "[object Array]"
		); });

		// These are used when `options.locations` is on, for the
		// `startLoc` and `endLoc` properties.

		var Position = function Position(line, col) {
		  this.line = line;
		  this.column = col;
		};

		Position.prototype.offset = function offset (n) {
		  return new Position(this.line, this.column + n)
		};

		var SourceLocation = function SourceLocation(p, start, end) {
		  this.start = start;
		  this.end = end;
		  if (p.sourceFile !== null) { this.source = p.sourceFile; }
		};

		// The `getLineInfo` function is mostly useful when the
		// `locations` option is off (for performance reasons) and you
		// want to find the line/column position for a given character
		// offset. `input` should be the code string that the offset refers
		// into.

		function getLineInfo(input, offset) {
		  for (var line = 1, cur = 0;;) {
		    lineBreakG.lastIndex = cur;
		    var match = lineBreakG.exec(input);
		    if (match && match.index < offset) {
		      ++line;
		      cur = match.index + match[0].length;
		    } else {
		      return new Position(line, offset - cur)
		    }
		  }
		}

		// A second optional argument can be given to further configure
		// the parser process. These options are recognized:

		var defaultOptions = {
		  // `ecmaVersion` indicates the ECMAScript version to parse. Must
		  // be either 3, 5, 6 (2015), 7 (2016), or 8 (2017). This influences support
		  // for strict mode, the set of reserved words, and support for
		  // new syntax features. The default is 7.
		  ecmaVersion: 7,
		  // `sourceType` indicates the mode the code should be parsed in.
		  // Can be either `"script"` or `"module"`. This influences global
		  // strict mode and parsing of `import` and `export` declarations.
		  sourceType: "script",
		  // `onInsertedSemicolon` can be a callback that will be called
		  // when a semicolon is automatically inserted. It will be passed
		  // th position of the comma as an offset, and if `locations` is
		  // enabled, it is given the location as a `{line, column}` object
		  // as second argument.
		  onInsertedSemicolon: null,
		  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
		  // trailing commas.
		  onTrailingComma: null,
		  // By default, reserved words are only enforced if ecmaVersion >= 5.
		  // Set `allowReserved` to a boolean value to explicitly turn this on
		  // an off. When this option has the value "never", reserved words
		  // and keywords can also not be used as property names.
		  allowReserved: null,
		  // When enabled, a return at the top level is not considered an
		  // error.
		  allowReturnOutsideFunction: false,
		  // When enabled, import/export statements are not constrained to
		  // appearing at the top of the program.
		  allowImportExportEverywhere: false,
		  // When enabled, await identifiers are allowed to appear at the top-level scope,
		  // but they are still not allowed in non-async functions.
		  allowAwaitOutsideFunction: false,
		  // When enabled, hashbang directive in the beginning of file
		  // is allowed and treated as a line comment.
		  allowHashBang: false,
		  // When `locations` is on, `loc` properties holding objects with
		  // `start` and `end` properties in `{line, column}` form (with
		  // line being 1-based and column 0-based) will be attached to the
		  // nodes.
		  locations: false,
		  // A function can be passed as `onToken` option, which will
		  // cause Acorn to call that function with object in the same
		  // format as tokens returned from `tokenizer().getToken()`. Note
		  // that you are not allowed to call the parser from the
		  // callback—that will corrupt its internal state.
		  onToken: null,
		  // A function can be passed as `onComment` option, which will
		  // cause Acorn to call that function with `(block, text, start,
		  // end)` parameters whenever a comment is skipped. `block` is a
		  // boolean indicating whether this is a block (`/* */`) comment,
		  // `text` is the content of the comment, and `start` and `end` are
		  // character offsets that denote the start and end of the comment.
		  // When the `locations` option is on, two more parameters are
		  // passed, the full `{line, column}` locations of the start and
		  // end of the comments. Note that you are not allowed to call the
		  // parser from the callback—that will corrupt its internal state.
		  onComment: null,
		  // Nodes have their start and end characters offsets recorded in
		  // `start` and `end` properties (directly on the node, rather than
		  // the `loc` object, which holds line/column data. To also add a
		  // [semi-standardized][range] `range` property holding a `[start,
		  // end]` array with the same numbers, set the `ranges` option to
		  // `true`.
		  //
		  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
		  ranges: false,
		  // It is possible to parse multiple files into a single AST by
		  // passing the tree produced by parsing the first file as
		  // `program` option in subsequent parses. This will add the
		  // toplevel forms of the parsed file to the `Program` (top) node
		  // of an existing parse tree.
		  program: null,
		  // When `locations` is on, you can pass this to record the source
		  // file in every node's `loc` object.
		  sourceFile: null,
		  // This value, if given, is stored in every node, whether
		  // `locations` is on or off.
		  directSourceFile: null,
		  // When enabled, parenthesized expressions are represented by
		  // (non-standard) ParenthesizedExpression nodes
		  preserveParens: false,
		  plugins: {}
		};

		// Interpret and default an options object

		function getOptions(opts) {
		  var options = {};

		  for (var opt in defaultOptions)
		    { options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt]; }

		  if (options.ecmaVersion >= 2015)
		    { options.ecmaVersion -= 2009; }

		  if (options.allowReserved == null)
		    { options.allowReserved = options.ecmaVersion < 5; }

		  if (isArray(options.onToken)) {
		    var tokens = options.onToken;
		    options.onToken = function (token) { return tokens.push(token); };
		  }
		  if (isArray(options.onComment))
		    { options.onComment = pushComment(options, options.onComment); }

		  return options
		}

		function pushComment(options, array) {
		  return function(block, text, start, end, startLoc, endLoc) {
		    var comment = {
		      type: block ? "Block" : "Line",
		      value: text,
		      start: start,
		      end: end
		    };
		    if (options.locations)
		      { comment.loc = new SourceLocation(this, startLoc, endLoc); }
		    if (options.ranges)
		      { comment.range = [start, end]; }
		    array.push(comment);
		  }
		}

		// Registered plugins
		var plugins = {};

		function keywordRegexp(words) {
		  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
		}

		var Parser = function Parser(options, input, startPos) {
		  this.options = options = getOptions(options);
		  this.sourceFile = options.sourceFile;
		  this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
		  var reserved = "";
		  if (!options.allowReserved) {
		    for (var v = options.ecmaVersion;; v--)
		      { if (reserved = reservedWords[v]) { break } }
		    if (options.sourceType === "module") { reserved += " await"; }
		  }
		  this.reservedWords = keywordRegexp(reserved);
		  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
		  this.reservedWordsStrict = keywordRegexp(reservedStrict);
		  this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind);
		  this.input = String(input);

		  // Used to signal to callers of `readWord1` whether the word
		  // contained any escape sequences. This is needed because words with
		  // escape sequences must not be interpreted as keywords.
		  this.containsEsc = false;

		  // Load plugins
		  this.loadPlugins(options.plugins);

		  // Set up token state

		  // The current position of the tokenizer in the input.
		  if (startPos) {
		    this.pos = startPos;
		    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
		    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
		  } else {
		    this.pos = this.lineStart = 0;
		    this.curLine = 1;
		  }

		  // Properties of the current token:
		  // Its type
		  this.type = types.eof;
		  // For tokens that include more information than their type, the value
		  this.value = null;
		  // Its start and end offset
		  this.start = this.end = this.pos;
		  // And, if locations are used, the {line, column} object
		  // corresponding to those offsets
		  this.startLoc = this.endLoc = this.curPosition();

		  // Position information for the previous token
		  this.lastTokEndLoc = this.lastTokStartLoc = null;
		  this.lastTokStart = this.lastTokEnd = this.pos;

		  // The context stack is used to superficially track syntactic
		  // context to predict whether a regular expression is allowed in a
		  // given position.
		  this.context = this.initialContext();
		  this.exprAllowed = true;

		  // Figure out if it's a module code.
		  this.inModule = options.sourceType === "module";
		  this.strict = this.inModule || this.strictDirective(this.pos);

		  // Used to signify the start of a potential arrow function
		  this.potentialArrowAt = -1;

		  // Flags to track whether we are in a function, a generator, an async function.
		  this.inFunction = this.inGenerator = this.inAsync = false;
		  // Positions to delayed-check that yield/await does not exist in default parameters.
		  this.yieldPos = this.awaitPos = 0;
		  // Labels in scope.
		  this.labels = [];

		  // If enabled, skip leading hashbang line.
		  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
		    { this.skipLineComment(2); }

		  // Scope tracking for duplicate variable names (see scope.js)
		  this.scopeStack = [];
		  this.enterFunctionScope();

		  // For RegExp validation
		  this.regexpState = null;
		};

		// DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
		Parser.prototype.isKeyword = function isKeyword (word) { return this.keywords.test(word) };
		Parser.prototype.isReservedWord = function isReservedWord (word) { return this.reservedWords.test(word) };

		Parser.prototype.extend = function extend (name, f) {
		  this[name] = f(this[name]);
		};

		Parser.prototype.loadPlugins = function loadPlugins (pluginConfigs) {
		    var this$1 = this;

		  for (var name in pluginConfigs) {
		    var plugin = plugins[name];
		    if (!plugin) { throw new Error("Plugin '" + name + "' not found") }
		    plugin(this$1, pluginConfigs[name]);
		  }
		};

		Parser.prototype.parse = function parse () {
		  var node = this.options.program || this.startNode();
		  this.nextToken();
		  return this.parseTopLevel(node)
		};

		var pp = Parser.prototype;

		// ## Parser utilities

		var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/;
		pp.strictDirective = function(start) {
		  var this$1 = this;

		  for (;;) {
		    skipWhiteSpace.lastIndex = start;
		    start += skipWhiteSpace.exec(this$1.input)[0].length;
		    var match = literal.exec(this$1.input.slice(start));
		    if (!match) { return false }
		    if ((match[1] || match[2]) === "use strict") { return true }
		    start += match[0].length;
		  }
		};

		// Predicate that tests whether the next token is of the given
		// type, and if yes, consumes it as a side effect.

		pp.eat = function(type) {
		  if (this.type === type) {
		    this.next();
		    return true
		  } else {
		    return false
		  }
		};

		// Tests whether parsed token is a contextual keyword.

		pp.isContextual = function(name) {
		  return this.type === types.name && this.value === name && !this.containsEsc
		};

		// Consumes contextual keyword if possible.

		pp.eatContextual = function(name) {
		  if (!this.isContextual(name)) { return false }
		  this.next();
		  return true
		};

		// Asserts that following token is given contextual keyword.

		pp.expectContextual = function(name) {
		  if (!this.eatContextual(name)) { this.unexpected(); }
		};

		// Test whether a semicolon can be inserted at the current position.

		pp.canInsertSemicolon = function() {
		  return this.type === types.eof ||
		    this.type === types.braceR ||
		    lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
		};

		pp.insertSemicolon = function() {
		  if (this.canInsertSemicolon()) {
		    if (this.options.onInsertedSemicolon)
		      { this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc); }
		    return true
		  }
		};

		// Consume a semicolon, or, failing that, see if we are allowed to
		// pretend that there is a semicolon at this position.

		pp.semicolon = function() {
		  if (!this.eat(types.semi) && !this.insertSemicolon()) { this.unexpected(); }
		};

		pp.afterTrailingComma = function(tokType, notNext) {
		  if (this.type === tokType) {
		    if (this.options.onTrailingComma)
		      { this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc); }
		    if (!notNext)
		      { this.next(); }
		    return true
		  }
		};

		// Expect a token of a given type. If found, consume it, otherwise,
		// raise an unexpected token error.

		pp.expect = function(type) {
		  this.eat(type) || this.unexpected();
		};

		// Raise an unexpected token error.

		pp.unexpected = function(pos) {
		  this.raise(pos != null ? pos : this.start, "Unexpected token");
		};

		function DestructuringErrors() {
		  this.shorthandAssign =
		  this.trailingComma =
		  this.parenthesizedAssign =
		  this.parenthesizedBind =
		  this.doubleProto =
		    -1;
		}

		pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
		  if (!refDestructuringErrors) { return }
		  if (refDestructuringErrors.trailingComma > -1)
		    { this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element"); }
		  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
		  if (parens > -1) { this.raiseRecoverable(parens, "Parenthesized pattern"); }
		};

		pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
		  if (!refDestructuringErrors) { return false }
		  var shorthandAssign = refDestructuringErrors.shorthandAssign;
		  var doubleProto = refDestructuringErrors.doubleProto;
		  if (!andThrow) { return shorthandAssign >= 0 || doubleProto >= 0 }
		  if (shorthandAssign >= 0)
		    { this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"); }
		  if (doubleProto >= 0)
		    { this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property"); }
		};

		pp.checkYieldAwaitInDefaultParams = function() {
		  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
		    { this.raise(this.yieldPos, "Yield expression cannot be a default value"); }
		  if (this.awaitPos)
		    { this.raise(this.awaitPos, "Await expression cannot be a default value"); }
		};

		pp.isSimpleAssignTarget = function(expr) {
		  if (expr.type === "ParenthesizedExpression")
		    { return this.isSimpleAssignTarget(expr.expression) }
		  return expr.type === "Identifier" || expr.type === "MemberExpression"
		};

		var pp$1 = Parser.prototype;

		// ### Statement parsing

		// Parse a program. Initializes the parser, reads any number of
		// statements, and wraps them in a Program node.  Optionally takes a
		// `program` argument.  If present, the statements will be appended
		// to its body instead of creating a new node.

		pp$1.parseTopLevel = function(node) {
		  var this$1 = this;

		  var exports = {};
		  if (!node.body) { node.body = []; }
		  while (this.type !== types.eof) {
		    var stmt = this$1.parseStatement(true, true, exports);
		    node.body.push(stmt);
		  }
		  this.adaptDirectivePrologue(node.body);
		  this.next();
		  if (this.options.ecmaVersion >= 6) {
		    node.sourceType = this.options.sourceType;
		  }
		  return this.finishNode(node, "Program")
		};

		var loopLabel = {kind: "loop"};
		var switchLabel = {kind: "switch"};

		pp$1.isLet = function() {
		  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) { return false }
		  skipWhiteSpace.lastIndex = this.pos;
		  var skip = skipWhiteSpace.exec(this.input);
		  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
		  if (nextCh === 91 || nextCh === 123) { return true } // '{' and '['
		  if (isIdentifierStart(nextCh, true)) {
		    var pos = next + 1;
		    while (isIdentifierChar(this.input.charCodeAt(pos), true)) { ++pos; }
		    var ident = this.input.slice(next, pos);
		    if (!keywordRelationalOperator.test(ident)) { return true }
		  }
		  return false
		};

		// check 'async [no LineTerminator here] function'
		// - 'async /*foo*/ function' is OK.
		// - 'async /*\n*/ function' is invalid.
		pp$1.isAsyncFunction = function() {
		  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
		    { return false }

		  skipWhiteSpace.lastIndex = this.pos;
		  var skip = skipWhiteSpace.exec(this.input);
		  var next = this.pos + skip[0].length;
		  return !lineBreak.test(this.input.slice(this.pos, next)) &&
		    this.input.slice(next, next + 8) === "function" &&
		    (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)))
		};

		// Parse a single statement.
		//
		// If expecting a statement and finding a slash operator, parse a
		// regular expression literal. This is to handle cases like
		// `if (foo) /blah/.exec(foo)`, where looking at the previous token
		// does not help.

		pp$1.parseStatement = function(declaration, topLevel, exports) {
		  var starttype = this.type, node = this.startNode(), kind;

		  if (this.isLet()) {
		    starttype = types._var;
		    kind = "let";
		  }

		  // Most types of statements are recognized by the keyword they
		  // start with. Many are trivial to parse, some require a bit of
		  // complexity.

		  switch (starttype) {
		  case types._break: case types._continue: return this.parseBreakContinueStatement(node, starttype.keyword)
		  case types._debugger: return this.parseDebuggerStatement(node)
		  case types._do: return this.parseDoStatement(node)
		  case types._for: return this.parseForStatement(node)
		  case types._function:
		    if (!declaration && this.options.ecmaVersion >= 6) { this.unexpected(); }
		    return this.parseFunctionStatement(node, false)
		  case types._class:
		    if (!declaration) { this.unexpected(); }
		    return this.parseClass(node, true)
		  case types._if: return this.parseIfStatement(node)
		  case types._return: return this.parseReturnStatement(node)
		  case types._switch: return this.parseSwitchStatement(node)
		  case types._throw: return this.parseThrowStatement(node)
		  case types._try: return this.parseTryStatement(node)
		  case types._const: case types._var:
		    kind = kind || this.value;
		    if (!declaration && kind !== "var") { this.unexpected(); }
		    return this.parseVarStatement(node, kind)
		  case types._while: return this.parseWhileStatement(node)
		  case types._with: return this.parseWithStatement(node)
		  case types.braceL: return this.parseBlock()
		  case types.semi: return this.parseEmptyStatement(node)
		  case types._export:
		  case types._import:
		    if (!this.options.allowImportExportEverywhere) {
		      if (!topLevel)
		        { this.raise(this.start, "'import' and 'export' may only appear at the top level"); }
		      if (!this.inModule)
		        { this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'"); }
		    }
		    return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports)

		    // If the statement does not start with a statement keyword or a
		    // brace, it's an ExpressionStatement or LabeledStatement. We
		    // simply start parsing an expression, and afterwards, if the
		    // next token is a colon and the expression was a simple
		    // Identifier node, we switch to interpreting it as a label.
		  default:
		    if (this.isAsyncFunction()) {
		      if (!declaration) { this.unexpected(); }
		      this.next();
		      return this.parseFunctionStatement(node, true)
		    }

		    var maybeName = this.value, expr = this.parseExpression();
		    if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon))
		      { return this.parseLabeledStatement(node, maybeName, expr) }
		    else { return this.parseExpressionStatement(node, expr) }
		  }
		};

		pp$1.parseBreakContinueStatement = function(node, keyword) {
		  var this$1 = this;

		  var isBreak = keyword === "break";
		  this.next();
		  if (this.eat(types.semi) || this.insertSemicolon()) { node.label = null; }
		  else if (this.type !== types.name) { this.unexpected(); }
		  else {
		    node.label = this.parseIdent();
		    this.semicolon();
		  }

		  // Verify that there is an actual destination to break or
		  // continue to.
		  var i = 0;
		  for (; i < this.labels.length; ++i) {
		    var lab = this$1.labels[i];
		    if (node.label == null || lab.name === node.label.name) {
		      if (lab.kind != null && (isBreak || lab.kind === "loop")) { break }
		      if (node.label && isBreak) { break }
		    }
		  }
		  if (i === this.labels.length) { this.raise(node.start, "Unsyntactic " + keyword); }
		  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement")
		};

		pp$1.parseDebuggerStatement = function(node) {
		  this.next();
		  this.semicolon();
		  return this.finishNode(node, "DebuggerStatement")
		};

		pp$1.parseDoStatement = function(node) {
		  this.next();
		  this.labels.push(loopLabel);
		  node.body = this.parseStatement(false);
		  this.labels.pop();
		  this.expect(types._while);
		  node.test = this.parseParenExpression();
		  if (this.options.ecmaVersion >= 6)
		    { this.eat(types.semi); }
		  else
		    { this.semicolon(); }
		  return this.finishNode(node, "DoWhileStatement")
		};

		// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
		// loop is non-trivial. Basically, we have to parse the init `var`
		// statement or expression, disallowing the `in` operator (see
		// the second parameter to `parseExpression`), and then check
		// whether the next token is `in` or `of`. When there is no init
		// part (semicolon immediately after the opening parenthesis), it
		// is a regular `for` loop.

		pp$1.parseForStatement = function(node) {
		  this.next();
		  var awaitAt = (this.options.ecmaVersion >= 9 && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction)) && this.eatContextual("await")) ? this.lastTokStart : -1;
		  this.labels.push(loopLabel);
		  this.enterLexicalScope();
		  this.expect(types.parenL);
		  if (this.type === types.semi) {
		    if (awaitAt > -1) { this.unexpected(awaitAt); }
		    return this.parseFor(node, null)
		  }
		  var isLet = this.isLet();
		  if (this.type === types._var || this.type === types._const || isLet) {
		    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
		    this.next();
		    this.parseVar(init$1, true, kind);
		    this.finishNode(init$1, "VariableDeclaration");
		    if ((this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) && init$1.declarations.length === 1 &&
		        !(kind !== "var" && init$1.declarations[0].init)) {
		      if (this.options.ecmaVersion >= 9) {
		        if (this.type === types._in) {
		          if (awaitAt > -1) { this.unexpected(awaitAt); }
		        } else { node.await = awaitAt > -1; }
		      }
		      return this.parseForIn(node, init$1)
		    }
		    if (awaitAt > -1) { this.unexpected(awaitAt); }
		    return this.parseFor(node, init$1)
		  }
		  var refDestructuringErrors = new DestructuringErrors;
		  var init = this.parseExpression(true, refDestructuringErrors);
		  if (this.type === types._in || (this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
		    if (this.options.ecmaVersion >= 9) {
		      if (this.type === types._in) {
		        if (awaitAt > -1) { this.unexpected(awaitAt); }
		      } else { node.await = awaitAt > -1; }
		    }
		    this.toAssignable(init, false, refDestructuringErrors);
		    this.checkLVal(init);
		    return this.parseForIn(node, init)
		  } else {
		    this.checkExpressionErrors(refDestructuringErrors, true);
		  }
		  if (awaitAt > -1) { this.unexpected(awaitAt); }
		  return this.parseFor(node, init)
		};

		pp$1.parseFunctionStatement = function(node, isAsync) {
		  this.next();
		  return this.parseFunction(node, true, false, isAsync)
		};

		pp$1.parseIfStatement = function(node) {
		  this.next();
		  node.test = this.parseParenExpression();
		  // allow function declarations in branches, but only in non-strict mode
		  node.consequent = this.parseStatement(!this.strict && this.type === types._function);
		  node.alternate = this.eat(types._else) ? this.parseStatement(!this.strict && this.type === types._function) : null;
		  return this.finishNode(node, "IfStatement")
		};

		pp$1.parseReturnStatement = function(node) {
		  if (!this.inFunction && !this.options.allowReturnOutsideFunction)
		    { this.raise(this.start, "'return' outside of function"); }
		  this.next();

		  // In `return` (and `break`/`continue`), the keywords with
		  // optional arguments, we eagerly look for a semicolon or the
		  // possibility to insert one.

		  if (this.eat(types.semi) || this.insertSemicolon()) { node.argument = null; }
		  else { node.argument = this.parseExpression(); this.semicolon(); }
		  return this.finishNode(node, "ReturnStatement")
		};

		pp$1.parseSwitchStatement = function(node) {
		  var this$1 = this;

		  this.next();
		  node.discriminant = this.parseParenExpression();
		  node.cases = [];
		  this.expect(types.braceL);
		  this.labels.push(switchLabel);
		  this.enterLexicalScope();

		  // Statements under must be grouped (by label) in SwitchCase
		  // nodes. `cur` is used to keep the node that we are currently
		  // adding statements to.

		  var cur;
		  for (var sawDefault = false; this.type !== types.braceR;) {
		    if (this$1.type === types._case || this$1.type === types._default) {
		      var isCase = this$1.type === types._case;
		      if (cur) { this$1.finishNode(cur, "SwitchCase"); }
		      node.cases.push(cur = this$1.startNode());
		      cur.consequent = [];
		      this$1.next();
		      if (isCase) {
		        cur.test = this$1.parseExpression();
		      } else {
		        if (sawDefault) { this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses"); }
		        sawDefault = true;
		        cur.test = null;
		      }
		      this$1.expect(types.colon);
		    } else {
		      if (!cur) { this$1.unexpected(); }
		      cur.consequent.push(this$1.parseStatement(true));
		    }
		  }
		  this.exitLexicalScope();
		  if (cur) { this.finishNode(cur, "SwitchCase"); }
		  this.next(); // Closing brace
		  this.labels.pop();
		  return this.finishNode(node, "SwitchStatement")
		};

		pp$1.parseThrowStatement = function(node) {
		  this.next();
		  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
		    { this.raise(this.lastTokEnd, "Illegal newline after throw"); }
		  node.argument = this.parseExpression();
		  this.semicolon();
		  return this.finishNode(node, "ThrowStatement")
		};

		// Reused empty array added for node fields that are always empty.

		var empty = [];

		pp$1.parseTryStatement = function(node) {
		  this.next();
		  node.block = this.parseBlock();
		  node.handler = null;
		  if (this.type === types._catch) {
		    var clause = this.startNode();
		    this.next();
		    if (this.eat(types.parenL)) {
		      clause.param = this.parseBindingAtom();
		      this.enterLexicalScope();
		      this.checkLVal(clause.param, "let");
		      this.expect(types.parenR);
		    } else {
		      if (this.options.ecmaVersion < 10) { this.unexpected(); }
		      clause.param = null;
		      this.enterLexicalScope();
		    }
		    clause.body = this.parseBlock(false);
		    this.exitLexicalScope();
		    node.handler = this.finishNode(clause, "CatchClause");
		  }
		  node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
		  if (!node.handler && !node.finalizer)
		    { this.raise(node.start, "Missing catch or finally clause"); }
		  return this.finishNode(node, "TryStatement")
		};

		pp$1.parseVarStatement = function(node, kind) {
		  this.next();
		  this.parseVar(node, false, kind);
		  this.semicolon();
		  return this.finishNode(node, "VariableDeclaration")
		};

		pp$1.parseWhileStatement = function(node) {
		  this.next();
		  node.test = this.parseParenExpression();
		  this.labels.push(loopLabel);
		  node.body = this.parseStatement(false);
		  this.labels.pop();
		  return this.finishNode(node, "WhileStatement")
		};

		pp$1.parseWithStatement = function(node) {
		  if (this.strict) { this.raise(this.start, "'with' in strict mode"); }
		  this.next();
		  node.object = this.parseParenExpression();
		  node.body = this.parseStatement(false);
		  return this.finishNode(node, "WithStatement")
		};

		pp$1.parseEmptyStatement = function(node) {
		  this.next();
		  return this.finishNode(node, "EmptyStatement")
		};

		pp$1.parseLabeledStatement = function(node, maybeName, expr) {
		  var this$1 = this;

		  for (var i$1 = 0, list = this$1.labels; i$1 < list.length; i$1 += 1)
		    {
		    var label = list[i$1];

		    if (label.name === maybeName)
		      { this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
		  } }
		  var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;
		  for (var i = this.labels.length - 1; i >= 0; i--) {
		    var label$1 = this$1.labels[i];
		    if (label$1.statementStart === node.start) {
		      // Update information about previous labels on this node
		      label$1.statementStart = this$1.start;
		      label$1.kind = kind;
		    } else { break }
		  }
		  this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
		  node.body = this.parseStatement(true);
		  if (node.body.type === "ClassDeclaration" ||
		      node.body.type === "VariableDeclaration" && node.body.kind !== "var" ||
		      node.body.type === "FunctionDeclaration" && (this.strict || node.body.generator || node.body.async))
		    { this.raiseRecoverable(node.body.start, "Invalid labeled declaration"); }
		  this.labels.pop();
		  node.label = expr;
		  return this.finishNode(node, "LabeledStatement")
		};

		pp$1.parseExpressionStatement = function(node, expr) {
		  node.expression = expr;
		  this.semicolon();
		  return this.finishNode(node, "ExpressionStatement")
		};

		// Parse a semicolon-enclosed block of statements, handling `"use
		// strict"` declarations when `allowStrict` is true (used for
		// function bodies).

		pp$1.parseBlock = function(createNewLexicalScope) {
		  var this$1 = this;
		  if ( createNewLexicalScope === void 0 ) createNewLexicalScope = true;

		  var node = this.startNode();
		  node.body = [];
		  this.expect(types.braceL);
		  if (createNewLexicalScope) {
		    this.enterLexicalScope();
		  }
		  while (!this.eat(types.braceR)) {
		    var stmt = this$1.parseStatement(true);
		    node.body.push(stmt);
		  }
		  if (createNewLexicalScope) {
		    this.exitLexicalScope();
		  }
		  return this.finishNode(node, "BlockStatement")
		};

		// Parse a regular `for` loop. The disambiguation code in
		// `parseStatement` will already have parsed the init statement or
		// expression.

		pp$1.parseFor = function(node, init) {
		  node.init = init;
		  this.expect(types.semi);
		  node.test = this.type === types.semi ? null : this.parseExpression();
		  this.expect(types.semi);
		  node.update = this.type === types.parenR ? null : this.parseExpression();
		  this.expect(types.parenR);
		  this.exitLexicalScope();
		  node.body = this.parseStatement(false);
		  this.labels.pop();
		  return this.finishNode(node, "ForStatement")
		};

		// Parse a `for`/`in` and `for`/`of` loop, which are almost
		// same from parser's perspective.

		pp$1.parseForIn = function(node, init) {
		  var type = this.type === types._in ? "ForInStatement" : "ForOfStatement";
		  this.next();
		  if (type === "ForInStatement") {
		    if (init.type === "AssignmentPattern" ||
		      (init.type === "VariableDeclaration" && init.declarations[0].init != null &&
		       (this.strict || init.declarations[0].id.type !== "Identifier")))
		      { this.raise(init.start, "Invalid assignment in for-in loop head"); }
		  }
		  node.left = init;
		  node.right = type === "ForInStatement" ? this.parseExpression() : this.parseMaybeAssign();
		  this.expect(types.parenR);
		  this.exitLexicalScope();
		  node.body = this.parseStatement(false);
		  this.labels.pop();
		  return this.finishNode(node, type)
		};

		// Parse a list of variable declarations.

		pp$1.parseVar = function(node, isFor, kind) {
		  var this$1 = this;

		  node.declarations = [];
		  node.kind = kind;
		  for (;;) {
		    var decl = this$1.startNode();
		    this$1.parseVarId(decl, kind);
		    if (this$1.eat(types.eq)) {
		      decl.init = this$1.parseMaybeAssign(isFor);
		    } else if (kind === "const" && !(this$1.type === types._in || (this$1.options.ecmaVersion >= 6 && this$1.isContextual("of")))) {
		      this$1.unexpected();
		    } else if (decl.id.type !== "Identifier" && !(isFor && (this$1.type === types._in || this$1.isContextual("of")))) {
		      this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
		    } else {
		      decl.init = null;
		    }
		    node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
		    if (!this$1.eat(types.comma)) { break }
		  }
		  return node
		};

		pp$1.parseVarId = function(decl, kind) {
		  decl.id = this.parseBindingAtom(kind);
		  this.checkLVal(decl.id, kind, false);
		};

		// Parse a function declaration or literal (depending on the
		// `isStatement` parameter).

		pp$1.parseFunction = function(node, isStatement, allowExpressionBody, isAsync) {
		  this.initFunction(node);
		  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync)
		    { node.generator = this.eat(types.star); }
		  if (this.options.ecmaVersion >= 8)
		    { node.async = !!isAsync; }

		  if (isStatement) {
		    node.id = isStatement === "nullableID" && this.type !== types.name ? null : this.parseIdent();
		    if (node.id) {
		      this.checkLVal(node.id, this.inModule && !this.inFunction ? "let" : "var");
		    }
		  }

		  var oldInGen = this.inGenerator, oldInAsync = this.inAsync,
		      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction;
		  this.inGenerator = node.generator;
		  this.inAsync = node.async;
		  this.yieldPos = 0;
		  this.awaitPos = 0;
		  this.inFunction = true;
		  this.enterFunctionScope();

		  if (!isStatement)
		    { node.id = this.type === types.name ? this.parseIdent() : null; }

		  this.parseFunctionParams(node);
		  this.parseFunctionBody(node, allowExpressionBody);

		  this.inGenerator = oldInGen;
		  this.inAsync = oldInAsync;
		  this.yieldPos = oldYieldPos;
		  this.awaitPos = oldAwaitPos;
		  this.inFunction = oldInFunc;
		  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression")
		};

		pp$1.parseFunctionParams = function(node) {
		  this.expect(types.parenL);
		  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
		  this.checkYieldAwaitInDefaultParams();
		};

		// Parse a class declaration or literal (depending on the
		// `isStatement` parameter).

		pp$1.parseClass = function(node, isStatement) {
		  var this$1 = this;

		  this.next();

		  this.parseClassId(node, isStatement);
		  this.parseClassSuper(node);
		  var classBody = this.startNode();
		  var hadConstructor = false;
		  classBody.body = [];
		  this.expect(types.braceL);
		  while (!this.eat(types.braceR)) {
		    var member = this$1.parseClassMember(classBody);
		    if (member && member.type === "MethodDefinition" && member.kind === "constructor") {
		      if (hadConstructor) { this$1.raise(member.start, "Duplicate constructor in the same class"); }
		      hadConstructor = true;
		    }
		  }
		  node.body = this.finishNode(classBody, "ClassBody");
		  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
		};

		pp$1.parseClassMember = function(classBody) {
		  var this$1 = this;

		  if (this.eat(types.semi)) { return null }

		  var method = this.startNode();
		  var tryContextual = function (k, noLineBreak) {
		    if ( noLineBreak === void 0 ) noLineBreak = false;

		    var start = this$1.start, startLoc = this$1.startLoc;
		    if (!this$1.eatContextual(k)) { return false }
		    if (this$1.type !== types.parenL && (!noLineBreak || !this$1.canInsertSemicolon())) { return true }
		    if (method.key) { this$1.unexpected(); }
		    method.computed = false;
		    method.key = this$1.startNodeAt(start, startLoc);
		    method.key.name = k;
		    this$1.finishNode(method.key, "Identifier");
		    return false
		  };

		  method.kind = "method";
		  method.static = tryContextual("static");
		  var isGenerator = this.eat(types.star);
		  var isAsync = false;
		  if (!isGenerator) {
		    if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
		      isAsync = true;
		      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
		    } else if (tryContextual("get")) {
		      method.kind = "get";
		    } else if (tryContextual("set")) {
		      method.kind = "set";
		    }
		  }
		  if (!method.key) { this.parsePropertyName(method); }
		  var key = method.key;
		  if (!method.computed && !method.static && (key.type === "Identifier" && key.name === "constructor" ||
		      key.type === "Literal" && key.value === "constructor")) {
		    if (method.kind !== "method") { this.raise(key.start, "Constructor can't have get/set modifier"); }
		    if (isGenerator) { this.raise(key.start, "Constructor can't be a generator"); }
		    if (isAsync) { this.raise(key.start, "Constructor can't be an async method"); }
		    method.kind = "constructor";
		  } else if (method.static && key.type === "Identifier" && key.name === "prototype") {
		    this.raise(key.start, "Classes may not have a static property named prototype");
		  }
		  this.parseClassMethod(classBody, method, isGenerator, isAsync);
		  if (method.kind === "get" && method.value.params.length !== 0)
		    { this.raiseRecoverable(method.value.start, "getter should have no params"); }
		  if (method.kind === "set" && method.value.params.length !== 1)
		    { this.raiseRecoverable(method.value.start, "setter should have exactly one param"); }
		  if (method.kind === "set" && method.value.params[0].type === "RestElement")
		    { this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params"); }
		  return method
		};

		pp$1.parseClassMethod = function(classBody, method, isGenerator, isAsync) {
		  method.value = this.parseMethod(isGenerator, isAsync);
		  classBody.body.push(this.finishNode(method, "MethodDefinition"));
		};

		pp$1.parseClassId = function(node, isStatement) {
		  node.id = this.type === types.name ? this.parseIdent() : isStatement === true ? this.unexpected() : null;
		};

		pp$1.parseClassSuper = function(node) {
		  node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
		};

		// Parses module export declaration.

		pp$1.parseExport = function(node, exports) {
		  var this$1 = this;

		  this.next();
		  // export * from '...'
		  if (this.eat(types.star)) {
		    this.expectContextual("from");
		    if (this.type !== types.string) { this.unexpected(); }
		    node.source = this.parseExprAtom();
		    this.semicolon();
		    return this.finishNode(node, "ExportAllDeclaration")
		  }
		  if (this.eat(types._default)) { // export default ...
		    this.checkExport(exports, "default", this.lastTokStart);
		    var isAsync;
		    if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
		      var fNode = this.startNode();
		      this.next();
		      if (isAsync) { this.next(); }
		      node.declaration = this.parseFunction(fNode, "nullableID", false, isAsync);
		    } else if (this.type === types._class) {
		      var cNode = this.startNode();
		      node.declaration = this.parseClass(cNode, "nullableID");
		    } else {
		      node.declaration = this.parseMaybeAssign();
		      this.semicolon();
		    }
		    return this.finishNode(node, "ExportDefaultDeclaration")
		  }
		  // export var|const|let|function|class ...
		  if (this.shouldParseExportStatement()) {
		    node.declaration = this.parseStatement(true);
		    if (node.declaration.type === "VariableDeclaration")
		      { this.checkVariableExport(exports, node.declaration.declarations); }
		    else
		      { this.checkExport(exports, node.declaration.id.name, node.declaration.id.start); }
		    node.specifiers = [];
		    node.source = null;
		  } else { // export { x, y as z } [from '...']
		    node.declaration = null;
		    node.specifiers = this.parseExportSpecifiers(exports);
		    if (this.eatContextual("from")) {
		      if (this.type !== types.string) { this.unexpected(); }
		      node.source = this.parseExprAtom();
		    } else {
		      // check for keywords used as local names
		      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
		        var spec = list[i];

		        this$1.checkUnreserved(spec.local);
		      }

		      node.source = null;
		    }
		    this.semicolon();
		  }
		  return this.finishNode(node, "ExportNamedDeclaration")
		};

		pp$1.checkExport = function(exports, name, pos) {
		  if (!exports) { return }
		  if (has(exports, name))
		    { this.raiseRecoverable(pos, "Duplicate export '" + name + "'"); }
		  exports[name] = true;
		};

		pp$1.checkPatternExport = function(exports, pat) {
		  var this$1 = this;

		  var type = pat.type;
		  if (type === "Identifier")
		    { this.checkExport(exports, pat.name, pat.start); }
		  else if (type === "ObjectPattern")
		    { for (var i = 0, list = pat.properties; i < list.length; i += 1)
		      {
		        var prop = list[i];

		        this$1.checkPatternExport(exports, prop);
		      } }
		  else if (type === "ArrayPattern")
		    { for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
		      var elt = list$1[i$1];

		        if (elt) { this$1.checkPatternExport(exports, elt); }
		    } }
		  else if (type === "Property")
		    { this.checkPatternExport(exports, pat.value); }
		  else if (type === "AssignmentPattern")
		    { this.checkPatternExport(exports, pat.left); }
		  else if (type === "RestElement")
		    { this.checkPatternExport(exports, pat.argument); }
		  else if (type === "ParenthesizedExpression")
		    { this.checkPatternExport(exports, pat.expression); }
		};

		pp$1.checkVariableExport = function(exports, decls) {
		  var this$1 = this;

		  if (!exports) { return }
		  for (var i = 0, list = decls; i < list.length; i += 1)
		    {
		    var decl = list[i];

		    this$1.checkPatternExport(exports, decl.id);
		  }
		};

		pp$1.shouldParseExportStatement = function() {
		  return this.type.keyword === "var" ||
		    this.type.keyword === "const" ||
		    this.type.keyword === "class" ||
		    this.type.keyword === "function" ||
		    this.isLet() ||
		    this.isAsyncFunction()
		};

		// Parses a comma-separated list of module exports.

		pp$1.parseExportSpecifiers = function(exports) {
		  var this$1 = this;

		  var nodes = [], first = true;
		  // export { x, y as z } [from '...']
		  this.expect(types.braceL);
		  while (!this.eat(types.braceR)) {
		    if (!first) {
		      this$1.expect(types.comma);
		      if (this$1.afterTrailingComma(types.braceR)) { break }
		    } else { first = false; }

		    var node = this$1.startNode();
		    node.local = this$1.parseIdent(true);
		    node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
		    this$1.checkExport(exports, node.exported.name, node.exported.start);
		    nodes.push(this$1.finishNode(node, "ExportSpecifier"));
		  }
		  return nodes
		};

		// Parses import declaration.

		pp$1.parseImport = function(node) {
		  this.next();
		  // import '...'
		  if (this.type === types.string) {
		    node.specifiers = empty;
		    node.source = this.parseExprAtom();
		  } else {
		    node.specifiers = this.parseImportSpecifiers();
		    this.expectContextual("from");
		    node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
		  }
		  this.semicolon();
		  return this.finishNode(node, "ImportDeclaration")
		};

		// Parses a comma-separated list of module imports.

		pp$1.parseImportSpecifiers = function() {
		  var this$1 = this;

		  var nodes = [], first = true;
		  if (this.type === types.name) {
		    // import defaultObj, { x, y as z } from '...'
		    var node = this.startNode();
		    node.local = this.parseIdent();
		    this.checkLVal(node.local, "let");
		    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
		    if (!this.eat(types.comma)) { return nodes }
		  }
		  if (this.type === types.star) {
		    var node$1 = this.startNode();
		    this.next();
		    this.expectContextual("as");
		    node$1.local = this.parseIdent();
		    this.checkLVal(node$1.local, "let");
		    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
		    return nodes
		  }
		  this.expect(types.braceL);
		  while (!this.eat(types.braceR)) {
		    if (!first) {
		      this$1.expect(types.comma);
		      if (this$1.afterTrailingComma(types.braceR)) { break }
		    } else { first = false; }

		    var node$2 = this$1.startNode();
		    node$2.imported = this$1.parseIdent(true);
		    if (this$1.eatContextual("as")) {
		      node$2.local = this$1.parseIdent();
		    } else {
		      this$1.checkUnreserved(node$2.imported);
		      node$2.local = node$2.imported;
		    }
		    this$1.checkLVal(node$2.local, "let");
		    nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
		  }
		  return nodes
		};

		// Set `ExpressionStatement#directive` property for directive prologues.
		pp$1.adaptDirectivePrologue = function(statements) {
		  for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
		    statements[i].directive = statements[i].expression.raw.slice(1, -1);
		  }
		};
		pp$1.isDirectiveCandidate = function(statement) {
		  return (
		    statement.type === "ExpressionStatement" &&
		    statement.expression.type === "Literal" &&
		    typeof statement.expression.value === "string" &&
		    // Reject parenthesized strings.
		    (this.input[statement.start] === "\"" || this.input[statement.start] === "'")
		  )
		};

		var pp$2 = Parser.prototype;

		// Convert existing expression atom to assignable pattern
		// if possible.

		pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
		  var this$1 = this;

		  if (this.options.ecmaVersion >= 6 && node) {
		    switch (node.type) {
		    case "Identifier":
		      if (this.inAsync && node.name === "await")
		        { this.raise(node.start, "Can not use 'await' as identifier inside an async function"); }
		      break

		    case "ObjectPattern":
		    case "ArrayPattern":
		    case "RestElement":
		      break

		    case "ObjectExpression":
		      node.type = "ObjectPattern";
		      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
		      for (var i = 0, list = node.properties; i < list.length; i += 1) {
		        var prop = list[i];

		      this$1.toAssignable(prop, isBinding);
		        // Early error:
		        //   AssignmentRestProperty[Yield, Await] :
		        //     `...` DestructuringAssignmentTarget[Yield, Await]
		        //
		        //   It is a Syntax Error if |DestructuringAssignmentTarget| is an |ArrayLiteral| or an |ObjectLiteral|.
		        if (
		          prop.type === "RestElement" &&
		          (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")
		        ) {
		          this$1.raise(prop.argument.start, "Unexpected token");
		        }
		      }
		      break

		    case "Property":
		      // AssignmentProperty has type === "Property"
		      if (node.kind !== "init") { this.raise(node.key.start, "Object pattern can't contain getter or setter"); }
		      this.toAssignable(node.value, isBinding);
		      break

		    case "ArrayExpression":
		      node.type = "ArrayPattern";
		      if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
		      this.toAssignableList(node.elements, isBinding);
		      break

		    case "SpreadElement":
		      node.type = "RestElement";
		      this.toAssignable(node.argument, isBinding);
		      if (node.argument.type === "AssignmentPattern")
		        { this.raise(node.argument.start, "Rest elements cannot have a default value"); }
		      break

		    case "AssignmentExpression":
		      if (node.operator !== "=") { this.raise(node.left.end, "Only '=' operator can be used for specifying default value."); }
		      node.type = "AssignmentPattern";
		      delete node.operator;
		      this.toAssignable(node.left, isBinding);
		      // falls through to AssignmentPattern

		    case "AssignmentPattern":
		      break

		    case "ParenthesizedExpression":
		      this.toAssignable(node.expression, isBinding);
		      break

		    case "MemberExpression":
		      if (!isBinding) { break }

		    default:
		      this.raise(node.start, "Assigning to rvalue");
		    }
		  } else if (refDestructuringErrors) { this.checkPatternErrors(refDestructuringErrors, true); }
		  return node
		};

		// Convert list of expression atoms to binding list.

		pp$2.toAssignableList = function(exprList, isBinding) {
		  var this$1 = this;

		  var end = exprList.length;
		  for (var i = 0; i < end; i++) {
		    var elt = exprList[i];
		    if (elt) { this$1.toAssignable(elt, isBinding); }
		  }
		  if (end) {
		    var last = exprList[end - 1];
		    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
		      { this.unexpected(last.argument.start); }
		  }
		  return exprList
		};

		// Parses spread element.

		pp$2.parseSpread = function(refDestructuringErrors) {
		  var node = this.startNode();
		  this.next();
		  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
		  return this.finishNode(node, "SpreadElement")
		};

		pp$2.parseRestBinding = function() {
		  var node = this.startNode();
		  this.next();

		  // RestElement inside of a function parameter must be an identifier
		  if (this.options.ecmaVersion === 6 && this.type !== types.name)
		    { this.unexpected(); }

		  node.argument = this.parseBindingAtom();

		  return this.finishNode(node, "RestElement")
		};

		// Parses lvalue (assignable) atom.

		pp$2.parseBindingAtom = function() {
		  if (this.options.ecmaVersion >= 6) {
		    switch (this.type) {
		    case types.bracketL:
		      var node = this.startNode();
		      this.next();
		      node.elements = this.parseBindingList(types.bracketR, true, true);
		      return this.finishNode(node, "ArrayPattern")

		    case types.braceL:
		      return this.parseObj(true)
		    }
		  }
		  return this.parseIdent()
		};

		pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
		  var this$1 = this;

		  var elts = [], first = true;
		  while (!this.eat(close)) {
		    if (first) { first = false; }
		    else { this$1.expect(types.comma); }
		    if (allowEmpty && this$1.type === types.comma) {
		      elts.push(null);
		    } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
		      break
		    } else if (this$1.type === types.ellipsis) {
		      var rest = this$1.parseRestBinding();
		      this$1.parseBindingListItem(rest);
		      elts.push(rest);
		      if (this$1.type === types.comma) { this$1.raise(this$1.start, "Comma is not permitted after the rest element"); }
		      this$1.expect(close);
		      break
		    } else {
		      var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
		      this$1.parseBindingListItem(elem);
		      elts.push(elem);
		    }
		  }
		  return elts
		};

		pp$2.parseBindingListItem = function(param) {
		  return param
		};

		// Parses assignment pattern around given atom if possible.

		pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
		  left = left || this.parseBindingAtom();
		  if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) { return left }
		  var node = this.startNodeAt(startPos, startLoc);
		  node.left = left;
		  node.right = this.parseMaybeAssign();
		  return this.finishNode(node, "AssignmentPattern")
		};

		// Verify that a node is an lval — something that can be assigned
		// to.
		// bindingType can be either:
		// 'var' indicating that the lval creates a 'var' binding
		// 'let' indicating that the lval creates a lexical ('let' or 'const') binding
		// 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

		pp$2.checkLVal = function(expr, bindingType, checkClashes) {
		  var this$1 = this;

		  switch (expr.type) {
		  case "Identifier":
		    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
		      { this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode"); }
		    if (checkClashes) {
		      if (has(checkClashes, expr.name))
		        { this.raiseRecoverable(expr.start, "Argument name clash"); }
		      checkClashes[expr.name] = true;
		    }
		    if (bindingType && bindingType !== "none") {
		      if (
		        bindingType === "var" && !this.canDeclareVarName(expr.name) ||
		        bindingType !== "var" && !this.canDeclareLexicalName(expr.name)
		      ) {
		        this.raiseRecoverable(expr.start, ("Identifier '" + (expr.name) + "' has already been declared"));
		      }
		      if (bindingType === "var") {
		        this.declareVarName(expr.name);
		      } else {
		        this.declareLexicalName(expr.name);
		      }
		    }
		    break

		  case "MemberExpression":
		    if (bindingType) { this.raiseRecoverable(expr.start, "Binding member expression"); }
		    break

		  case "ObjectPattern":
		    for (var i = 0, list = expr.properties; i < list.length; i += 1)
		      {
		    var prop = list[i];

		    this$1.checkLVal(prop, bindingType, checkClashes);
		  }
		    break

		  case "Property":
		    // AssignmentProperty has type === "Property"
		    this.checkLVal(expr.value, bindingType, checkClashes);
		    break

		  case "ArrayPattern":
		    for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
		      var elem = list$1[i$1];

		    if (elem) { this$1.checkLVal(elem, bindingType, checkClashes); }
		    }
		    break

		  case "AssignmentPattern":
		    this.checkLVal(expr.left, bindingType, checkClashes);
		    break

		  case "RestElement":
		    this.checkLVal(expr.argument, bindingType, checkClashes);
		    break

		  case "ParenthesizedExpression":
		    this.checkLVal(expr.expression, bindingType, checkClashes);
		    break

		  default:
		    this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
		  }
		};

		// A recursive descent parser operates by defining functions for all
		// syntactic elements, and recursively calling those, each function
		// advancing the input stream and returning an AST node. Precedence
		// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
		// instead of `(!x)[1]` is handled by the fact that the parser
		// function that parses unary prefix operators is called first, and
		// in turn calls the function that parses `[]` subscripts — that
		// way, it'll receive the node for `x[1]` already parsed, and wraps
		// *that* in the unary operator node.
		//
		// Acorn uses an [operator precedence parser][opp] to handle binary
		// operator precedence, because it is much more compact than using
		// the technique outlined above, which uses different, nesting
		// functions to specify precedence, for all of the ten binary
		// precedence levels that JavaScript defines.
		//
		// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

		var pp$3 = Parser.prototype;

		// Check if property name clashes with already added.
		// Object/class getters and setters are not allowed to clash —
		// either with each other or with an init property — and in
		// strict mode, init properties are also not allowed to be repeated.

		pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
		  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
		    { return }
		  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
		    { return }
		  var key = prop.key;
		  var name;
		  switch (key.type) {
		  case "Identifier": name = key.name; break
		  case "Literal": name = String(key.value); break
		  default: return
		  }
		  var kind = prop.kind;
		  if (this.options.ecmaVersion >= 6) {
		    if (name === "__proto__" && kind === "init") {
		      if (propHash.proto) {
		        if (refDestructuringErrors && refDestructuringErrors.doubleProto < 0) { refDestructuringErrors.doubleProto = key.start; }
		        // Backwards-compat kludge. Can be removed in version 6.0
		        else { this.raiseRecoverable(key.start, "Redefinition of __proto__ property"); }
		      }
		      propHash.proto = true;
		    }
		    return
		  }
		  name = "$" + name;
		  var other = propHash[name];
		  if (other) {
		    var redefinition;
		    if (kind === "init") {
		      redefinition = this.strict && other.init || other.get || other.set;
		    } else {
		      redefinition = other.init || other[kind];
		    }
		    if (redefinition)
		      { this.raiseRecoverable(key.start, "Redefinition of property"); }
		  } else {
		    other = propHash[name] = {
		      init: false,
		      get: false,
		      set: false
		    };
		  }
		  other[kind] = true;
		};

		// ### Expression parsing

		// These nest, from the most general expression type at the top to
		// 'atomic', nondivisible expression types at the bottom. Most of
		// the functions will simply let the function(s) below them parse,
		// and, *if* the syntactic construct they handle is present, wrap
		// the AST node that the inner parser gave them in another node.

		// Parse a full expression. The optional arguments are used to
		// forbid the `in` operator (in for loops initalization expressions)
		// and provide reference for storing '=' operator inside shorthand
		// property assignment in contexts where both object expression
		// and object pattern might appear (so it's possible to raise
		// delayed syntax error at correct position).

		pp$3.parseExpression = function(noIn, refDestructuringErrors) {
		  var this$1 = this;

		  var startPos = this.start, startLoc = this.startLoc;
		  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
		  if (this.type === types.comma) {
		    var node = this.startNodeAt(startPos, startLoc);
		    node.expressions = [expr];
		    while (this.eat(types.comma)) { node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors)); }
		    return this.finishNode(node, "SequenceExpression")
		  }
		  return expr
		};

		// Parse an assignment expression. This includes applications of
		// operators like `+=`.

		pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
		  if (this.inGenerator && this.isContextual("yield")) { return this.parseYield() }

		  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1;
		  if (refDestructuringErrors) {
		    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
		    oldTrailingComma = refDestructuringErrors.trailingComma;
		    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
		  } else {
		    refDestructuringErrors = new DestructuringErrors;
		    ownDestructuringErrors = true;
		  }

		  var startPos = this.start, startLoc = this.startLoc;
		  if (this.type === types.parenL || this.type === types.name)
		    { this.potentialArrowAt = this.start; }
		  var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
		  if (afterLeftParse) { left = afterLeftParse.call(this, left, startPos, startLoc); }
		  if (this.type.isAssign) {
		    var node = this.startNodeAt(startPos, startLoc);
		    node.operator = this.value;
		    node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left;
		    if (!ownDestructuringErrors) { DestructuringErrors.call(refDestructuringErrors); }
		    refDestructuringErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
		    this.checkLVal(left);
		    this.next();
		    node.right = this.parseMaybeAssign(noIn);
		    return this.finishNode(node, "AssignmentExpression")
		  } else {
		    if (ownDestructuringErrors) { this.checkExpressionErrors(refDestructuringErrors, true); }
		  }
		  if (oldParenAssign > -1) { refDestructuringErrors.parenthesizedAssign = oldParenAssign; }
		  if (oldTrailingComma > -1) { refDestructuringErrors.trailingComma = oldTrailingComma; }
		  return left
		};

		// Parse a ternary conditional (`?:`) operator.

		pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
		  var startPos = this.start, startLoc = this.startLoc;
		  var expr = this.parseExprOps(noIn, refDestructuringErrors);
		  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
		  if (this.eat(types.question)) {
		    var node = this.startNodeAt(startPos, startLoc);
		    node.test = expr;
		    node.consequent = this.parseMaybeAssign();
		    this.expect(types.colon);
		    node.alternate = this.parseMaybeAssign(noIn);
		    return this.finishNode(node, "ConditionalExpression")
		  }
		  return expr
		};

		// Start the precedence parser.

		pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
		  var startPos = this.start, startLoc = this.startLoc;
		  var expr = this.parseMaybeUnary(refDestructuringErrors, false);
		  if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
		  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn)
		};

		// Parse binary operators with the operator precedence parsing
		// algorithm. `left` is the left-hand side of the operator.
		// `minPrec` provides context that allows the function to stop and
		// defer further parser to one of its callers when it encounters an
		// operator that has a lower precedence than the set it is parsing.

		pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
		  var prec = this.type.binop;
		  if (prec != null && (!noIn || this.type !== types._in)) {
		    if (prec > minPrec) {
		      var logical = this.type === types.logicalOR || this.type === types.logicalAND;
		      var op = this.value;
		      this.next();
		      var startPos = this.start, startLoc = this.startLoc;
		      var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
		      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
		      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn)
		    }
		  }
		  return left
		};

		pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
		  var node = this.startNodeAt(startPos, startLoc);
		  node.left = left;
		  node.operator = op;
		  node.right = right;
		  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression")
		};

		// Parse unary operators, both prefix and postfix.

		pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
		  var this$1 = this;

		  var startPos = this.start, startLoc = this.startLoc, expr;
		  if (this.isContextual("await") && (this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))) {
		    expr = this.parseAwait();
		    sawUnary = true;
		  } else if (this.type.prefix) {
		    var node = this.startNode(), update = this.type === types.incDec;
		    node.operator = this.value;
		    node.prefix = true;
		    this.next();
		    node.argument = this.parseMaybeUnary(null, true);
		    this.checkExpressionErrors(refDestructuringErrors, true);
		    if (update) { this.checkLVal(node.argument); }
		    else if (this.strict && node.operator === "delete" &&
		             node.argument.type === "Identifier")
		      { this.raiseRecoverable(node.start, "Deleting local variable in strict mode"); }
		    else { sawUnary = true; }
		    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
		  } else {
		    expr = this.parseExprSubscripts(refDestructuringErrors);
		    if (this.checkExpressionErrors(refDestructuringErrors)) { return expr }
		    while (this.type.postfix && !this.canInsertSemicolon()) {
		      var node$1 = this$1.startNodeAt(startPos, startLoc);
		      node$1.operator = this$1.value;
		      node$1.prefix = false;
		      node$1.argument = expr;
		      this$1.checkLVal(expr);
		      this$1.next();
		      expr = this$1.finishNode(node$1, "UpdateExpression");
		    }
		  }

		  if (!sawUnary && this.eat(types.starstar))
		    { return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false) }
		  else
		    { return expr }
		};

		// Parse call, dot, and `[]`-subscript expressions.

		pp$3.parseExprSubscripts = function(refDestructuringErrors) {
		  var startPos = this.start, startLoc = this.startLoc;
		  var expr = this.parseExprAtom(refDestructuringErrors);
		  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
		  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) { return expr }
		  var result = this.parseSubscripts(expr, startPos, startLoc);
		  if (refDestructuringErrors && result.type === "MemberExpression") {
		    if (refDestructuringErrors.parenthesizedAssign >= result.start) { refDestructuringErrors.parenthesizedAssign = -1; }
		    if (refDestructuringErrors.parenthesizedBind >= result.start) { refDestructuringErrors.parenthesizedBind = -1; }
		  }
		  return result
		};

		pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
		  var this$1 = this;

		  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" &&
		      this.lastTokEnd === base.end && !this.canInsertSemicolon() && this.input.slice(base.start, base.end) === "async";
		  for (var computed = (void 0);;) {
		    if ((computed = this$1.eat(types.bracketL)) || this$1.eat(types.dot)) {
		      var node = this$1.startNodeAt(startPos, startLoc);
		      node.object = base;
		      node.property = computed ? this$1.parseExpression() : this$1.parseIdent(true);
		      node.computed = !!computed;
		      if (computed) { this$1.expect(types.bracketR); }
		      base = this$1.finishNode(node, "MemberExpression");
		    } else if (!noCalls && this$1.eat(types.parenL)) {
		      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this$1.yieldPos, oldAwaitPos = this$1.awaitPos;
		      this$1.yieldPos = 0;
		      this$1.awaitPos = 0;
		      var exprList = this$1.parseExprList(types.parenR, this$1.options.ecmaVersion >= 8, false, refDestructuringErrors);
		      if (maybeAsyncArrow && !this$1.canInsertSemicolon() && this$1.eat(types.arrow)) {
		        this$1.checkPatternErrors(refDestructuringErrors, false);
		        this$1.checkYieldAwaitInDefaultParams();
		        this$1.yieldPos = oldYieldPos;
		        this$1.awaitPos = oldAwaitPos;
		        return this$1.parseArrowExpression(this$1.startNodeAt(startPos, startLoc), exprList, true)
		      }
		      this$1.checkExpressionErrors(refDestructuringErrors, true);
		      this$1.yieldPos = oldYieldPos || this$1.yieldPos;
		      this$1.awaitPos = oldAwaitPos || this$1.awaitPos;
		      var node$1 = this$1.startNodeAt(startPos, startLoc);
		      node$1.callee = base;
		      node$1.arguments = exprList;
		      base = this$1.finishNode(node$1, "CallExpression");
		    } else if (this$1.type === types.backQuote) {
		      var node$2 = this$1.startNodeAt(startPos, startLoc);
		      node$2.tag = base;
		      node$2.quasi = this$1.parseTemplate({isTagged: true});
		      base = this$1.finishNode(node$2, "TaggedTemplateExpression");
		    } else {
		      return base
		    }
		  }
		};

		// Parse an atomic expression — either a single token that is an
		// expression, an expression started by a keyword like `function` or
		// `new`, or an expression wrapped in punctuation like `()`, `[]`,
		// or `{}`.

		pp$3.parseExprAtom = function(refDestructuringErrors) {
		  var node, canBeArrow = this.potentialArrowAt === this.start;
		  switch (this.type) {
		  case types._super:
		    if (!this.inFunction)
		      { this.raise(this.start, "'super' outside of function or class"); }
		    node = this.startNode();
		    this.next();
		    // The `super` keyword can appear at below:
		    // SuperProperty:
		    //     super [ Expression ]
		    //     super . IdentifierName
		    // SuperCall:
		    //     super Arguments
		    if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL)
		      { this.unexpected(); }
		    return this.finishNode(node, "Super")

		  case types._this:
		    node = this.startNode();
		    this.next();
		    return this.finishNode(node, "ThisExpression")

		  case types.name:
		    var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
		    var id = this.parseIdent(this.type !== types.name);
		    if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function))
		      { return this.parseFunction(this.startNodeAt(startPos, startLoc), false, false, true) }
		    if (canBeArrow && !this.canInsertSemicolon()) {
		      if (this.eat(types.arrow))
		        { return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false) }
		      if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) {
		        id = this.parseIdent();
		        if (this.canInsertSemicolon() || !this.eat(types.arrow))
		          { this.unexpected(); }
		        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true)
		      }
		    }
		    return id

		  case types.regexp:
		    var value = this.value;
		    node = this.parseLiteral(value.value);
		    node.regex = {pattern: value.pattern, flags: value.flags};
		    return node

		  case types.num: case types.string:
		    return this.parseLiteral(this.value)

		  case types._null: case types._true: case types._false:
		    node = this.startNode();
		    node.value = this.type === types._null ? null : this.type === types._true;
		    node.raw = this.type.keyword;
		    this.next();
		    return this.finishNode(node, "Literal")

		  case types.parenL:
		    var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow);
		    if (refDestructuringErrors) {
		      if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
		        { refDestructuringErrors.parenthesizedAssign = start; }
		      if (refDestructuringErrors.parenthesizedBind < 0)
		        { refDestructuringErrors.parenthesizedBind = start; }
		    }
		    return expr

		  case types.bracketL:
		    node = this.startNode();
		    this.next();
		    node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
		    return this.finishNode(node, "ArrayExpression")

		  case types.braceL:
		    return this.parseObj(false, refDestructuringErrors)

		  case types._function:
		    node = this.startNode();
		    this.next();
		    return this.parseFunction(node, false)

		  case types._class:
		    return this.parseClass(this.startNode(), false)

		  case types._new:
		    return this.parseNew()

		  case types.backQuote:
		    return this.parseTemplate()

		  default:
		    this.unexpected();
		  }
		};

		pp$3.parseLiteral = function(value) {
		  var node = this.startNode();
		  node.value = value;
		  node.raw = this.input.slice(this.start, this.end);
		  this.next();
		  return this.finishNode(node, "Literal")
		};

		pp$3.parseParenExpression = function() {
		  this.expect(types.parenL);
		  var val = this.parseExpression();
		  this.expect(types.parenR);
		  return val
		};

		pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
		  var this$1 = this;

		  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
		  if (this.options.ecmaVersion >= 6) {
		    this.next();

		    var innerStartPos = this.start, innerStartLoc = this.startLoc;
		    var exprList = [], first = true, lastIsComma = false;
		    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
		    this.yieldPos = 0;
		    this.awaitPos = 0;
		    while (this.type !== types.parenR) {
		      first ? first = false : this$1.expect(types.comma);
		      if (allowTrailingComma && this$1.afterTrailingComma(types.parenR, true)) {
		        lastIsComma = true;
		        break
		      } else if (this$1.type === types.ellipsis) {
		        spreadStart = this$1.start;
		        exprList.push(this$1.parseParenItem(this$1.parseRestBinding()));
		        if (this$1.type === types.comma) { this$1.raise(this$1.start, "Comma is not permitted after the rest element"); }
		        break
		      } else {
		        exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
		      }
		    }
		    var innerEndPos = this.start, innerEndLoc = this.startLoc;
		    this.expect(types.parenR);

		    if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
		      this.checkPatternErrors(refDestructuringErrors, false);
		      this.checkYieldAwaitInDefaultParams();
		      this.yieldPos = oldYieldPos;
		      this.awaitPos = oldAwaitPos;
		      return this.parseParenArrowList(startPos, startLoc, exprList)
		    }

		    if (!exprList.length || lastIsComma) { this.unexpected(this.lastTokStart); }
		    if (spreadStart) { this.unexpected(spreadStart); }
		    this.checkExpressionErrors(refDestructuringErrors, true);
		    this.yieldPos = oldYieldPos || this.yieldPos;
		    this.awaitPos = oldAwaitPos || this.awaitPos;

		    if (exprList.length > 1) {
		      val = this.startNodeAt(innerStartPos, innerStartLoc);
		      val.expressions = exprList;
		      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
		    } else {
		      val = exprList[0];
		    }
		  } else {
		    val = this.parseParenExpression();
		  }

		  if (this.options.preserveParens) {
		    var par = this.startNodeAt(startPos, startLoc);
		    par.expression = val;
		    return this.finishNode(par, "ParenthesizedExpression")
		  } else {
		    return val
		  }
		};

		pp$3.parseParenItem = function(item) {
		  return item
		};

		pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
		  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList)
		};

		// New's precedence is slightly tricky. It must allow its argument to
		// be a `[]` or dot subscript expression, but not a call — at least,
		// not without wrapping it in parentheses. Thus, it uses the noCalls
		// argument to parseSubscripts to prevent it from consuming the
		// argument list.

		var empty$1 = [];

		pp$3.parseNew = function() {
		  var node = this.startNode();
		  var meta = this.parseIdent(true);
		  if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
		    node.meta = meta;
		    var containsEsc = this.containsEsc;
		    node.property = this.parseIdent(true);
		    if (node.property.name !== "target" || containsEsc)
		      { this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target"); }
		    if (!this.inFunction)
		      { this.raiseRecoverable(node.start, "new.target can only be used in functions"); }
		    return this.finishNode(node, "MetaProperty")
		  }
		  var startPos = this.start, startLoc = this.startLoc;
		  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
		  if (this.eat(types.parenL)) { node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false); }
		  else { node.arguments = empty$1; }
		  return this.finishNode(node, "NewExpression")
		};

		// Parse template expression.

		pp$3.parseTemplateElement = function(ref) {
		  var isTagged = ref.isTagged;

		  var elem = this.startNode();
		  if (this.type === types.invalidTemplate) {
		    if (!isTagged) {
		      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
		    }
		    elem.value = {
		      raw: this.value,
		      cooked: null
		    };
		  } else {
		    elem.value = {
		      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
		      cooked: this.value
		    };
		  }
		  this.next();
		  elem.tail = this.type === types.backQuote;
		  return this.finishNode(elem, "TemplateElement")
		};

		pp$3.parseTemplate = function(ref) {
		  var this$1 = this;
		  if ( ref === void 0 ) ref = {};
		  var isTagged = ref.isTagged; if ( isTagged === void 0 ) isTagged = false;

		  var node = this.startNode();
		  this.next();
		  node.expressions = [];
		  var curElt = this.parseTemplateElement({isTagged: isTagged});
		  node.quasis = [curElt];
		  while (!curElt.tail) {
		    if (this$1.type === types.eof) { this$1.raise(this$1.pos, "Unterminated template literal"); }
		    this$1.expect(types.dollarBraceL);
		    node.expressions.push(this$1.parseExpression());
		    this$1.expect(types.braceR);
		    node.quasis.push(curElt = this$1.parseTemplateElement({isTagged: isTagged}));
		  }
		  this.next();
		  return this.finishNode(node, "TemplateLiteral")
		};

		pp$3.isAsyncProp = function(prop) {
		  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" &&
		    (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === types.star)) &&
		    !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
		};

		// Parse an object literal or binding pattern.

		pp$3.parseObj = function(isPattern, refDestructuringErrors) {
		  var this$1 = this;

		  var node = this.startNode(), first = true, propHash = {};
		  node.properties = [];
		  this.next();
		  while (!this.eat(types.braceR)) {
		    if (!first) {
		      this$1.expect(types.comma);
		      if (this$1.afterTrailingComma(types.braceR)) { break }
		    } else { first = false; }

		    var prop = this$1.parseProperty(isPattern, refDestructuringErrors);
		    if (!isPattern) { this$1.checkPropClash(prop, propHash, refDestructuringErrors); }
		    node.properties.push(prop);
		  }
		  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
		};

		pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
		  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
		  if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
		    if (isPattern) {
		      prop.argument = this.parseIdent(false);
		      if (this.type === types.comma) {
		        this.raise(this.start, "Comma is not permitted after the rest element");
		      }
		      return this.finishNode(prop, "RestElement")
		    }
		    // To disallow parenthesized identifier via `this.toAssignable()`.
		    if (this.type === types.parenL && refDestructuringErrors) {
		      if (refDestructuringErrors.parenthesizedAssign < 0) {
		        refDestructuringErrors.parenthesizedAssign = this.start;
		      }
		      if (refDestructuringErrors.parenthesizedBind < 0) {
		        refDestructuringErrors.parenthesizedBind = this.start;
		      }
		    }
		    // Parse argument.
		    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
		    // To disallow trailing comma via `this.toAssignable()`.
		    if (this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
		      refDestructuringErrors.trailingComma = this.start;
		    }
		    // Finish
		    return this.finishNode(prop, "SpreadElement")
		  }
		  if (this.options.ecmaVersion >= 6) {
		    prop.method = false;
		    prop.shorthand = false;
		    if (isPattern || refDestructuringErrors) {
		      startPos = this.start;
		      startLoc = this.startLoc;
		    }
		    if (!isPattern)
		      { isGenerator = this.eat(types.star); }
		  }
		  var containsEsc = this.containsEsc;
		  this.parsePropertyName(prop);
		  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
		    isAsync = true;
		    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
		    this.parsePropertyName(prop, refDestructuringErrors);
		  } else {
		    isAsync = false;
		  }
		  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
		  return this.finishNode(prop, "Property")
		};

		pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
		  if ((isGenerator || isAsync) && this.type === types.colon)
		    { this.unexpected(); }

		  if (this.eat(types.colon)) {
		    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
		    prop.kind = "init";
		  } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
		    if (isPattern) { this.unexpected(); }
		    prop.kind = "init";
		    prop.method = true;
		    prop.value = this.parseMethod(isGenerator, isAsync);
		  } else if (!isPattern && !containsEsc &&
		             this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
		             (prop.key.name === "get" || prop.key.name === "set") &&
		             (this.type !== types.comma && this.type !== types.braceR)) {
		    if (isGenerator || isAsync) { this.unexpected(); }
		    prop.kind = prop.key.name;
		    this.parsePropertyName(prop);
		    prop.value = this.parseMethod(false);
		    var paramCount = prop.kind === "get" ? 0 : 1;
		    if (prop.value.params.length !== paramCount) {
		      var start = prop.value.start;
		      if (prop.kind === "get")
		        { this.raiseRecoverable(start, "getter should have no params"); }
		      else
		        { this.raiseRecoverable(start, "setter should have exactly one param"); }
		    } else {
		      if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
		        { this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params"); }
		    }
		  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
		    this.checkUnreserved(prop.key);
		    prop.kind = "init";
		    if (isPattern) {
		      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
		    } else if (this.type === types.eq && refDestructuringErrors) {
		      if (refDestructuringErrors.shorthandAssign < 0)
		        { refDestructuringErrors.shorthandAssign = this.start; }
		      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
		    } else {
		      prop.value = prop.key;
		    }
		    prop.shorthand = true;
		  } else { this.unexpected(); }
		};

		pp$3.parsePropertyName = function(prop) {
		  if (this.options.ecmaVersion >= 6) {
		    if (this.eat(types.bracketL)) {
		      prop.computed = true;
		      prop.key = this.parseMaybeAssign();
		      this.expect(types.bracketR);
		      return prop.key
		    } else {
		      prop.computed = false;
		    }
		  }
		  return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(true)
		};

		// Initialize empty function node.

		pp$3.initFunction = function(node) {
		  node.id = null;
		  if (this.options.ecmaVersion >= 6) {
		    node.generator = false;
		    node.expression = false;
		  }
		  if (this.options.ecmaVersion >= 8)
		    { node.async = false; }
		};

		// Parse object or class method.

		pp$3.parseMethod = function(isGenerator, isAsync) {
		  var node = this.startNode(), oldInGen = this.inGenerator, oldInAsync = this.inAsync,
		      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction;

		  this.initFunction(node);
		  if (this.options.ecmaVersion >= 6)
		    { node.generator = isGenerator; }
		  if (this.options.ecmaVersion >= 8)
		    { node.async = !!isAsync; }

		  this.inGenerator = node.generator;
		  this.inAsync = node.async;
		  this.yieldPos = 0;
		  this.awaitPos = 0;
		  this.inFunction = true;
		  this.enterFunctionScope();

		  this.expect(types.parenL);
		  node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
		  this.checkYieldAwaitInDefaultParams();
		  this.parseFunctionBody(node, false);

		  this.inGenerator = oldInGen;
		  this.inAsync = oldInAsync;
		  this.yieldPos = oldYieldPos;
		  this.awaitPos = oldAwaitPos;
		  this.inFunction = oldInFunc;
		  return this.finishNode(node, "FunctionExpression")
		};

		// Parse arrow function expression with given parameters.

		pp$3.parseArrowExpression = function(node, params, isAsync) {
		  var oldInGen = this.inGenerator, oldInAsync = this.inAsync,
		      oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldInFunc = this.inFunction;

		  this.enterFunctionScope();
		  this.initFunction(node);
		  if (this.options.ecmaVersion >= 8)
		    { node.async = !!isAsync; }

		  this.inGenerator = false;
		  this.inAsync = node.async;
		  this.yieldPos = 0;
		  this.awaitPos = 0;
		  this.inFunction = true;

		  node.params = this.toAssignableList(params, true);
		  this.parseFunctionBody(node, true);

		  this.inGenerator = oldInGen;
		  this.inAsync = oldInAsync;
		  this.yieldPos = oldYieldPos;
		  this.awaitPos = oldAwaitPos;
		  this.inFunction = oldInFunc;
		  return this.finishNode(node, "ArrowFunctionExpression")
		};

		// Parse function body and check parameters.

		pp$3.parseFunctionBody = function(node, isArrowFunction) {
		  var isExpression = isArrowFunction && this.type !== types.braceL;
		  var oldStrict = this.strict, useStrict = false;

		  if (isExpression) {
		    node.body = this.parseMaybeAssign();
		    node.expression = true;
		    this.checkParams(node, false);
		  } else {
		    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
		    if (!oldStrict || nonSimple) {
		      useStrict = this.strictDirective(this.end);
		      // If this is a strict mode function, verify that argument names
		      // are not repeated, and it does not try to bind the words `eval`
		      // or `arguments`.
		      if (useStrict && nonSimple)
		        { this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"); }
		    }
		    // Start a new scope with regard to labels and the `inFunction`
		    // flag (restore them to their old value afterwards).
		    var oldLabels = this.labels;
		    this.labels = [];
		    if (useStrict) { this.strict = true; }

		    // Add the params to varDeclaredNames to ensure that an error is thrown
		    // if a let/const declaration in the function clashes with one of the params.
		    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && this.isSimpleParamList(node.params));
		    node.body = this.parseBlock(false);
		    node.expression = false;
		    this.adaptDirectivePrologue(node.body.body);
		    this.labels = oldLabels;
		  }
		  this.exitFunctionScope();

		  if (this.strict && node.id) {
		    // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
		    this.checkLVal(node.id, "none");
		  }
		  this.strict = oldStrict;
		};

		pp$3.isSimpleParamList = function(params) {
		  for (var i = 0, list = params; i < list.length; i += 1)
		    {
		    var param = list[i];

		    if (param.type !== "Identifier") { return false
		  } }
		  return true
		};

		// Checks function params for various disallowed patterns such as using "eval"
		// or "arguments" and duplicate parameters.

		pp$3.checkParams = function(node, allowDuplicates) {
		  var this$1 = this;

		  var nameHash = {};
		  for (var i = 0, list = node.params; i < list.length; i += 1)
		    {
		    var param = list[i];

		    this$1.checkLVal(param, "var", allowDuplicates ? null : nameHash);
		  }
		};

		// Parses a comma-separated list of expressions, and returns them as
		// an array. `close` is the token type that ends the list, and
		// `allowEmpty` can be turned on to allow subsequent commas with
		// nothing in between them to be parsed as `null` (which is needed
		// for array literals).

		pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
		  var this$1 = this;

		  var elts = [], first = true;
		  while (!this.eat(close)) {
		    if (!first) {
		      this$1.expect(types.comma);
		      if (allowTrailingComma && this$1.afterTrailingComma(close)) { break }
		    } else { first = false; }

		    var elt = (void 0);
		    if (allowEmpty && this$1.type === types.comma)
		      { elt = null; }
		    else if (this$1.type === types.ellipsis) {
		      elt = this$1.parseSpread(refDestructuringErrors);
		      if (refDestructuringErrors && this$1.type === types.comma && refDestructuringErrors.trailingComma < 0)
		        { refDestructuringErrors.trailingComma = this$1.start; }
		    } else {
		      elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
		    }
		    elts.push(elt);
		  }
		  return elts
		};

		pp$3.checkUnreserved = function(ref) {
		  var start = ref.start;
		  var end = ref.end;
		  var name = ref.name;

		  if (this.inGenerator && name === "yield")
		    { this.raiseRecoverable(start, "Can not use 'yield' as identifier inside a generator"); }
		  if (this.inAsync && name === "await")
		    { this.raiseRecoverable(start, "Can not use 'await' as identifier inside an async function"); }
		  if (this.isKeyword(name))
		    { this.raise(start, ("Unexpected keyword '" + name + "'")); }
		  if (this.options.ecmaVersion < 6 &&
		    this.input.slice(start, end).indexOf("\\") !== -1) { return }
		  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
		  if (re.test(name)) {
		    if (!this.inAsync && name === "await")
		      { this.raiseRecoverable(start, "Can not use keyword 'await' outside an async function"); }
		    this.raiseRecoverable(start, ("The keyword '" + name + "' is reserved"));
		  }
		};

		// Parse the next token as an identifier. If `liberal` is true (used
		// when parsing properties), it will also convert keywords into
		// identifiers.

		pp$3.parseIdent = function(liberal, isBinding) {
		  var node = this.startNode();
		  if (liberal && this.options.allowReserved === "never") { liberal = false; }
		  if (this.type === types.name) {
		    node.name = this.value;
		  } else if (this.type.keyword) {
		    node.name = this.type.keyword;

		    // To fix https://github.com/acornjs/acorn/issues/575
		    // `class` and `function` keywords push new context into this.context.
		    // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
		    // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
		    if ((node.name === "class" || node.name === "function") &&
		        (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
		      this.context.pop();
		    }
		  } else {
		    this.unexpected();
		  }
		  this.next();
		  this.finishNode(node, "Identifier");
		  if (!liberal) { this.checkUnreserved(node); }
		  return node
		};

		// Parses yield expression inside generator.

		pp$3.parseYield = function() {
		  if (!this.yieldPos) { this.yieldPos = this.start; }

		  var node = this.startNode();
		  this.next();
		  if (this.type === types.semi || this.canInsertSemicolon() || (this.type !== types.star && !this.type.startsExpr)) {
		    node.delegate = false;
		    node.argument = null;
		  } else {
		    node.delegate = this.eat(types.star);
		    node.argument = this.parseMaybeAssign();
		  }
		  return this.finishNode(node, "YieldExpression")
		};

		pp$3.parseAwait = function() {
		  if (!this.awaitPos) { this.awaitPos = this.start; }

		  var node = this.startNode();
		  this.next();
		  node.argument = this.parseMaybeUnary(null, true);
		  return this.finishNode(node, "AwaitExpression")
		};

		var pp$4 = Parser.prototype;

		// This function is used to raise exceptions on parse errors. It
		// takes an offset integer (into the current `input`) to indicate
		// the location of the error, attaches the position to the end
		// of the error message, and then raises a `SyntaxError` with that
		// message.

		pp$4.raise = function(pos, message) {
		  var loc = getLineInfo(this.input, pos);
		  message += " (" + loc.line + ":" + loc.column + ")";
		  var err = new SyntaxError(message);
		  err.pos = pos; err.loc = loc; err.raisedAt = this.pos;
		  throw err
		};

		pp$4.raiseRecoverable = pp$4.raise;

		pp$4.curPosition = function() {
		  if (this.options.locations) {
		    return new Position(this.curLine, this.pos - this.lineStart)
		  }
		};

		var pp$5 = Parser.prototype;

		// Object.assign polyfill
		var assign$1 = Object.assign || function(target) {
		  var sources = [], len = arguments.length - 1;
		  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

		  for (var i = 0, list = sources; i < list.length; i += 1) {
		    var source = list[i];

		    for (var key in source) {
		      if (has(source, key)) {
		        target[key] = source[key];
		      }
		    }
		  }
		  return target
		};

		// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

		pp$5.enterFunctionScope = function() {
		  // var: a hash of var-declared names in the current lexical scope
		  // lexical: a hash of lexically-declared names in the current lexical scope
		  // childVar: a hash of var-declared names in all child lexical scopes of the current lexical scope (within the current function scope)
		  // parentLexical: a hash of lexically-declared names in all parent lexical scopes of the current lexical scope (within the current function scope)
		  this.scopeStack.push({var: {}, lexical: {}, childVar: {}, parentLexical: {}});
		};

		pp$5.exitFunctionScope = function() {
		  this.scopeStack.pop();
		};

		pp$5.enterLexicalScope = function() {
		  var parentScope = this.scopeStack[this.scopeStack.length - 1];
		  var childScope = {var: {}, lexical: {}, childVar: {}, parentLexical: {}};

		  this.scopeStack.push(childScope);
		  assign$1(childScope.parentLexical, parentScope.lexical, parentScope.parentLexical);
		};

		pp$5.exitLexicalScope = function() {
		  var childScope = this.scopeStack.pop();
		  var parentScope = this.scopeStack[this.scopeStack.length - 1];

		  assign$1(parentScope.childVar, childScope.var, childScope.childVar);
		};

		/**
		 * A name can be declared with `var` if there are no variables with the same name declared with `let`/`const`
		 * in the current lexical scope or any of the parent lexical scopes in this function.
		 */
		pp$5.canDeclareVarName = function(name) {
		  var currentScope = this.scopeStack[this.scopeStack.length - 1];

		  return !has(currentScope.lexical, name) && !has(currentScope.parentLexical, name)
		};

		/**
		 * A name can be declared with `let`/`const` if there are no variables with the same name declared with `let`/`const`
		 * in the current scope, and there are no variables with the same name declared with `var` in the current scope or in
		 * any child lexical scopes in this function.
		 */
		pp$5.canDeclareLexicalName = function(name) {
		  var currentScope = this.scopeStack[this.scopeStack.length - 1];

		  return !has(currentScope.lexical, name) && !has(currentScope.var, name) && !has(currentScope.childVar, name)
		};

		pp$5.declareVarName = function(name) {
		  this.scopeStack[this.scopeStack.length - 1].var[name] = true;
		};

		pp$5.declareLexicalName = function(name) {
		  this.scopeStack[this.scopeStack.length - 1].lexical[name] = true;
		};

		var Node = function Node(parser, pos, loc) {
		  this.type = "";
		  this.start = pos;
		  this.end = 0;
		  if (parser.options.locations)
		    { this.loc = new SourceLocation(parser, loc); }
		  if (parser.options.directSourceFile)
		    { this.sourceFile = parser.options.directSourceFile; }
		  if (parser.options.ranges)
		    { this.range = [pos, 0]; }
		};

		// Start an AST node, attaching a start offset.

		var pp$6 = Parser.prototype;

		pp$6.startNode = function() {
		  return new Node(this, this.start, this.startLoc)
		};

		pp$6.startNodeAt = function(pos, loc) {
		  return new Node(this, pos, loc)
		};

		// Finish an AST node, adding `type` and `end` properties.

		function finishNodeAt(node, type, pos, loc) {
		  node.type = type;
		  node.end = pos;
		  if (this.options.locations)
		    { node.loc.end = loc; }
		  if (this.options.ranges)
		    { node.range[1] = pos; }
		  return node
		}

		pp$6.finishNode = function(node, type) {
		  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc)
		};

		// Finish node at given position

		pp$6.finishNodeAt = function(node, type, pos, loc) {
		  return finishNodeAt.call(this, node, type, pos, loc)
		};

		// The algorithm used to determine whether a regexp can appear at a
		// given point in the program is loosely based on sweet.js' approach.
		// See https://github.com/mozilla/sweet.js/wiki/design

		var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
		  this.token = token;
		  this.isExpr = !!isExpr;
		  this.preserveSpace = !!preserveSpace;
		  this.override = override;
		  this.generator = !!generator;
		};

		var types$1 = {
		  b_stat: new TokContext("{", false),
		  b_expr: new TokContext("{", true),
		  b_tmpl: new TokContext("${", false),
		  p_stat: new TokContext("(", false),
		  p_expr: new TokContext("(", true),
		  q_tmpl: new TokContext("`", true, true, function (p) { return p.tryReadTemplateToken(); }),
		  f_stat: new TokContext("function", false),
		  f_expr: new TokContext("function", true),
		  f_expr_gen: new TokContext("function", true, false, null, true),
		  f_gen: new TokContext("function", false, false, null, true)
		};

		var pp$7 = Parser.prototype;

		pp$7.initialContext = function() {
		  return [types$1.b_stat]
		};

		pp$7.braceIsBlock = function(prevType) {
		  var parent = this.curContext();
		  if (parent === types$1.f_expr || parent === types$1.f_stat)
		    { return true }
		  if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr))
		    { return !parent.isExpr }

		  // The check for `tt.name && exprAllowed` detects whether we are
		  // after a `yield` or `of` construct. See the `updateContext` for
		  // `tt.name`.
		  if (prevType === types._return || prevType === types.name && this.exprAllowed)
		    { return lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) }
		  if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow)
		    { return true }
		  if (prevType === types.braceL)
		    { return parent === types$1.b_stat }
		  if (prevType === types._var || prevType === types.name)
		    { return false }
		  return !this.exprAllowed
		};

		pp$7.inGeneratorContext = function() {
		  var this$1 = this;

		  for (var i = this.context.length - 1; i >= 1; i--) {
		    var context = this$1.context[i];
		    if (context.token === "function")
		      { return context.generator }
		  }
		  return false
		};

		pp$7.updateContext = function(prevType) {
		  var update, type = this.type;
		  if (type.keyword && prevType === types.dot)
		    { this.exprAllowed = false; }
		  else if (update = type.updateContext)
		    { update.call(this, prevType); }
		  else
		    { this.exprAllowed = type.beforeExpr; }
		};

		// Token-specific context update code

		types.parenR.updateContext = types.braceR.updateContext = function() {
		  if (this.context.length === 1) {
		    this.exprAllowed = true;
		    return
		  }
		  var out = this.context.pop();
		  if (out === types$1.b_stat && this.curContext().token === "function") {
		    out = this.context.pop();
		  }
		  this.exprAllowed = !out.isExpr;
		};

		types.braceL.updateContext = function(prevType) {
		  this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
		  this.exprAllowed = true;
		};

		types.dollarBraceL.updateContext = function() {
		  this.context.push(types$1.b_tmpl);
		  this.exprAllowed = true;
		};

		types.parenL.updateContext = function(prevType) {
		  var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
		  this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
		  this.exprAllowed = true;
		};

		types.incDec.updateContext = function() {
		  // tokExprAllowed stays unchanged
		};

		types._function.updateContext = types._class.updateContext = function(prevType) {
		  if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else &&
		      !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat))
		    { this.context.push(types$1.f_expr); }
		  else
		    { this.context.push(types$1.f_stat); }
		  this.exprAllowed = false;
		};

		types.backQuote.updateContext = function() {
		  if (this.curContext() === types$1.q_tmpl)
		    { this.context.pop(); }
		  else
		    { this.context.push(types$1.q_tmpl); }
		  this.exprAllowed = false;
		};

		types.star.updateContext = function(prevType) {
		  if (prevType === types._function) {
		    var index = this.context.length - 1;
		    if (this.context[index] === types$1.f_expr)
		      { this.context[index] = types$1.f_expr_gen; }
		    else
		      { this.context[index] = types$1.f_gen; }
		  }
		  this.exprAllowed = true;
		};

		types.name.updateContext = function(prevType) {
		  var allowed = false;
		  if (this.options.ecmaVersion >= 6 && prevType !== types.dot) {
		    if (this.value === "of" && !this.exprAllowed ||
		        this.value === "yield" && this.inGeneratorContext())
		      { allowed = true; }
		  }
		  this.exprAllowed = allowed;
		};

		var data = {
		  "$LONE": [
		    "ASCII",
		    "ASCII_Hex_Digit",
		    "AHex",
		    "Alphabetic",
		    "Alpha",
		    "Any",
		    "Assigned",
		    "Bidi_Control",
		    "Bidi_C",
		    "Bidi_Mirrored",
		    "Bidi_M",
		    "Case_Ignorable",
		    "CI",
		    "Cased",
		    "Changes_When_Casefolded",
		    "CWCF",
		    "Changes_When_Casemapped",
		    "CWCM",
		    "Changes_When_Lowercased",
		    "CWL",
		    "Changes_When_NFKC_Casefolded",
		    "CWKCF",
		    "Changes_When_Titlecased",
		    "CWT",
		    "Changes_When_Uppercased",
		    "CWU",
		    "Dash",
		    "Default_Ignorable_Code_Point",
		    "DI",
		    "Deprecated",
		    "Dep",
		    "Diacritic",
		    "Dia",
		    "Emoji",
		    "Emoji_Component",
		    "Emoji_Modifier",
		    "Emoji_Modifier_Base",
		    "Emoji_Presentation",
		    "Extender",
		    "Ext",
		    "Grapheme_Base",
		    "Gr_Base",
		    "Grapheme_Extend",
		    "Gr_Ext",
		    "Hex_Digit",
		    "Hex",
		    "IDS_Binary_Operator",
		    "IDSB",
		    "IDS_Trinary_Operator",
		    "IDST",
		    "ID_Continue",
		    "IDC",
		    "ID_Start",
		    "IDS",
		    "Ideographic",
		    "Ideo",
		    "Join_Control",
		    "Join_C",
		    "Logical_Order_Exception",
		    "LOE",
		    "Lowercase",
		    "Lower",
		    "Math",
		    "Noncharacter_Code_Point",
		    "NChar",
		    "Pattern_Syntax",
		    "Pat_Syn",
		    "Pattern_White_Space",
		    "Pat_WS",
		    "Quotation_Mark",
		    "QMark",
		    "Radical",
		    "Regional_Indicator",
		    "RI",
		    "Sentence_Terminal",
		    "STerm",
		    "Soft_Dotted",
		    "SD",
		    "Terminal_Punctuation",
		    "Term",
		    "Unified_Ideograph",
		    "UIdeo",
		    "Uppercase",
		    "Upper",
		    "Variation_Selector",
		    "VS",
		    "White_Space",
		    "space",
		    "XID_Continue",
		    "XIDC",
		    "XID_Start",
		    "XIDS"
		  ],
		  "General_Category": [
		    "Cased_Letter",
		    "LC",
		    "Close_Punctuation",
		    "Pe",
		    "Connector_Punctuation",
		    "Pc",
		    "Control",
		    "Cc",
		    "cntrl",
		    "Currency_Symbol",
		    "Sc",
		    "Dash_Punctuation",
		    "Pd",
		    "Decimal_Number",
		    "Nd",
		    "digit",
		    "Enclosing_Mark",
		    "Me",
		    "Final_Punctuation",
		    "Pf",
		    "Format",
		    "Cf",
		    "Initial_Punctuation",
		    "Pi",
		    "Letter",
		    "L",
		    "Letter_Number",
		    "Nl",
		    "Line_Separator",
		    "Zl",
		    "Lowercase_Letter",
		    "Ll",
		    "Mark",
		    "M",
		    "Combining_Mark",
		    "Math_Symbol",
		    "Sm",
		    "Modifier_Letter",
		    "Lm",
		    "Modifier_Symbol",
		    "Sk",
		    "Nonspacing_Mark",
		    "Mn",
		    "Number",
		    "N",
		    "Open_Punctuation",
		    "Ps",
		    "Other",
		    "C",
		    "Other_Letter",
		    "Lo",
		    "Other_Number",
		    "No",
		    "Other_Punctuation",
		    "Po",
		    "Other_Symbol",
		    "So",
		    "Paragraph_Separator",
		    "Zp",
		    "Private_Use",
		    "Co",
		    "Punctuation",
		    "P",
		    "punct",
		    "Separator",
		    "Z",
		    "Space_Separator",
		    "Zs",
		    "Spacing_Mark",
		    "Mc",
		    "Surrogate",
		    "Cs",
		    "Symbol",
		    "S",
		    "Titlecase_Letter",
		    "Lt",
		    "Unassigned",
		    "Cn",
		    "Uppercase_Letter",
		    "Lu"
		  ],
		  "Script": [
		    "Adlam",
		    "Adlm",
		    "Ahom",
		    "Anatolian_Hieroglyphs",
		    "Hluw",
		    "Arabic",
		    "Arab",
		    "Armenian",
		    "Armn",
		    "Avestan",
		    "Avst",
		    "Balinese",
		    "Bali",
		    "Bamum",
		    "Bamu",
		    "Bassa_Vah",
		    "Bass",
		    "Batak",
		    "Batk",
		    "Bengali",
		    "Beng",
		    "Bhaiksuki",
		    "Bhks",
		    "Bopomofo",
		    "Bopo",
		    "Brahmi",
		    "Brah",
		    "Braille",
		    "Brai",
		    "Buginese",
		    "Bugi",
		    "Buhid",
		    "Buhd",
		    "Canadian_Aboriginal",
		    "Cans",
		    "Carian",
		    "Cari",
		    "Caucasian_Albanian",
		    "Aghb",
		    "Chakma",
		    "Cakm",
		    "Cham",
		    "Cherokee",
		    "Cher",
		    "Common",
		    "Zyyy",
		    "Coptic",
		    "Copt",
		    "Qaac",
		    "Cuneiform",
		    "Xsux",
		    "Cypriot",
		    "Cprt",
		    "Cyrillic",
		    "Cyrl",
		    "Deseret",
		    "Dsrt",
		    "Devanagari",
		    "Deva",
		    "Duployan",
		    "Dupl",
		    "Egyptian_Hieroglyphs",
		    "Egyp",
		    "Elbasan",
		    "Elba",
		    "Ethiopic",
		    "Ethi",
		    "Georgian",
		    "Geor",
		    "Glagolitic",
		    "Glag",
		    "Gothic",
		    "Goth",
		    "Grantha",
		    "Gran",
		    "Greek",
		    "Grek",
		    "Gujarati",
		    "Gujr",
		    "Gurmukhi",
		    "Guru",
		    "Han",
		    "Hani",
		    "Hangul",
		    "Hang",
		    "Hanunoo",
		    "Hano",
		    "Hatran",
		    "Hatr",
		    "Hebrew",
		    "Hebr",
		    "Hiragana",
		    "Hira",
		    "Imperial_Aramaic",
		    "Armi",
		    "Inherited",
		    "Zinh",
		    "Qaai",
		    "Inscriptional_Pahlavi",
		    "Phli",
		    "Inscriptional_Parthian",
		    "Prti",
		    "Javanese",
		    "Java",
		    "Kaithi",
		    "Kthi",
		    "Kannada",
		    "Knda",
		    "Katakana",
		    "Kana",
		    "Kayah_Li",
		    "Kali",
		    "Kharoshthi",
		    "Khar",
		    "Khmer",
		    "Khmr",
		    "Khojki",
		    "Khoj",
		    "Khudawadi",
		    "Sind",
		    "Lao",
		    "Laoo",
		    "Latin",
		    "Latn",
		    "Lepcha",
		    "Lepc",
		    "Limbu",
		    "Limb",
		    "Linear_A",
		    "Lina",
		    "Linear_B",
		    "Linb",
		    "Lisu",
		    "Lycian",
		    "Lyci",
		    "Lydian",
		    "Lydi",
		    "Mahajani",
		    "Mahj",
		    "Malayalam",
		    "Mlym",
		    "Mandaic",
		    "Mand",
		    "Manichaean",
		    "Mani",
		    "Marchen",
		    "Marc",
		    "Masaram_Gondi",
		    "Gonm",
		    "Meetei_Mayek",
		    "Mtei",
		    "Mende_Kikakui",
		    "Mend",
		    "Meroitic_Cursive",
		    "Merc",
		    "Meroitic_Hieroglyphs",
		    "Mero",
		    "Miao",
		    "Plrd",
		    "Modi",
		    "Mongolian",
		    "Mong",
		    "Mro",
		    "Mroo",
		    "Multani",
		    "Mult",
		    "Myanmar",
		    "Mymr",
		    "Nabataean",
		    "Nbat",
		    "New_Tai_Lue",
		    "Talu",
		    "Newa",
		    "Nko",
		    "Nkoo",
		    "Nushu",
		    "Nshu",
		    "Ogham",
		    "Ogam",
		    "Ol_Chiki",
		    "Olck",
		    "Old_Hungarian",
		    "Hung",
		    "Old_Italic",
		    "Ital",
		    "Old_North_Arabian",
		    "Narb",
		    "Old_Permic",
		    "Perm",
		    "Old_Persian",
		    "Xpeo",
		    "Old_South_Arabian",
		    "Sarb",
		    "Old_Turkic",
		    "Orkh",
		    "Oriya",
		    "Orya",
		    "Osage",
		    "Osge",
		    "Osmanya",
		    "Osma",
		    "Pahawh_Hmong",
		    "Hmng",
		    "Palmyrene",
		    "Palm",
		    "Pau_Cin_Hau",
		    "Pauc",
		    "Phags_Pa",
		    "Phag",
		    "Phoenician",
		    "Phnx",
		    "Psalter_Pahlavi",
		    "Phlp",
		    "Rejang",
		    "Rjng",
		    "Runic",
		    "Runr",
		    "Samaritan",
		    "Samr",
		    "Saurashtra",
		    "Saur",
		    "Sharada",
		    "Shrd",
		    "Shavian",
		    "Shaw",
		    "Siddham",
		    "Sidd",
		    "SignWriting",
		    "Sgnw",
		    "Sinhala",
		    "Sinh",
		    "Sora_Sompeng",
		    "Sora",
		    "Soyombo",
		    "Soyo",
		    "Sundanese",
		    "Sund",
		    "Syloti_Nagri",
		    "Sylo",
		    "Syriac",
		    "Syrc",
		    "Tagalog",
		    "Tglg",
		    "Tagbanwa",
		    "Tagb",
		    "Tai_Le",
		    "Tale",
		    "Tai_Tham",
		    "Lana",
		    "Tai_Viet",
		    "Tavt",
		    "Takri",
		    "Takr",
		    "Tamil",
		    "Taml",
		    "Tangut",
		    "Tang",
		    "Telugu",
		    "Telu",
		    "Thaana",
		    "Thaa",
		    "Thai",
		    "Tibetan",
		    "Tibt",
		    "Tifinagh",
		    "Tfng",
		    "Tirhuta",
		    "Tirh",
		    "Ugaritic",
		    "Ugar",
		    "Vai",
		    "Vaii",
		    "Warang_Citi",
		    "Wara",
		    "Yi",
		    "Yiii",
		    "Zanabazar_Square",
		    "Zanb"
		  ]
		};
		Array.prototype.push.apply(data.$LONE, data.General_Category);
		data.gc = data.General_Category;
		data.sc = data.Script_Extensions = data.scx = data.Script;

		var pp$9 = Parser.prototype;

		var RegExpValidationState = function RegExpValidationState(parser) {
		  this.parser = parser;
		  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "");
		  this.source = "";
		  this.flags = "";
		  this.start = 0;
		  this.switchU = false;
		  this.switchN = false;
		  this.pos = 0;
		  this.lastIntValue = 0;
		  this.lastStringValue = "";
		  this.lastAssertionIsQuantifiable = false;
		  this.numCapturingParens = 0;
		  this.maxBackReference = 0;
		  this.groupNames = [];
		  this.backReferenceNames = [];
		};

		RegExpValidationState.prototype.reset = function reset (start, pattern, flags) {
		  var unicode = flags.indexOf("u") !== -1;
		  this.start = start | 0;
		  this.source = pattern + "";
		  this.flags = flags;
		  this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
		  this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
		};

		RegExpValidationState.prototype.raise = function raise (message) {
		  this.parser.raiseRecoverable(this.start, ("Invalid regular expression: /" + (this.source) + "/: " + message));
		};

		// If u flag is given, this returns the code point at the index (it combines a surrogate pair).
		// Otherwise, this returns the code unit of the index (can be a part of a surrogate pair).
		RegExpValidationState.prototype.at = function at (i) {
		  var s = this.source;
		  var l = s.length;
		  if (i >= l) {
		    return -1
		  }
		  var c = s.charCodeAt(i);
		  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
		    return c
		  }
		  return (c << 10) + s.charCodeAt(i + 1) - 0x35FDC00
		};

		RegExpValidationState.prototype.nextIndex = function nextIndex (i) {
		  var s = this.source;
		  var l = s.length;
		  if (i >= l) {
		    return l
		  }
		  var c = s.charCodeAt(i);
		  if (!this.switchU || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l) {
		    return i + 1
		  }
		  return i + 2
		};

		RegExpValidationState.prototype.current = function current () {
		  return this.at(this.pos)
		};

		RegExpValidationState.prototype.lookahead = function lookahead () {
		  return this.at(this.nextIndex(this.pos))
		};

		RegExpValidationState.prototype.advance = function advance () {
		  this.pos = this.nextIndex(this.pos);
		};

		RegExpValidationState.prototype.eat = function eat (ch) {
		  if (this.current() === ch) {
		    this.advance();
		    return true
		  }
		  return false
		};

		function codePointToString$1(ch) {
		  if (ch <= 0xFFFF) { return String.fromCharCode(ch) }
		  ch -= 0x10000;
		  return String.fromCharCode((ch >> 10) + 0xD800, (ch & 0x03FF) + 0xDC00)
		}

		/**
		 * Validate the flags part of a given RegExpLiteral.
		 *
		 * @param {RegExpValidationState} state The state to validate RegExp.
		 * @returns {void}
		 */
		pp$9.validateRegExpFlags = function(state) {
		  var this$1 = this;

		  var validFlags = state.validFlags;
		  var flags = state.flags;

		  for (var i = 0; i < flags.length; i++) {
		    var flag = flags.charAt(i);
		    if (validFlags.indexOf(flag) === -1) {
		      this$1.raise(state.start, "Invalid regular expression flag");
		    }
		    if (flags.indexOf(flag, i + 1) > -1) {
		      this$1.raise(state.start, "Duplicate regular expression flag");
		    }
		  }
		};

		/**
		 * Validate the pattern part of a given RegExpLiteral.
		 *
		 * @param {RegExpValidationState} state The state to validate RegExp.
		 * @returns {void}
		 */
		pp$9.validateRegExpPattern = function(state) {
		  this.regexp_pattern(state);

		  // The goal symbol for the parse is |Pattern[~U, ~N]|. If the result of
		  // parsing contains a |GroupName|, reparse with the goal symbol
		  // |Pattern[~U, +N]| and use this result instead. Throw a *SyntaxError*
		  // exception if _P_ did not conform to the grammar, if any elements of _P_
		  // were not matched by the parse, or if any Early Error conditions exist.
		  if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
		    state.switchN = true;
		    this.regexp_pattern(state);
		  }
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-Pattern
		pp$9.regexp_pattern = function(state) {
		  state.pos = 0;
		  state.lastIntValue = 0;
		  state.lastStringValue = "";
		  state.lastAssertionIsQuantifiable = false;
		  state.numCapturingParens = 0;
		  state.maxBackReference = 0;
		  state.groupNames.length = 0;
		  state.backReferenceNames.length = 0;

		  this.regexp_disjunction(state);

		  if (state.pos !== state.source.length) {
		    // Make the same messages as V8.
		    if (state.eat(0x29 /* ) */)) {
		      state.raise("Unmatched ')'");
		    }
		    if (state.eat(0x5D /* [ */) || state.eat(0x7D /* } */)) {
		      state.raise("Lone quantifier brackets");
		    }
		  }
		  if (state.maxBackReference > state.numCapturingParens) {
		    state.raise("Invalid escape");
		  }
		  for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
		    var name = list[i];

		    if (state.groupNames.indexOf(name) === -1) {
		      state.raise("Invalid named capture referenced");
		    }
		  }
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-Disjunction
		pp$9.regexp_disjunction = function(state) {
		  var this$1 = this;

		  this.regexp_alternative(state);
		  while (state.eat(0x7C /* | */)) {
		    this$1.regexp_alternative(state);
		  }

		  // Make the same message as V8.
		  if (this.regexp_eatQuantifier(state, true)) {
		    state.raise("Nothing to repeat");
		  }
		  if (state.eat(0x7B /* { */)) {
		    state.raise("Lone quantifier brackets");
		  }
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-Alternative
		pp$9.regexp_alternative = function(state) {
		  while (state.pos < state.source.length && this.regexp_eatTerm(state))
		    {  }
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Term
		pp$9.regexp_eatTerm = function(state) {
		  if (this.regexp_eatAssertion(state)) {
		    // Handle `QuantifiableAssertion Quantifier` alternative.
		    // `state.lastAssertionIsQuantifiable` is true if the last eaten Assertion
		    // is a QuantifiableAssertion.
		    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
		      // Make the same message as V8.
		      if (state.switchU) {
		        state.raise("Invalid quantifier");
		      }
		    }
		    return true
		  }

		  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
		    this.regexp_eatQuantifier(state);
		    return true
		  }

		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-Assertion
		pp$9.regexp_eatAssertion = function(state) {
		  var start = state.pos;
		  state.lastAssertionIsQuantifiable = false;

		  // ^, $
		  if (state.eat(0x5E /* ^ */) || state.eat(0x24 /* $ */)) {
		    return true
		  }

		  // \b \B
		  if (state.eat(0x5C /* \ */)) {
		    if (state.eat(0x42 /* B */) || state.eat(0x62 /* b */)) {
		      return true
		    }
		    state.pos = start;
		  }

		  // Lookahead / Lookbehind
		  if (state.eat(0x28 /* ( */) && state.eat(0x3F /* ? */)) {
		    var lookbehind = false;
		    if (this.options.ecmaVersion >= 9) {
		      lookbehind = state.eat(0x3C /* < */);
		    }
		    if (state.eat(0x3D /* = */) || state.eat(0x21 /* ! */)) {
		      this.regexp_disjunction(state);
		      if (!state.eat(0x29 /* ) */)) {
		        state.raise("Unterminated group");
		      }
		      state.lastAssertionIsQuantifiable = !lookbehind;
		      return true
		    }
		  }

		  state.pos = start;
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-Quantifier
		pp$9.regexp_eatQuantifier = function(state, noError) {
		  if ( noError === void 0 ) noError = false;

		  if (this.regexp_eatQuantifierPrefix(state, noError)) {
		    state.eat(0x3F /* ? */);
		    return true
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-QuantifierPrefix
		pp$9.regexp_eatQuantifierPrefix = function(state, noError) {
		  return (
		    state.eat(0x2A /* * */) ||
		    state.eat(0x2B /* + */) ||
		    state.eat(0x3F /* ? */) ||
		    this.regexp_eatBracedQuantifier(state, noError)
		  )
		};
		pp$9.regexp_eatBracedQuantifier = function(state, noError) {
		  var start = state.pos;
		  if (state.eat(0x7B /* { */)) {
		    var min = 0, max = -1;
		    if (this.regexp_eatDecimalDigits(state)) {
		      min = state.lastIntValue;
		      if (state.eat(0x2C /* , */) && this.regexp_eatDecimalDigits(state)) {
		        max = state.lastIntValue;
		      }
		      if (state.eat(0x7D /* } */)) {
		        // SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-term
		        if (max !== -1 && max < min && !noError) {
		          state.raise("numbers out of order in {} quantifier");
		        }
		        return true
		      }
		    }
		    if (state.switchU && !noError) {
		      state.raise("Incomplete quantifier");
		    }
		    state.pos = start;
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-Atom
		pp$9.regexp_eatAtom = function(state) {
		  return (
		    this.regexp_eatPatternCharacters(state) ||
		    state.eat(0x2E /* . */) ||
		    this.regexp_eatReverseSolidusAtomEscape(state) ||
		    this.regexp_eatCharacterClass(state) ||
		    this.regexp_eatUncapturingGroup(state) ||
		    this.regexp_eatCapturingGroup(state)
		  )
		};
		pp$9.regexp_eatReverseSolidusAtomEscape = function(state) {
		  var start = state.pos;
		  if (state.eat(0x5C /* \ */)) {
		    if (this.regexp_eatAtomEscape(state)) {
		      return true
		    }
		    state.pos = start;
		  }
		  return false
		};
		pp$9.regexp_eatUncapturingGroup = function(state) {
		  var start = state.pos;
		  if (state.eat(0x28 /* ( */)) {
		    if (state.eat(0x3F /* ? */) && state.eat(0x3A /* : */)) {
		      this.regexp_disjunction(state);
		      if (state.eat(0x29 /* ) */)) {
		        return true
		      }
		      state.raise("Unterminated group");
		    }
		    state.pos = start;
		  }
		  return false
		};
		pp$9.regexp_eatCapturingGroup = function(state) {
		  if (state.eat(0x28 /* ( */)) {
		    if (this.options.ecmaVersion >= 9) {
		      this.regexp_groupSpecifier(state);
		    } else if (state.current() === 0x3F /* ? */) {
		      state.raise("Invalid group");
		    }
		    this.regexp_disjunction(state);
		    if (state.eat(0x29 /* ) */)) {
		      state.numCapturingParens += 1;
		      return true
		    }
		    state.raise("Unterminated group");
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedAtom
		pp$9.regexp_eatExtendedAtom = function(state) {
		  return (
		    state.eat(0x2E /* . */) ||
		    this.regexp_eatReverseSolidusAtomEscape(state) ||
		    this.regexp_eatCharacterClass(state) ||
		    this.regexp_eatUncapturingGroup(state) ||
		    this.regexp_eatCapturingGroup(state) ||
		    this.regexp_eatInvalidBracedQuantifier(state) ||
		    this.regexp_eatExtendedPatternCharacter(state)
		  )
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-InvalidBracedQuantifier
		pp$9.regexp_eatInvalidBracedQuantifier = function(state) {
		  if (this.regexp_eatBracedQuantifier(state, true)) {
		    state.raise("Nothing to repeat");
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-SyntaxCharacter
		pp$9.regexp_eatSyntaxCharacter = function(state) {
		  var ch = state.current();
		  if (isSyntaxCharacter(ch)) {
		    state.lastIntValue = ch;
		    state.advance();
		    return true
		  }
		  return false
		};
		function isSyntaxCharacter(ch) {
		  return (
		    ch === 0x24 /* $ */ ||
		    ch >= 0x28 /* ( */ && ch <= 0x2B /* + */ ||
		    ch === 0x2E /* . */ ||
		    ch === 0x3F /* ? */ ||
		    ch >= 0x5B /* [ */ && ch <= 0x5E /* ^ */ ||
		    ch >= 0x7B /* { */ && ch <= 0x7D /* } */
		  )
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-PatternCharacter
		// But eat eager.
		pp$9.regexp_eatPatternCharacters = function(state) {
		  var start = state.pos;
		  var ch = 0;
		  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
		    state.advance();
		  }
		  return state.pos !== start
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ExtendedPatternCharacter
		pp$9.regexp_eatExtendedPatternCharacter = function(state) {
		  var ch = state.current();
		  if (
		    ch !== -1 &&
		    ch !== 0x24 /* $ */ &&
		    !(ch >= 0x28 /* ( */ && ch <= 0x2B /* + */) &&
		    ch !== 0x2E /* . */ &&
		    ch !== 0x3F /* ? */ &&
		    ch !== 0x5B /* [ */ &&
		    ch !== 0x5E /* ^ */ &&
		    ch !== 0x7C /* | */
		  ) {
		    state.advance();
		    return true
		  }
		  return false
		};

		// GroupSpecifier[U] ::
		//   [empty]
		//   `?` GroupName[?U]
		pp$9.regexp_groupSpecifier = function(state) {
		  if (state.eat(0x3F /* ? */)) {
		    if (this.regexp_eatGroupName(state)) {
		      if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
		        state.raise("Duplicate capture group name");
		      }
		      state.groupNames.push(state.lastStringValue);
		      return
		    }
		    state.raise("Invalid group");
		  }
		};

		// GroupName[U] ::
		//   `<` RegExpIdentifierName[?U] `>`
		// Note: this updates `state.lastStringValue` property with the eaten name.
		pp$9.regexp_eatGroupName = function(state) {
		  state.lastStringValue = "";
		  if (state.eat(0x3C /* < */)) {
		    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E /* > */)) {
		      return true
		    }
		    state.raise("Invalid capture group name");
		  }
		  return false
		};

		// RegExpIdentifierName[U] ::
		//   RegExpIdentifierStart[?U]
		//   RegExpIdentifierName[?U] RegExpIdentifierPart[?U]
		// Note: this updates `state.lastStringValue` property with the eaten name.
		pp$9.regexp_eatRegExpIdentifierName = function(state) {
		  state.lastStringValue = "";
		  if (this.regexp_eatRegExpIdentifierStart(state)) {
		    state.lastStringValue += codePointToString$1(state.lastIntValue);
		    while (this.regexp_eatRegExpIdentifierPart(state)) {
		      state.lastStringValue += codePointToString$1(state.lastIntValue);
		    }
		    return true
		  }
		  return false
		};

		// RegExpIdentifierStart[U] ::
		//   UnicodeIDStart
		//   `$`
		//   `_`
		//   `\` RegExpUnicodeEscapeSequence[?U]
		pp$9.regexp_eatRegExpIdentifierStart = function(state) {
		  var start = state.pos;
		  var ch = state.current();
		  state.advance();

		  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
		    ch = state.lastIntValue;
		  }
		  if (isRegExpIdentifierStart(ch)) {
		    state.lastIntValue = ch;
		    return true
		  }

		  state.pos = start;
		  return false
		};
		function isRegExpIdentifierStart(ch) {
		  return isIdentifierStart(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */
		}

		// RegExpIdentifierPart[U] ::
		//   UnicodeIDContinue
		//   `$`
		//   `_`
		//   `\` RegExpUnicodeEscapeSequence[?U]
		//   <ZWNJ>
		//   <ZWJ>
		pp$9.regexp_eatRegExpIdentifierPart = function(state) {
		  var start = state.pos;
		  var ch = state.current();
		  state.advance();

		  if (ch === 0x5C /* \ */ && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
		    ch = state.lastIntValue;
		  }
		  if (isRegExpIdentifierPart(ch)) {
		    state.lastIntValue = ch;
		    return true
		  }

		  state.pos = start;
		  return false
		};
		function isRegExpIdentifierPart(ch) {
		  return isIdentifierChar(ch, true) || ch === 0x24 /* $ */ || ch === 0x5F /* _ */ || ch === 0x200C /* <ZWNJ> */ || ch === 0x200D /* <ZWJ> */
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-AtomEscape
		pp$9.regexp_eatAtomEscape = function(state) {
		  if (
		    this.regexp_eatBackReference(state) ||
		    this.regexp_eatCharacterClassEscape(state) ||
		    this.regexp_eatCharacterEscape(state) ||
		    (state.switchN && this.regexp_eatKGroupName(state))
		  ) {
		    return true
		  }
		  if (state.switchU) {
		    // Make the same message as V8.
		    if (state.current() === 0x63 /* c */) {
		      state.raise("Invalid unicode escape");
		    }
		    state.raise("Invalid escape");
		  }
		  return false
		};
		pp$9.regexp_eatBackReference = function(state) {
		  var start = state.pos;
		  if (this.regexp_eatDecimalEscape(state)) {
		    var n = state.lastIntValue;
		    if (state.switchU) {
		      // For SyntaxError in https://www.ecma-international.org/ecma-262/8.0/#sec-atomescape
		      if (n > state.maxBackReference) {
		        state.maxBackReference = n;
		      }
		      return true
		    }
		    if (n <= state.numCapturingParens) {
		      return true
		    }
		    state.pos = start;
		  }
		  return false
		};
		pp$9.regexp_eatKGroupName = function(state) {
		  if (state.eat(0x6B /* k */)) {
		    if (this.regexp_eatGroupName(state)) {
		      state.backReferenceNames.push(state.lastStringValue);
		      return true
		    }
		    state.raise("Invalid named reference");
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-CharacterEscape
		pp$9.regexp_eatCharacterEscape = function(state) {
		  return (
		    this.regexp_eatControlEscape(state) ||
		    this.regexp_eatCControlLetter(state) ||
		    this.regexp_eatZero(state) ||
		    this.regexp_eatHexEscapeSequence(state) ||
		    this.regexp_eatRegExpUnicodeEscapeSequence(state) ||
		    (!state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state)) ||
		    this.regexp_eatIdentityEscape(state)
		  )
		};
		pp$9.regexp_eatCControlLetter = function(state) {
		  var start = state.pos;
		  if (state.eat(0x63 /* c */)) {
		    if (this.regexp_eatControlLetter(state)) {
		      return true
		    }
		    state.pos = start;
		  }
		  return false
		};
		pp$9.regexp_eatZero = function(state) {
		  if (state.current() === 0x30 /* 0 */ && !isDecimalDigit(state.lookahead())) {
		    state.lastIntValue = 0;
		    state.advance();
		    return true
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlEscape
		pp$9.regexp_eatControlEscape = function(state) {
		  var ch = state.current();
		  if (ch === 0x74 /* t */) {
		    state.lastIntValue = 0x09; /* \t */
		    state.advance();
		    return true
		  }
		  if (ch === 0x6E /* n */) {
		    state.lastIntValue = 0x0A; /* \n */
		    state.advance();
		    return true
		  }
		  if (ch === 0x76 /* v */) {
		    state.lastIntValue = 0x0B; /* \v */
		    state.advance();
		    return true
		  }
		  if (ch === 0x66 /* f */) {
		    state.lastIntValue = 0x0C; /* \f */
		    state.advance();
		    return true
		  }
		  if (ch === 0x72 /* r */) {
		    state.lastIntValue = 0x0D; /* \r */
		    state.advance();
		    return true
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-ControlLetter
		pp$9.regexp_eatControlLetter = function(state) {
		  var ch = state.current();
		  if (isControlLetter(ch)) {
		    state.lastIntValue = ch % 0x20;
		    state.advance();
		    return true
		  }
		  return false
		};
		function isControlLetter(ch) {
		  return (
		    (ch >= 0x41 /* A */ && ch <= 0x5A /* Z */) ||
		    (ch >= 0x61 /* a */ && ch <= 0x7A /* z */)
		  )
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-RegExpUnicodeEscapeSequence
		pp$9.regexp_eatRegExpUnicodeEscapeSequence = function(state) {
		  var start = state.pos;

		  if (state.eat(0x75 /* u */)) {
		    if (this.regexp_eatFixedHexDigits(state, 4)) {
		      var lead = state.lastIntValue;
		      if (state.switchU && lead >= 0xD800 && lead <= 0xDBFF) {
		        var leadSurrogateEnd = state.pos;
		        if (state.eat(0x5C /* \ */) && state.eat(0x75 /* u */) && this.regexp_eatFixedHexDigits(state, 4)) {
		          var trail = state.lastIntValue;
		          if (trail >= 0xDC00 && trail <= 0xDFFF) {
		            state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
		            return true
		          }
		        }
		        state.pos = leadSurrogateEnd;
		        state.lastIntValue = lead;
		      }
		      return true
		    }
		    if (
		      state.switchU &&
		      state.eat(0x7B /* { */) &&
		      this.regexp_eatHexDigits(state) &&
		      state.eat(0x7D /* } */) &&
		      isValidUnicode(state.lastIntValue)
		    ) {
		      return true
		    }
		    if (state.switchU) {
		      state.raise("Invalid unicode escape");
		    }
		    state.pos = start;
		  }

		  return false
		};
		function isValidUnicode(ch) {
		  return ch >= 0 && ch <= 0x10FFFF
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-IdentityEscape
		pp$9.regexp_eatIdentityEscape = function(state) {
		  if (state.switchU) {
		    if (this.regexp_eatSyntaxCharacter(state)) {
		      return true
		    }
		    if (state.eat(0x2F /* / */)) {
		      state.lastIntValue = 0x2F; /* / */
		      return true
		    }
		    return false
		  }

		  var ch = state.current();
		  if (ch !== 0x63 /* c */ && (!state.switchN || ch !== 0x6B /* k */)) {
		    state.lastIntValue = ch;
		    state.advance();
		    return true
		  }

		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape
		pp$9.regexp_eatDecimalEscape = function(state) {
		  state.lastIntValue = 0;
		  var ch = state.current();
		  if (ch >= 0x31 /* 1 */ && ch <= 0x39 /* 9 */) {
		    do {
		      state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
		      state.advance();
		    } while ((ch = state.current()) >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */)
		    return true
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClassEscape
		pp$9.regexp_eatCharacterClassEscape = function(state) {
		  var ch = state.current();

		  if (isCharacterClassEscape(ch)) {
		    state.lastIntValue = -1;
		    state.advance();
		    return true
		  }

		  if (
		    state.switchU &&
		    this.options.ecmaVersion >= 9 &&
		    (ch === 0x50 /* P */ || ch === 0x70 /* p */)
		  ) {
		    state.lastIntValue = -1;
		    state.advance();
		    if (
		      state.eat(0x7B /* { */) &&
		      this.regexp_eatUnicodePropertyValueExpression(state) &&
		      state.eat(0x7D /* } */)
		    ) {
		      return true
		    }
		    state.raise("Invalid property name");
		  }

		  return false
		};
		function isCharacterClassEscape(ch) {
		  return (
		    ch === 0x64 /* d */ ||
		    ch === 0x44 /* D */ ||
		    ch === 0x73 /* s */ ||
		    ch === 0x53 /* S */ ||
		    ch === 0x77 /* w */ ||
		    ch === 0x57 /* W */
		  )
		}

		// UnicodePropertyValueExpression ::
		//   UnicodePropertyName `=` UnicodePropertyValue
		//   LoneUnicodePropertyNameOrValue
		pp$9.regexp_eatUnicodePropertyValueExpression = function(state) {
		  var start = state.pos;

		  // UnicodePropertyName `=` UnicodePropertyValue
		  if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D /* = */)) {
		    var name = state.lastStringValue;
		    if (this.regexp_eatUnicodePropertyValue(state)) {
		      var value = state.lastStringValue;
		      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
		      return true
		    }
		  }
		  state.pos = start;

		  // LoneUnicodePropertyNameOrValue
		  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
		    var nameOrValue = state.lastStringValue;
		    this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
		    return true
		  }
		  return false
		};
		pp$9.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
		  if (!data.hasOwnProperty(name) || data[name].indexOf(value) === -1) {
		    state.raise("Invalid property name");
		  }
		};
		pp$9.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
		  if (data.$LONE.indexOf(nameOrValue) === -1) {
		    state.raise("Invalid property name");
		  }
		};

		// UnicodePropertyName ::
		//   UnicodePropertyNameCharacters
		pp$9.regexp_eatUnicodePropertyName = function(state) {
		  var ch = 0;
		  state.lastStringValue = "";
		  while (isUnicodePropertyNameCharacter(ch = state.current())) {
		    state.lastStringValue += codePointToString$1(ch);
		    state.advance();
		  }
		  return state.lastStringValue !== ""
		};
		function isUnicodePropertyNameCharacter(ch) {
		  return isControlLetter(ch) || ch === 0x5F /* _ */
		}

		// UnicodePropertyValue ::
		//   UnicodePropertyValueCharacters
		pp$9.regexp_eatUnicodePropertyValue = function(state) {
		  var ch = 0;
		  state.lastStringValue = "";
		  while (isUnicodePropertyValueCharacter(ch = state.current())) {
		    state.lastStringValue += codePointToString$1(ch);
		    state.advance();
		  }
		  return state.lastStringValue !== ""
		};
		function isUnicodePropertyValueCharacter(ch) {
		  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch)
		}

		// LoneUnicodePropertyNameOrValue ::
		//   UnicodePropertyValueCharacters
		pp$9.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
		  return this.regexp_eatUnicodePropertyValue(state)
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-CharacterClass
		pp$9.regexp_eatCharacterClass = function(state) {
		  if (state.eat(0x5B /* [ */)) {
		    state.eat(0x5E /* ^ */);
		    this.regexp_classRanges(state);
		    if (state.eat(0x5D /* [ */)) {
		      return true
		    }
		    // Unreachable since it threw "unterminated regular expression" error before.
		    state.raise("Unterminated character class");
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassRanges
		// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRanges
		// https://www.ecma-international.org/ecma-262/8.0/#prod-NonemptyClassRangesNoDash
		pp$9.regexp_classRanges = function(state) {
		  var this$1 = this;

		  while (this.regexp_eatClassAtom(state)) {
		    var left = state.lastIntValue;
		    if (state.eat(0x2D /* - */) && this$1.regexp_eatClassAtom(state)) {
		      var right = state.lastIntValue;
		      if (state.switchU && (left === -1 || right === -1)) {
		        state.raise("Invalid character class");
		      }
		      if (left !== -1 && right !== -1 && left > right) {
		        state.raise("Range out of order in character class");
		      }
		    }
		  }
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtom
		// https://www.ecma-international.org/ecma-262/8.0/#prod-ClassAtomNoDash
		pp$9.regexp_eatClassAtom = function(state) {
		  var start = state.pos;

		  if (state.eat(0x5C /* \ */)) {
		    if (this.regexp_eatClassEscape(state)) {
		      return true
		    }
		    if (state.switchU) {
		      // Make the same message as V8.
		      var ch$1 = state.current();
		      if (ch$1 === 0x63 /* c */ || isOctalDigit(ch$1)) {
		        state.raise("Invalid class escape");
		      }
		      state.raise("Invalid escape");
		    }
		    state.pos = start;
		  }

		  var ch = state.current();
		  if (ch !== 0x5D /* [ */) {
		    state.lastIntValue = ch;
		    state.advance();
		    return true
		  }

		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassEscape
		pp$9.regexp_eatClassEscape = function(state) {
		  var start = state.pos;

		  if (state.eat(0x62 /* b */)) {
		    state.lastIntValue = 0x08; /* <BS> */
		    return true
		  }

		  if (state.switchU && state.eat(0x2D /* - */)) {
		    state.lastIntValue = 0x2D; /* - */
		    return true
		  }

		  if (!state.switchU && state.eat(0x63 /* c */)) {
		    if (this.regexp_eatClassControlLetter(state)) {
		      return true
		    }
		    state.pos = start;
		  }

		  return (
		    this.regexp_eatCharacterClassEscape(state) ||
		    this.regexp_eatCharacterEscape(state)
		  )
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-ClassControlLetter
		pp$9.regexp_eatClassControlLetter = function(state) {
		  var ch = state.current();
		  if (isDecimalDigit(ch) || ch === 0x5F /* _ */) {
		    state.lastIntValue = ch % 0x20;
		    state.advance();
		    return true
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
		pp$9.regexp_eatHexEscapeSequence = function(state) {
		  var start = state.pos;
		  if (state.eat(0x78 /* x */)) {
		    if (this.regexp_eatFixedHexDigits(state, 2)) {
		      return true
		    }
		    if (state.switchU) {
		      state.raise("Invalid escape");
		    }
		    state.pos = start;
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalDigits
		pp$9.regexp_eatDecimalDigits = function(state) {
		  var start = state.pos;
		  var ch = 0;
		  state.lastIntValue = 0;
		  while (isDecimalDigit(ch = state.current())) {
		    state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30 /* 0 */);
		    state.advance();
		  }
		  return state.pos !== start
		};
		function isDecimalDigit(ch) {
		  return ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigits
		pp$9.regexp_eatHexDigits = function(state) {
		  var start = state.pos;
		  var ch = 0;
		  state.lastIntValue = 0;
		  while (isHexDigit(ch = state.current())) {
		    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
		    state.advance();
		  }
		  return state.pos !== start
		};
		function isHexDigit(ch) {
		  return (
		    (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) ||
		    (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) ||
		    (ch >= 0x61 /* a */ && ch <= 0x66 /* f */)
		  )
		}
		function hexToInt(ch) {
		  if (ch >= 0x41 /* A */ && ch <= 0x46 /* F */) {
		    return 10 + (ch - 0x41 /* A */)
		  }
		  if (ch >= 0x61 /* a */ && ch <= 0x66 /* f */) {
		    return 10 + (ch - 0x61 /* a */)
		  }
		  return ch - 0x30 /* 0 */
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-annexB-LegacyOctalEscapeSequence
		// Allows only 0-377(octal) i.e. 0-255(decimal).
		pp$9.regexp_eatLegacyOctalEscapeSequence = function(state) {
		  if (this.regexp_eatOctalDigit(state)) {
		    var n1 = state.lastIntValue;
		    if (this.regexp_eatOctalDigit(state)) {
		      var n2 = state.lastIntValue;
		      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
		        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
		      } else {
		        state.lastIntValue = n1 * 8 + n2;
		      }
		    } else {
		      state.lastIntValue = n1;
		    }
		    return true
		  }
		  return false
		};

		// https://www.ecma-international.org/ecma-262/8.0/#prod-OctalDigit
		pp$9.regexp_eatOctalDigit = function(state) {
		  var ch = state.current();
		  if (isOctalDigit(ch)) {
		    state.lastIntValue = ch - 0x30; /* 0 */
		    state.advance();
		    return true
		  }
		  state.lastIntValue = 0;
		  return false
		};
		function isOctalDigit(ch) {
		  return ch >= 0x30 /* 0 */ && ch <= 0x37 /* 7 */
		}

		// https://www.ecma-international.org/ecma-262/8.0/#prod-Hex4Digits
		// https://www.ecma-international.org/ecma-262/8.0/#prod-HexDigit
		// And HexDigit HexDigit in https://www.ecma-international.org/ecma-262/8.0/#prod-HexEscapeSequence
		pp$9.regexp_eatFixedHexDigits = function(state, length) {
		  var start = state.pos;
		  state.lastIntValue = 0;
		  for (var i = 0; i < length; ++i) {
		    var ch = state.current();
		    if (!isHexDigit(ch)) {
		      state.pos = start;
		      return false
		    }
		    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
		    state.advance();
		  }
		  return true
		};

		// Object type used to represent tokens. Note that normally, tokens
		// simply exist as properties on the parser object. This is only
		// used for the onToken callback and the external tokenizer.

		var Token = function Token(p) {
		  this.type = p.type;
		  this.value = p.value;
		  this.start = p.start;
		  this.end = p.end;
		  if (p.options.locations)
		    { this.loc = new SourceLocation(p, p.startLoc, p.endLoc); }
		  if (p.options.ranges)
		    { this.range = [p.start, p.end]; }
		};

		// ## Tokenizer

		var pp$8 = Parser.prototype;

		// Move to the next token

		pp$8.next = function() {
		  if (this.options.onToken)
		    { this.options.onToken(new Token(this)); }

		  this.lastTokEnd = this.end;
		  this.lastTokStart = this.start;
		  this.lastTokEndLoc = this.endLoc;
		  this.lastTokStartLoc = this.startLoc;
		  this.nextToken();
		};

		pp$8.getToken = function() {
		  this.next();
		  return new Token(this)
		};

		// If we're in an ES6 environment, make parsers iterable
		if (typeof Symbol !== "undefined")
		  { pp$8[Symbol.iterator] = function() {
		    var this$1 = this;

		    return {
		      next: function () {
		        var token = this$1.getToken();
		        return {
		          done: token.type === types.eof,
		          value: token
		        }
		      }
		    }
		  }; }

		// Toggle strict mode. Re-reads the next number or string to please
		// pedantic tests (`"use strict"; 010;` should fail).

		pp$8.curContext = function() {
		  return this.context[this.context.length - 1]
		};

		// Read a single token, updating the parser object's token-related
		// properties.

		pp$8.nextToken = function() {
		  var curContext = this.curContext();
		  if (!curContext || !curContext.preserveSpace) { this.skipSpace(); }

		  this.start = this.pos;
		  if (this.options.locations) { this.startLoc = this.curPosition(); }
		  if (this.pos >= this.input.length) { return this.finishToken(types.eof) }

		  if (curContext.override) { return curContext.override(this) }
		  else { this.readToken(this.fullCharCodeAtPos()); }
		};

		pp$8.readToken = function(code) {
		  // Identifier or keyword. '\uXXXX' sequences are allowed in
		  // identifiers, so '\' also dispatches to that.
		  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */)
		    { return this.readWord() }

		  return this.getTokenFromCode(code)
		};

		pp$8.fullCharCodeAtPos = function() {
		  var code = this.input.charCodeAt(this.pos);
		  if (code <= 0xd7ff || code >= 0xe000) { return code }
		  var next = this.input.charCodeAt(this.pos + 1);
		  return (code << 10) + next - 0x35fdc00
		};

		pp$8.skipBlockComment = function() {
		  var this$1 = this;

		  var startLoc = this.options.onComment && this.curPosition();
		  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
		  if (end === -1) { this.raise(this.pos - 2, "Unterminated comment"); }
		  this.pos = end + 2;
		  if (this.options.locations) {
		    lineBreakG.lastIndex = start;
		    var match;
		    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
		      ++this$1.curLine;
		      this$1.lineStart = match.index + match[0].length;
		    }
		  }
		  if (this.options.onComment)
		    { this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos,
		                           startLoc, this.curPosition()); }
		};

		pp$8.skipLineComment = function(startSkip) {
		  var this$1 = this;

		  var start = this.pos;
		  var startLoc = this.options.onComment && this.curPosition();
		  var ch = this.input.charCodeAt(this.pos += startSkip);
		  while (this.pos < this.input.length && !isNewLine(ch)) {
		    ch = this$1.input.charCodeAt(++this$1.pos);
		  }
		  if (this.options.onComment)
		    { this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos,
		                           startLoc, this.curPosition()); }
		};

		// Called at the start of the parse and after every token. Skips
		// whitespace and comments, and.

		pp$8.skipSpace = function() {
		  var this$1 = this;

		  loop: while (this.pos < this.input.length) {
		    var ch = this$1.input.charCodeAt(this$1.pos);
		    switch (ch) {
		    case 32: case 160: // ' '
		      ++this$1.pos;
		      break
		    case 13:
		      if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
		        ++this$1.pos;
		      }
		    case 10: case 8232: case 8233:
		      ++this$1.pos;
		      if (this$1.options.locations) {
		        ++this$1.curLine;
		        this$1.lineStart = this$1.pos;
		      }
		      break
		    case 47: // '/'
		      switch (this$1.input.charCodeAt(this$1.pos + 1)) {
		      case 42: // '*'
		        this$1.skipBlockComment();
		        break
		      case 47:
		        this$1.skipLineComment(2);
		        break
		      default:
		        break loop
		      }
		      break
		    default:
		      if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
		        ++this$1.pos;
		      } else {
		        break loop
		      }
		    }
		  }
		};

		// Called at the end of every token. Sets `end`, `val`, and
		// maintains `context` and `exprAllowed`, and skips the space after
		// the token, so that the next one's `start` will point at the
		// right position.

		pp$8.finishToken = function(type, val) {
		  this.end = this.pos;
		  if (this.options.locations) { this.endLoc = this.curPosition(); }
		  var prevType = this.type;
		  this.type = type;
		  this.value = val;

		  this.updateContext(prevType);
		};

		// ### Token reading

		// This is the function that is called to fetch the next token. It
		// is somewhat obscure, because it works in character codes rather
		// than characters, and because operator parsing has been inlined
		// into it.
		//
		// All in the name of speed.
		//
		pp$8.readToken_dot = function() {
		  var next = this.input.charCodeAt(this.pos + 1);
		  if (next >= 48 && next <= 57) { return this.readNumber(true) }
		  var next2 = this.input.charCodeAt(this.pos + 2);
		  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
		    this.pos += 3;
		    return this.finishToken(types.ellipsis)
		  } else {
		    ++this.pos;
		    return this.finishToken(types.dot)
		  }
		};

		pp$8.readToken_slash = function() { // '/'
		  var next = this.input.charCodeAt(this.pos + 1);
		  if (this.exprAllowed) { ++this.pos; return this.readRegexp() }
		  if (next === 61) { return this.finishOp(types.assign, 2) }
		  return this.finishOp(types.slash, 1)
		};

		pp$8.readToken_mult_modulo_exp = function(code) { // '%*'
		  var next = this.input.charCodeAt(this.pos + 1);
		  var size = 1;
		  var tokentype = code === 42 ? types.star : types.modulo;

		  // exponentiation operator ** and **=
		  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
		    ++size;
		    tokentype = types.starstar;
		    next = this.input.charCodeAt(this.pos + 2);
		  }

		  if (next === 61) { return this.finishOp(types.assign, size + 1) }
		  return this.finishOp(tokentype, size)
		};

		pp$8.readToken_pipe_amp = function(code) { // '|&'
		  var next = this.input.charCodeAt(this.pos + 1);
		  if (next === code) { return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2) }
		  if (next === 61) { return this.finishOp(types.assign, 2) }
		  return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1)
		};

		pp$8.readToken_caret = function() { // '^'
		  var next = this.input.charCodeAt(this.pos + 1);
		  if (next === 61) { return this.finishOp(types.assign, 2) }
		  return this.finishOp(types.bitwiseXOR, 1)
		};

		pp$8.readToken_plus_min = function(code) { // '+-'
		  var next = this.input.charCodeAt(this.pos + 1);
		  if (next === code) {
		    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 &&
		        (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
		      // A `-->` line comment
		      this.skipLineComment(3);
		      this.skipSpace();
		      return this.nextToken()
		    }
		    return this.finishOp(types.incDec, 2)
		  }
		  if (next === 61) { return this.finishOp(types.assign, 2) }
		  return this.finishOp(types.plusMin, 1)
		};

		pp$8.readToken_lt_gt = function(code) { // '<>'
		  var next = this.input.charCodeAt(this.pos + 1);
		  var size = 1;
		  if (next === code) {
		    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
		    if (this.input.charCodeAt(this.pos + size) === 61) { return this.finishOp(types.assign, size + 1) }
		    return this.finishOp(types.bitShift, size)
		  }
		  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 &&
		      this.input.charCodeAt(this.pos + 3) === 45) {
		    // `<!--`, an XML-style comment that should be interpreted as a line comment
		    this.skipLineComment(4);
		    this.skipSpace();
		    return this.nextToken()
		  }
		  if (next === 61) { size = 2; }
		  return this.finishOp(types.relational, size)
		};

		pp$8.readToken_eq_excl = function(code) { // '=!'
		  var next = this.input.charCodeAt(this.pos + 1);
		  if (next === 61) { return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) }
		  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) { // '=>'
		    this.pos += 2;
		    return this.finishToken(types.arrow)
		  }
		  return this.finishOp(code === 61 ? types.eq : types.prefix, 1)
		};

		pp$8.getTokenFromCode = function(code) {
		  switch (code) {
		  // The interpretation of a dot depends on whether it is followed
		  // by a digit or another two dots.
		  case 46: // '.'
		    return this.readToken_dot()

		  // Punctuation tokens.
		  case 40: ++this.pos; return this.finishToken(types.parenL)
		  case 41: ++this.pos; return this.finishToken(types.parenR)
		  case 59: ++this.pos; return this.finishToken(types.semi)
		  case 44: ++this.pos; return this.finishToken(types.comma)
		  case 91: ++this.pos; return this.finishToken(types.bracketL)
		  case 93: ++this.pos; return this.finishToken(types.bracketR)
		  case 123: ++this.pos; return this.finishToken(types.braceL)
		  case 125: ++this.pos; return this.finishToken(types.braceR)
		  case 58: ++this.pos; return this.finishToken(types.colon)
		  case 63: ++this.pos; return this.finishToken(types.question)

		  case 96: // '`'
		    if (this.options.ecmaVersion < 6) { break }
		    ++this.pos;
		    return this.finishToken(types.backQuote)

		  case 48: // '0'
		    var next = this.input.charCodeAt(this.pos + 1);
		    if (next === 120 || next === 88) { return this.readRadixNumber(16) } // '0x', '0X' - hex number
		    if (this.options.ecmaVersion >= 6) {
		      if (next === 111 || next === 79) { return this.readRadixNumber(8) } // '0o', '0O' - octal number
		      if (next === 98 || next === 66) { return this.readRadixNumber(2) } // '0b', '0B' - binary number
		    }

		  // Anything else beginning with a digit is an integer, octal
		  // number, or float.
		  case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
		    return this.readNumber(false)

		  // Quotes produce strings.
		  case 34: case 39: // '"', "'"
		    return this.readString(code)

		  // Operators are parsed inline in tiny state machines. '=' (61) is
		  // often referred to. `finishOp` simply skips the amount of
		  // characters it is given as second argument, and returns a token
		  // of the type given by its first argument.

		  case 47: // '/'
		    return this.readToken_slash()

		  case 37: case 42: // '%*'
		    return this.readToken_mult_modulo_exp(code)

		  case 124: case 38: // '|&'
		    return this.readToken_pipe_amp(code)

		  case 94: // '^'
		    return this.readToken_caret()

		  case 43: case 45: // '+-'
		    return this.readToken_plus_min(code)

		  case 60: case 62: // '<>'
		    return this.readToken_lt_gt(code)

		  case 61: case 33: // '=!'
		    return this.readToken_eq_excl(code)

		  case 126: // '~'
		    return this.finishOp(types.prefix, 1)
		  }

		  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
		};

		pp$8.finishOp = function(type, size) {
		  var str = this.input.slice(this.pos, this.pos + size);
		  this.pos += size;
		  return this.finishToken(type, str)
		};

		pp$8.readRegexp = function() {
		  var this$1 = this;

		  var escaped, inClass, start = this.pos;
		  for (;;) {
		    if (this$1.pos >= this$1.input.length) { this$1.raise(start, "Unterminated regular expression"); }
		    var ch = this$1.input.charAt(this$1.pos);
		    if (lineBreak.test(ch)) { this$1.raise(start, "Unterminated regular expression"); }
		    if (!escaped) {
		      if (ch === "[") { inClass = true; }
		      else if (ch === "]" && inClass) { inClass = false; }
		      else if (ch === "/" && !inClass) { break }
		      escaped = ch === "\\";
		    } else { escaped = false; }
		    ++this$1.pos;
		  }
		  var pattern = this.input.slice(start, this.pos);
		  ++this.pos;
		  var flagsStart = this.pos;
		  var flags = this.readWord1();
		  if (this.containsEsc) { this.unexpected(flagsStart); }

		  // Validate pattern
		  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
		  state.reset(start, pattern, flags);
		  this.validateRegExpFlags(state);
		  this.validateRegExpPattern(state);

		  // Create Literal#value property value.
		  var value = null;
		  try {
		    value = new RegExp(pattern, flags);
		  } catch (e) {
		    // ESTree requires null if it failed to instantiate RegExp object.
		    // https://github.com/estree/estree/blob/a27003adf4fd7bfad44de9cef372a2eacd527b1c/es5.md#regexpliteral
		  }

		  return this.finishToken(types.regexp, {pattern: pattern, flags: flags, value: value})
		};

		// Read an integer in the given radix. Return null if zero digits
		// were read, the integer value otherwise. When `len` is given, this
		// will return `null` unless the integer has exactly `len` digits.

		pp$8.readInt = function(radix, len) {
		  var this$1 = this;

		  var start = this.pos, total = 0;
		  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
		    var code = this$1.input.charCodeAt(this$1.pos), val = (void 0);
		    if (code >= 97) { val = code - 97 + 10; } // a
		    else if (code >= 65) { val = code - 65 + 10; } // A
		    else if (code >= 48 && code <= 57) { val = code - 48; } // 0-9
		    else { val = Infinity; }
		    if (val >= radix) { break }
		    ++this$1.pos;
		    total = total * radix + val;
		  }
		  if (this.pos === start || len != null && this.pos - start !== len) { return null }

		  return total
		};

		pp$8.readRadixNumber = function(radix) {
		  this.pos += 2; // 0x
		  var val = this.readInt(radix);
		  if (val == null) { this.raise(this.start + 2, "Expected number in radix " + radix); }
		  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }
		  return this.finishToken(types.num, val)
		};

		// Read an integer, octal integer, or floating-point number.

		pp$8.readNumber = function(startsWithDot) {
		  var start = this.pos;
		  if (!startsWithDot && this.readInt(10) === null) { this.raise(start, "Invalid number"); }
		  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
		  if (octal && this.strict) { this.raise(start, "Invalid number"); }
		  if (octal && /[89]/.test(this.input.slice(start, this.pos))) { octal = false; }
		  var next = this.input.charCodeAt(this.pos);
		  if (next === 46 && !octal) { // '.'
		    ++this.pos;
		    this.readInt(10);
		    next = this.input.charCodeAt(this.pos);
		  }
		  if ((next === 69 || next === 101) && !octal) { // 'eE'
		    next = this.input.charCodeAt(++this.pos);
		    if (next === 43 || next === 45) { ++this.pos; } // '+-'
		    if (this.readInt(10) === null) { this.raise(start, "Invalid number"); }
		  }
		  if (isIdentifierStart(this.fullCharCodeAtPos())) { this.raise(this.pos, "Identifier directly after number"); }

		  var str = this.input.slice(start, this.pos);
		  var val = octal ? parseInt(str, 8) : parseFloat(str);
		  return this.finishToken(types.num, val)
		};

		// Read a string value, interpreting backslash-escapes.

		pp$8.readCodePoint = function() {
		  var ch = this.input.charCodeAt(this.pos), code;

		  if (ch === 123) { // '{'
		    if (this.options.ecmaVersion < 6) { this.unexpected(); }
		    var codePos = ++this.pos;
		    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
		    ++this.pos;
		    if (code > 0x10FFFF) { this.invalidStringToken(codePos, "Code point out of bounds"); }
		  } else {
		    code = this.readHexChar(4);
		  }
		  return code
		};

		function codePointToString(code) {
		  // UTF-16 Decoding
		  if (code <= 0xFFFF) { return String.fromCharCode(code) }
		  code -= 0x10000;
		  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
		}

		pp$8.readString = function(quote) {
		  var this$1 = this;

		  var out = "", chunkStart = ++this.pos;
		  for (;;) {
		    if (this$1.pos >= this$1.input.length) { this$1.raise(this$1.start, "Unterminated string constant"); }
		    var ch = this$1.input.charCodeAt(this$1.pos);
		    if (ch === quote) { break }
		    if (ch === 92) { // '\'
		      out += this$1.input.slice(chunkStart, this$1.pos);
		      out += this$1.readEscapedChar(false);
		      chunkStart = this$1.pos;
		    } else {
		      if (isNewLine(ch, this$1.options.ecmaVersion >= 10)) { this$1.raise(this$1.start, "Unterminated string constant"); }
		      ++this$1.pos;
		    }
		  }
		  out += this.input.slice(chunkStart, this.pos++);
		  return this.finishToken(types.string, out)
		};

		// Reads template string tokens.

		var INVALID_TEMPLATE_ESCAPE_ERROR = {};

		pp$8.tryReadTemplateToken = function() {
		  this.inTemplateElement = true;
		  try {
		    this.readTmplToken();
		  } catch (err) {
		    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
		      this.readInvalidTemplateToken();
		    } else {
		      throw err
		    }
		  }

		  this.inTemplateElement = false;
		};

		pp$8.invalidStringToken = function(position, message) {
		  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
		    throw INVALID_TEMPLATE_ESCAPE_ERROR
		  } else {
		    this.raise(position, message);
		  }
		};

		pp$8.readTmplToken = function() {
		  var this$1 = this;

		  var out = "", chunkStart = this.pos;
		  for (;;) {
		    if (this$1.pos >= this$1.input.length) { this$1.raise(this$1.start, "Unterminated template"); }
		    var ch = this$1.input.charCodeAt(this$1.pos);
		    if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) { // '`', '${'
		      if (this$1.pos === this$1.start && (this$1.type === types.template || this$1.type === types.invalidTemplate)) {
		        if (ch === 36) {
		          this$1.pos += 2;
		          return this$1.finishToken(types.dollarBraceL)
		        } else {
		          ++this$1.pos;
		          return this$1.finishToken(types.backQuote)
		        }
		      }
		      out += this$1.input.slice(chunkStart, this$1.pos);
		      return this$1.finishToken(types.template, out)
		    }
		    if (ch === 92) { // '\'
		      out += this$1.input.slice(chunkStart, this$1.pos);
		      out += this$1.readEscapedChar(true);
		      chunkStart = this$1.pos;
		    } else if (isNewLine(ch)) {
		      out += this$1.input.slice(chunkStart, this$1.pos);
		      ++this$1.pos;
		      switch (ch) {
		      case 13:
		        if (this$1.input.charCodeAt(this$1.pos) === 10) { ++this$1.pos; }
		      case 10:
		        out += "\n";
		        break
		      default:
		        out += String.fromCharCode(ch);
		        break
		      }
		      if (this$1.options.locations) {
		        ++this$1.curLine;
		        this$1.lineStart = this$1.pos;
		      }
		      chunkStart = this$1.pos;
		    } else {
		      ++this$1.pos;
		    }
		  }
		};

		// Reads a template token to search for the end, without validating any escape sequences
		pp$8.readInvalidTemplateToken = function() {
		  var this$1 = this;

		  for (; this.pos < this.input.length; this.pos++) {
		    switch (this$1.input[this$1.pos]) {
		    case "\\":
		      ++this$1.pos;
		      break

		    case "$":
		      if (this$1.input[this$1.pos + 1] !== "{") {
		        break
		      }
		    // falls through

		    case "`":
		      return this$1.finishToken(types.invalidTemplate, this$1.input.slice(this$1.start, this$1.pos))

		    // no default
		    }
		  }
		  this.raise(this.start, "Unterminated template");
		};

		// Used to read escaped characters

		pp$8.readEscapedChar = function(inTemplate) {
		  var ch = this.input.charCodeAt(++this.pos);
		  ++this.pos;
		  switch (ch) {
		  case 110: return "\n" // 'n' -> '\n'
		  case 114: return "\r" // 'r' -> '\r'
		  case 120: return String.fromCharCode(this.readHexChar(2)) // 'x'
		  case 117: return codePointToString(this.readCodePoint()) // 'u'
		  case 116: return "\t" // 't' -> '\t'
		  case 98: return "\b" // 'b' -> '\b'
		  case 118: return "\u000b" // 'v' -> '\u000b'
		  case 102: return "\f" // 'f' -> '\f'
		  case 13: if (this.input.charCodeAt(this.pos) === 10) { ++this.pos; } // '\r\n'
		  case 10: // ' \n'
		    if (this.options.locations) { this.lineStart = this.pos; ++this.curLine; }
		    return ""
		  default:
		    if (ch >= 48 && ch <= 55) {
		      var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
		      var octal = parseInt(octalStr, 8);
		      if (octal > 255) {
		        octalStr = octalStr.slice(0, -1);
		        octal = parseInt(octalStr, 8);
		      }
		      this.pos += octalStr.length - 1;
		      ch = this.input.charCodeAt(this.pos);
		      if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
		        this.invalidStringToken(
		          this.pos - 1 - octalStr.length,
		          inTemplate
		            ? "Octal literal in template string"
		            : "Octal literal in strict mode"
		        );
		      }
		      return String.fromCharCode(octal)
		    }
		    return String.fromCharCode(ch)
		  }
		};

		// Used to read character escape sequences ('\x', '\u', '\U').

		pp$8.readHexChar = function(len) {
		  var codePos = this.pos;
		  var n = this.readInt(16, len);
		  if (n === null) { this.invalidStringToken(codePos, "Bad character escape sequence"); }
		  return n
		};

		// Read an identifier, and return it as a string. Sets `this.containsEsc`
		// to whether the word contained a '\u' escape.
		//
		// Incrementally adds only escaped chars, adding other chunks as-is
		// as a micro-optimization.

		pp$8.readWord1 = function() {
		  var this$1 = this;

		  this.containsEsc = false;
		  var word = "", first = true, chunkStart = this.pos;
		  var astral = this.options.ecmaVersion >= 6;
		  while (this.pos < this.input.length) {
		    var ch = this$1.fullCharCodeAtPos();
		    if (isIdentifierChar(ch, astral)) {
		      this$1.pos += ch <= 0xffff ? 1 : 2;
		    } else if (ch === 92) { // "\"
		      this$1.containsEsc = true;
		      word += this$1.input.slice(chunkStart, this$1.pos);
		      var escStart = this$1.pos;
		      if (this$1.input.charCodeAt(++this$1.pos) !== 117) // "u"
		        { this$1.invalidStringToken(this$1.pos, "Expecting Unicode escape sequence \\uXXXX"); }
		      ++this$1.pos;
		      var esc = this$1.readCodePoint();
		      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
		        { this$1.invalidStringToken(escStart, "Invalid Unicode escape"); }
		      word += codePointToString(esc);
		      chunkStart = this$1.pos;
		    } else {
		      break
		    }
		    first = false;
		  }
		  return word + this.input.slice(chunkStart, this.pos)
		};

		// Read an identifier or keyword token. Will check for reserved
		// words when necessary.

		pp$8.readWord = function() {
		  var word = this.readWord1();
		  var type = types.name;
		  if (this.keywords.test(word)) {
		    if (this.containsEsc) { this.raiseRecoverable(this.start, "Escape sequence in keyword " + word); }
		    type = keywords$1[word];
		  }
		  return this.finishToken(type, word)
		};

		// Acorn is a tiny, fast JavaScript parser written in JavaScript.
		//
		// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
		// various contributors and released under an MIT license.
		//
		// Git repositories for Acorn are available at
		//
		//     http://marijnhaverbeke.nl/git/acorn
		//     https://github.com/acornjs/acorn.git
		//
		// Please use the [github bug tracker][ghbt] to report issues.
		//
		// [ghbt]: https://github.com/acornjs/acorn/issues
		//
		// This file defines the main parser interface. The library also comes
		// with a [error-tolerant parser][dammit] and an
		// [abstract syntax tree walker][walk], defined in other files.
		//
		// [dammit]: acorn_loose.js
		// [walk]: util/walk.js

		var version = "5.7.3";

		// The main exported interface (under `self.acorn` when in the
		// browser) is a `parse` function that takes a code string and
		// returns an abstract syntax tree as specified by [Mozilla parser
		// API][api].
		//
		// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

		function parse(input, options) {
		  return new Parser(options, input).parse()
		}

		// This function tries to parse a single expression at a given
		// offset in a string. Useful for parsing mixed-language formats
		// that embed JavaScript expressions.

		function parseExpressionAt(input, pos, options) {
		  var p = new Parser(options, input, pos);
		  p.nextToken();
		  return p.parseExpression()
		}

		// Acorn is organized as a tokenizer and a recursive-descent parser.
		// The `tokenizer` export provides an interface to the tokenizer.

		function tokenizer(input, options) {
		  return new Parser(options, input)
		}

		// This is a terrible kludge to support the existing, pre-ES6
		// interface where the loose parser module retroactively adds exports
		// to this module.
		var parse_dammit;
		var LooseParser;
		var pluginsLoose; // eslint-disable-line camelcase
		function addLooseExports(parse, Parser$$1, plugins$$1) {
		  parse_dammit = parse; // eslint-disable-line camelcase
		  LooseParser = Parser$$1;
		  pluginsLoose = plugins$$1;
		}

		var acorn = /*#__PURE__*/Object.freeze({
			version: version,
			parse: parse,
			parseExpressionAt: parseExpressionAt,
			tokenizer: tokenizer,
			get parse_dammit () { return parse_dammit; },
			get LooseParser () { return LooseParser; },
			get pluginsLoose () { return pluginsLoose; },
			addLooseExports: addLooseExports,
			Parser: Parser,
			plugins: plugins,
			defaultOptions: defaultOptions,
			Position: Position,
			SourceLocation: SourceLocation,
			getLineInfo: getLineInfo,
			Node: Node,
			TokenType: TokenType,
			tokTypes: types,
			keywordTypes: keywords$1,
			TokContext: TokContext,
			tokContexts: types$1,
			isIdentifierChar: isIdentifierChar,
			isIdentifierStart: isIdentifierStart,
			Token: Token,
			isNewLine: isNewLine,
			lineBreak: lineBreak,
			lineBreakG: lineBreakG,
			nonASCIIwhitespace: nonASCIIwhitespace
		});

		const literals = new Map([['true', true], ['false', false], ['null', null]]);
		function readExpression(parser) {
		    const start = parser.index;
		    const name = parser.readUntil(/\s*}/);
		    if (name && /^[a-z]+$/.test(name)) {
		        const end = start + name.length;
		        if (literals.has(name)) {
		            return {
		                type: 'Literal',
		                start,
		                end,
		                value: literals.get(name),
		                raw: name,
		            };
		        }
		        return {
		            type: 'Identifier',
		            start,
		            end: start + name.length,
		            name,
		        };
		    }
		    parser.index = start;
		    try {
		        const node = parseExpressionAt(parser.template, parser.index, {
		            ecmaVersion: 9,
		            preserveParens: true,
		            plugins: {
		                dynamicImport: true
		            }
		        });
		        parser.index = node.end;
		        return node;
		    }
		    catch (err) {
		        parser.acornError(err);
		    }
		}

		/* eslint-disable no-underscore-dangle */

		const DynamicImportKey = 'Import';

		function injectDynamicImport(acorn) {
		  const tt = acorn.tokTypes;

		  // NOTE: This allows `yield import()` to parse correctly.
		  tt._import.startsExpr = true;

		  function parseDynamicImport() {
		    const node = this.startNode();
		    this.next();
		    if (this.type !== tt.parenL) {
		      this.unexpected();
		    }
		    return this.finishNode(node, DynamicImportKey);
		  }

		  function peekNext() {
		    return this.input[this.pos];
		  }

		  // eslint-disable-next-line no-param-reassign
		  acorn.plugins.dynamicImport = function dynamicImportPlugin(instance) {
		    instance.extend('parseStatement', nextMethod => (
		      function parseStatement(...args) {
		        const node = this.startNode();
		        if (this.type === tt._import) {
		          const nextToken = peekNext.call(this);
		          if (nextToken === tt.parenL.label) {
		            const expr = this.parseExpression();
		            return this.parseExpressionStatement(node, expr);
		          }
		        }

		        return nextMethod.apply(this, args);
		      }
		    ));

		    instance.extend('parseExprAtom', nextMethod => (
		      function parseExprAtom(refDestructuringErrors) {
		        if (this.type === tt._import) {
		          return parseDynamicImport.call(this);
		        }
		        return nextMethod.call(this, refDestructuringErrors);
		      }
		    ));
		  };

		  return acorn;
		}

		function repeat(str, i) {
		    let result = '';
		    while (i--)
		        result += str;
		    return result;
		}

		const scriptClosingTag = '</script>';
		injectDynamicImport(acorn);
		function readScript(parser, start, attributes) {
		    const scriptStart = parser.index;
		    const scriptEnd = parser.template.indexOf(scriptClosingTag, scriptStart);
		    if (scriptEnd === -1)
		        parser.error({
		            code: `unclosed-script`,
		            message: `<script> must have a closing tag`
		        });
		    const source = repeat(' ', scriptStart) + parser.template.slice(scriptStart, scriptEnd);
		    parser.index = scriptEnd + scriptClosingTag.length;
		    let ast;
		    try {
		        ast = parse(source, {
		            ecmaVersion: 9,
		            sourceType: 'module',
		            plugins: {
		                dynamicImport: true
		            }
		        });
		    }
		    catch (err) {
		        parser.acornError(err);
		    }
		    if (!ast.body.length)
		        return null;
		    ast.start = scriptStart;
		    return {
		        start,
		        end: parser.index,
		        attributes,
		        content: ast,
		    };
		}

		var MAX_LINE_LENGTH = 100;
		var OFFSET_CORRECTION = 60;
		var TAB_REPLACEMENT = '    ';

		function sourceFragment(error, extraLines) {
		    function processLines(start, end) {
		        return lines.slice(start, end).map(function(line, idx) {
		            var num = String(start + idx + 1);

		            while (num.length < maxNumLength) {
		                num = ' ' + num;
		            }

		            return num + ' |' + line;
		        }).join('\n');
		    }

		    var lines = error.source.split(/\n|\r\n?|\f/);
		    var line = error.line;
		    var column = error.column;
		    var startLine = Math.max(1, line - extraLines) - 1;
		    var endLine = Math.min(line + extraLines, lines.length + 1);
		    var maxNumLength = Math.max(4, String(endLine).length) + 1;
		    var cutLeft = 0;

		    // correct column according to replaced tab before column
		    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;

		    if (column > MAX_LINE_LENGTH) {
		        cutLeft = column - OFFSET_CORRECTION + 3;
		        column = OFFSET_CORRECTION - 2;
		    }

		    for (var i = startLine; i <= endLine; i++) {
		        if (i >= 0 && i < lines.length) {
		            lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
		            lines[i] =
		                (cutLeft > 0 && lines[i].length > cutLeft ? '\u2026' : '') +
		                lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
		                (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '\u2026' : '');
		        }
		    }

		    return [
		        processLines(startLine, line),
		        new Array(column + maxNumLength + 2).join('-') + '^',
		        processLines(line, endLine)
		    ].join('\n');
		}

		var CssSyntaxError = function(message, source, offset, line, column) {
		    // some VMs prevent setting line/column otherwise (iOS Safari 10 even throw an exception)
		    var error = Object.create(SyntaxError.prototype);

		    error.name = 'CssSyntaxError';
		    error.message = message;
		    error.stack = (new Error().stack || '').replace(/^.+\n/, error.name + ': ' + error.message + '\n');
		    error.source = source;
		    error.offset = offset;
		    error.line = line;
		    error.column = column;

		    error.sourceFragment = function(extraLines) {
		        return sourceFragment(error, isNaN(extraLines) ? 0 : extraLines);
		    };
		    Object.defineProperty(error, 'formattedMessage', {
		        get: function() {
		            return (
		                'Parse error: ' + error.message + '\n' +
		                sourceFragment(error, 2)
		            );
		        }
		    });

		    // for backward capability
		    error.parseError = {
		        offset: offset,
		        line: line,
		        column: column
		    };

		    return error;
		};

		var error = CssSyntaxError;

		// token types (note: value shouldn't intersect with used char codes)
		var WHITESPACE = 1;
		var IDENTIFIER = 2;
		var NUMBER = 3;
		var STRING = 4;
		var COMMENT = 5;
		var PUNCTUATOR = 6;
		var CDO = 7;
		var CDC = 8;
		var ATRULE = 14;
		var FUNCTION = 15;
		var URL = 16;
		var RAW = 17;

		var TAB = 9;
		var N = 10;
		var F = 12;
		var R = 13;
		var SPACE = 32;

		var TYPE = {
		    WhiteSpace:   WHITESPACE,
		    Identifier:   IDENTIFIER,
		    Number:           NUMBER,
		    String:           STRING,
		    Comment:         COMMENT,
		    Punctuator:   PUNCTUATOR,
		    CDO:                 CDO,
		    CDC:                 CDC,
		    Atrule:           ATRULE,
		    Function:       FUNCTION,
		    Url:                 URL,
		    Raw:                 RAW,

		    ExclamationMark:      33,  // !
		    QuotationMark:        34,  // "
		    NumberSign:           35,  // #
		    DollarSign:           36,  // $
		    PercentSign:          37,  // %
		    Ampersand:            38,  // &
		    Apostrophe:           39,  // '
		    LeftParenthesis:      40,  // (
		    RightParenthesis:     41,  // )
		    Asterisk:             42,  // *
		    PlusSign:             43,  // +
		    Comma:                44,  // ,
		    HyphenMinus:          45,  // -
		    FullStop:             46,  // .
		    Solidus:              47,  // /
		    Colon:                58,  // :
		    Semicolon:            59,  // ;
		    LessThanSign:         60,  // <
		    EqualsSign:           61,  // =
		    GreaterThanSign:      62,  // >
		    QuestionMark:         63,  // ?
		    CommercialAt:         64,  // @
		    LeftSquareBracket:    91,  // [
		    Backslash:            92,  // \
		    RightSquareBracket:   93,  // ]
		    CircumflexAccent:     94,  // ^
		    LowLine:              95,  // _
		    GraveAccent:          96,  // `
		    LeftCurlyBracket:    123,  // {
		    VerticalLine:        124,  // |
		    RightCurlyBracket:   125,  // }
		    Tilde:               126   // ~
		};

		var NAME = Object.keys(TYPE).reduce(function(result, key) {
		    result[TYPE[key]] = key;
		    return result;
		}, {});

		// https://drafts.csswg.org/css-syntax/#tokenizer-definitions
		// > non-ASCII code point
		// >   A code point with a value equal to or greater than U+0080 <control>
		// > name-start code point
		// >   A letter, a non-ASCII code point, or U+005F LOW LINE (_).
		// > name code point
		// >   A name-start code point, a digit, or U+002D HYPHEN-MINUS (-)
		// That means only ASCII code points has a special meaning and we a maps for 0..127 codes only
		var SafeUint32Array = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported
		var SYMBOL_TYPE = new SafeUint32Array(0x80);
		var PUNCTUATION = new SafeUint32Array(0x80);
		var STOP_URL_RAW = new SafeUint32Array(0x80);

		for (var i = 0; i < SYMBOL_TYPE.length; i++) {
		    SYMBOL_TYPE[i] = IDENTIFIER;
		}

		// fill categories
		[
		    TYPE.ExclamationMark,    // !
		    TYPE.QuotationMark,      // "
		    TYPE.NumberSign,         // #
		    TYPE.DollarSign,         // $
		    TYPE.PercentSign,        // %
		    TYPE.Ampersand,          // &
		    TYPE.Apostrophe,         // '
		    TYPE.LeftParenthesis,    // (
		    TYPE.RightParenthesis,   // )
		    TYPE.Asterisk,           // *
		    TYPE.PlusSign,           // +
		    TYPE.Comma,              // ,
		    TYPE.HyphenMinus,        // -
		    TYPE.FullStop,           // .
		    TYPE.Solidus,            // /
		    TYPE.Colon,              // :
		    TYPE.Semicolon,          // ;
		    TYPE.LessThanSign,       // <
		    TYPE.EqualsSign,         // =
		    TYPE.GreaterThanSign,    // >
		    TYPE.QuestionMark,       // ?
		    TYPE.CommercialAt,       // @
		    TYPE.LeftSquareBracket,  // [
		    // TYPE.Backslash,          // \
		    TYPE.RightSquareBracket, // ]
		    TYPE.CircumflexAccent,   // ^
		    // TYPE.LowLine,            // _
		    TYPE.GraveAccent,        // `
		    TYPE.LeftCurlyBracket,   // {
		    TYPE.VerticalLine,       // |
		    TYPE.RightCurlyBracket,  // }
		    TYPE.Tilde               // ~
		].forEach(function(key) {
		    SYMBOL_TYPE[Number(key)] = PUNCTUATOR;
		    PUNCTUATION[Number(key)] = PUNCTUATOR;
		});

		for (var i = 48; i <= 57; i++) {
		    SYMBOL_TYPE[i] = NUMBER;
		}

		SYMBOL_TYPE[SPACE] = WHITESPACE;
		SYMBOL_TYPE[TAB] = WHITESPACE;
		SYMBOL_TYPE[N] = WHITESPACE;
		SYMBOL_TYPE[R] = WHITESPACE;
		SYMBOL_TYPE[F] = WHITESPACE;

		SYMBOL_TYPE[TYPE.Apostrophe] = STRING;
		SYMBOL_TYPE[TYPE.QuotationMark] = STRING;

		STOP_URL_RAW[SPACE] = 1;
		STOP_URL_RAW[TAB] = 1;
		STOP_URL_RAW[N] = 1;
		STOP_URL_RAW[R] = 1;
		STOP_URL_RAW[F] = 1;
		STOP_URL_RAW[TYPE.Apostrophe] = 1;
		STOP_URL_RAW[TYPE.QuotationMark] = 1;
		STOP_URL_RAW[TYPE.LeftParenthesis] = 1;
		STOP_URL_RAW[TYPE.RightParenthesis] = 1;

		// whitespace is punctuation ...
		PUNCTUATION[SPACE] = PUNCTUATOR;
		PUNCTUATION[TAB] = PUNCTUATOR;
		PUNCTUATION[N] = PUNCTUATOR;
		PUNCTUATION[R] = PUNCTUATOR;
		PUNCTUATION[F] = PUNCTUATOR;
		// ... hyper minus is not
		PUNCTUATION[TYPE.HyphenMinus] = 0;

		var _const = {
		    TYPE: TYPE,
		    NAME: NAME,

		    SYMBOL_TYPE: SYMBOL_TYPE,
		    PUNCTUATION: PUNCTUATION,
		    STOP_URL_RAW: STOP_URL_RAW
		};

		var PUNCTUATION$1 = _const.PUNCTUATION;
		var STOP_URL_RAW$1 = _const.STOP_URL_RAW;
		var TYPE$1 = _const.TYPE;
		var FULLSTOP = TYPE$1.FullStop;
		var PLUSSIGN = TYPE$1.PlusSign;
		var HYPHENMINUS = TYPE$1.HyphenMinus;
		var PUNCTUATOR$1 = TYPE$1.Punctuator;
		var TAB$1 = 9;
		var N$1 = 10;
		var F$1 = 12;
		var R$1 = 13;
		var SPACE$1 = 32;
		var BACK_SLASH = 92;
		var E = 101; // 'e'.charCodeAt(0)

		function firstCharOffset(source) {
		    // detect BOM (https://en.wikipedia.org/wiki/Byte_order_mark)
		    if (source.charCodeAt(0) === 0xFEFF ||  // UTF-16BE
		        source.charCodeAt(0) === 0xFFFE) {  // UTF-16LE
		        return 1;
		    }

		    return 0;
		}

		function isHex(code) {
		    return (code >= 48 && code <= 57) || // 0 .. 9
		           (code >= 65 && code <= 70) || // A .. F
		           (code >= 97 && code <= 102);  // a .. f
		}

		function isNumber(code) {
		    return code >= 48 && code <= 57;
		}

		function isNewline(source, offset, code) {
		    if (code === N$1 || code === F$1 || code === R$1) {
		        if (code === R$1 && offset + 1 < source.length && source.charCodeAt(offset + 1) === N$1) {
		            return 2;
		        }

		        return 1;
		    }

		    return 0;
		}

		function cmpChar(testStr, offset, referenceCode) {
		    var code = testStr.charCodeAt(offset);

		    // code.toLowerCase()
		    if (code >= 65 && code <= 90) {
		        code = code | 32;
		    }

		    return code === referenceCode;
		}

		function cmpStr(testStr, start, end, referenceStr) {
		    if (end - start !== referenceStr.length) {
		        return false;
		    }

		    if (start < 0 || end > testStr.length) {
		        return false;
		    }

		    for (var i = start; i < end; i++) {
		        var testCode = testStr.charCodeAt(i);
		        var refCode = referenceStr.charCodeAt(i - start);

		        // testStr[i].toLowerCase()
		        if (testCode >= 65 && testCode <= 90) {
		            testCode = testCode | 32;
		        }

		        if (testCode !== refCode) {
		            return false;
		        }
		    }

		    return true;
		}

		function endsWith(testStr, referenceStr) {
		    return cmpStr(testStr, testStr.length - referenceStr.length, testStr.length, referenceStr);
		}

		function findLastNonSpaceLocation(scanner) {
		    for (var i = scanner.source.length - 1; i >= 0; i--) {
		        var code = scanner.source.charCodeAt(i);

		        if (code !== SPACE$1 && code !== TAB$1 && code !== R$1 && code !== N$1 && code !== F$1) {
		            break;
		        }
		    }

		    return scanner.getLocation(i + 1);
		}

		function findWhiteSpaceEnd(source, offset) {
		    for (; offset < source.length; offset++) {
		        var code = source.charCodeAt(offset);

		        if (code !== SPACE$1 && code !== TAB$1 && code !== R$1 && code !== N$1 && code !== F$1) {
		            break;
		        }
		    }

		    return offset;
		}

		function findCommentEnd(source, offset) {
		    var commentEnd = source.indexOf('*/', offset);

		    if (commentEnd === -1) {
		        return source.length;
		    }

		    return commentEnd + 2;
		}

		function findStringEnd(source, offset, quote) {
		    for (; offset < source.length; offset++) {
		        var code = source.charCodeAt(offset);

		        // TODO: bad string
		        if (code === BACK_SLASH) {
		            offset++;
		        } else if (code === quote) {
		            offset++;
		            break;
		        }
		    }

		    return offset;
		}

		function findDecimalNumberEnd(source, offset) {
		    for (; offset < source.length; offset++) {
		        var code = source.charCodeAt(offset);

		        if (code < 48 || code > 57) {  // not a 0 .. 9
		            break;
		        }
		    }

		    return offset;
		}

		function findNumberEnd(source, offset, allowFraction) {
		    var code;

		    offset = findDecimalNumberEnd(source, offset);

		    // fraction: .\d+
		    if (allowFraction && offset + 1 < source.length && source.charCodeAt(offset) === FULLSTOP) {
		        code = source.charCodeAt(offset + 1);

		        if (isNumber(code)) {
		            offset = findDecimalNumberEnd(source, offset + 1);
		        }
		    }

		    // exponent: e[+-]\d+
		    if (offset + 1 < source.length) {
		        if ((source.charCodeAt(offset) | 32) === E) { // case insensitive check for `e`
		            code = source.charCodeAt(offset + 1);

		            if (code === PLUSSIGN || code === HYPHENMINUS) {
		                if (offset + 2 < source.length) {
		                    code = source.charCodeAt(offset + 2);
		                }
		            }

		            if (isNumber(code)) {
		                offset = findDecimalNumberEnd(source, offset + 2);
		            }
		        }
		    }

		    return offset;
		}

		// skip escaped unicode sequence that can ends with space
		// [0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?
		function findEscaseEnd(source, offset) {
		    for (var i = 0; i < 7 && offset + i < source.length; i++) {
		        var code = source.charCodeAt(offset + i);

		        if (i !== 6 && isHex(code)) {
		            continue;
		        }

		        if (i > 0) {
		            offset += i - 1 + isNewline(source, offset + i, code);
		            if (code === SPACE$1 || code === TAB$1) {
		                offset++;
		            }
		        }

		        break;
		    }

		    return offset;
		}

		function findIdentifierEnd(source, offset) {
		    for (; offset < source.length; offset++) {
		        var code = source.charCodeAt(offset);

		        if (code === BACK_SLASH) {
		            offset = findEscaseEnd(source, offset + 1);
		        } else if (code < 0x80 && PUNCTUATION$1[code] === PUNCTUATOR$1) {
		            break;
		        }
		    }

		    return offset;
		}

		function findUrlRawEnd(source, offset) {
		    for (; offset < source.length; offset++) {
		        var code = source.charCodeAt(offset);

		        if (code === BACK_SLASH) {
		            offset = findEscaseEnd(source, offset + 1);
		        } else if (code < 0x80 && STOP_URL_RAW$1[code] === 1) {
		            break;
		        }
		    }

		    return offset;
		}

		var utils = {
		    firstCharOffset: firstCharOffset,

		    isHex: isHex,
		    isNumber: isNumber,
		    isNewline: isNewline,

		    cmpChar: cmpChar,
		    cmpStr: cmpStr,
		    endsWith: endsWith,

		    findLastNonSpaceLocation: findLastNonSpaceLocation,
		    findWhiteSpaceEnd: findWhiteSpaceEnd,
		    findCommentEnd: findCommentEnd,
		    findStringEnd: findStringEnd,
		    findDecimalNumberEnd: findDecimalNumberEnd,
		    findNumberEnd: findNumberEnd,
		    findEscaseEnd: findEscaseEnd,
		    findIdentifierEnd: findIdentifierEnd,
		    findUrlRawEnd: findUrlRawEnd
		};

		var TYPE$2 = _const.TYPE;
		var NAME$1 = _const.NAME;
		var SYMBOL_TYPE$1 = _const.SYMBOL_TYPE;


		var firstCharOffset$1 = utils.firstCharOffset;
		var cmpStr$1 = utils.cmpStr;
		var isNumber$1 = utils.isNumber;
		var findLastNonSpaceLocation$1 = utils.findLastNonSpaceLocation;
		var findWhiteSpaceEnd$1 = utils.findWhiteSpaceEnd;
		var findCommentEnd$1 = utils.findCommentEnd;
		var findStringEnd$1 = utils.findStringEnd;
		var findNumberEnd$1 = utils.findNumberEnd;
		var findIdentifierEnd$1 = utils.findIdentifierEnd;
		var findUrlRawEnd$1 = utils.findUrlRawEnd;

		var NULL = 0;
		var WHITESPACE$1 = TYPE$2.WhiteSpace;
		var IDENTIFIER$1 = TYPE$2.Identifier;
		var NUMBER$1 = TYPE$2.Number;
		var STRING$1 = TYPE$2.String;
		var COMMENT$1 = TYPE$2.Comment;
		var PUNCTUATOR$2 = TYPE$2.Punctuator;
		var CDO$1 = TYPE$2.CDO;
		var CDC$1 = TYPE$2.CDC;
		var ATRULE$1 = TYPE$2.Atrule;
		var FUNCTION$1 = TYPE$2.Function;
		var URL$1 = TYPE$2.Url;
		var RAW$1 = TYPE$2.Raw;

		var N$2 = 10;
		var F$2 = 12;
		var R$2 = 13;
		var STAR = TYPE$2.Asterisk;
		var SLASH = TYPE$2.Solidus;
		var FULLSTOP$1 = TYPE$2.FullStop;
		var PLUSSIGN$1 = TYPE$2.PlusSign;
		var HYPHENMINUS$1 = TYPE$2.HyphenMinus;
		var GREATERTHANSIGN = TYPE$2.GreaterThanSign;
		var LESSTHANSIGN = TYPE$2.LessThanSign;
		var EXCLAMATIONMARK = TYPE$2.ExclamationMark;
		var COMMERCIALAT = TYPE$2.CommercialAt;
		var QUOTATIONMARK = TYPE$2.QuotationMark;
		var APOSTROPHE = TYPE$2.Apostrophe;
		var LEFTPARENTHESIS = TYPE$2.LeftParenthesis;
		var RIGHTPARENTHESIS = TYPE$2.RightParenthesis;
		var LEFTCURLYBRACKET = TYPE$2.LeftCurlyBracket;
		var RIGHTCURLYBRACKET = TYPE$2.RightCurlyBracket;
		var LEFTSQUAREBRACKET = TYPE$2.LeftSquareBracket;
		var RIGHTSQUAREBRACKET = TYPE$2.RightSquareBracket;

		var MIN_BUFFER_SIZE = 16 * 1024;
		var OFFSET_MASK = 0x00FFFFFF;
		var TYPE_SHIFT = 24;
		var SafeUint32Array$1 = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported

		function computeLinesAndColumns(tokenizer, source) {
		    var sourceLength = source.length;
		    var start = firstCharOffset$1(source);
		    var lines = tokenizer.lines;
		    var line = tokenizer.startLine;
		    var columns = tokenizer.columns;
		    var column = tokenizer.startColumn;

		    if (lines === null || lines.length < sourceLength + 1) {
		        lines = new SafeUint32Array$1(Math.max(sourceLength + 1024, MIN_BUFFER_SIZE));
		        columns = new SafeUint32Array$1(lines.length);
		    }

		    for (var i = start; i < sourceLength; i++) {
		        var code = source.charCodeAt(i);

		        lines[i] = line;
		        columns[i] = column++;

		        if (code === N$2 || code === R$2 || code === F$2) {
		            if (code === R$2 && i + 1 < sourceLength && source.charCodeAt(i + 1) === N$2) {
		                i++;
		                lines[i] = line;
		                columns[i] = column;
		            }

		            line++;
		            column = 1;
		        }
		    }

		    lines[i] = line;
		    columns[i] = column;

		    tokenizer.linesAnsColumnsComputed = true;
		    tokenizer.lines = lines;
		    tokenizer.columns = columns;
		}

		function tokenLayout(tokenizer, source, startPos) {
		    var sourceLength = source.length;
		    var offsetAndType = tokenizer.offsetAndType;
		    var balance = tokenizer.balance;
		    var tokenCount = 0;
		    var prevType = 0;
		    var offset = startPos;
		    var anchor = 0;
		    var balanceCloseCode = 0;
		    var balanceStart = 0;
		    var balancePrev = 0;

		    if (offsetAndType === null || offsetAndType.length < sourceLength + 1) {
		        offsetAndType = new SafeUint32Array$1(sourceLength + 1024);
		        balance = new SafeUint32Array$1(sourceLength + 1024);
		    }

		    while (offset < sourceLength) {
		        var code = source.charCodeAt(offset);
		        var type = code < 0x80 ? SYMBOL_TYPE$1[code] : IDENTIFIER$1;

		        balance[tokenCount] = sourceLength;

		        switch (type) {
		            case WHITESPACE$1:
		                offset = findWhiteSpaceEnd$1(source, offset + 1);
		                break;

		            case PUNCTUATOR$2:
		                switch (code) {
		                    case balanceCloseCode:
		                        balancePrev = balanceStart & OFFSET_MASK;
		                        balanceStart = balance[balancePrev];
		                        balanceCloseCode = balanceStart >> TYPE_SHIFT;
		                        balance[tokenCount] = balancePrev;
		                        balance[balancePrev++] = tokenCount;
		                        for (; balancePrev < tokenCount; balancePrev++) {
		                            if (balance[balancePrev] === sourceLength) {
		                                balance[balancePrev] = tokenCount;
		                            }
		                        }
		                        break;

		                    case LEFTSQUAREBRACKET:
		                        balance[tokenCount] = balanceStart;
		                        balanceCloseCode = RIGHTSQUAREBRACKET;
		                        balanceStart = (balanceCloseCode << TYPE_SHIFT) | tokenCount;
		                        break;

		                    case LEFTCURLYBRACKET:
		                        balance[tokenCount] = balanceStart;
		                        balanceCloseCode = RIGHTCURLYBRACKET;
		                        balanceStart = (balanceCloseCode << TYPE_SHIFT) | tokenCount;
		                        break;

		                    case LEFTPARENTHESIS:
		                        balance[tokenCount] = balanceStart;
		                        balanceCloseCode = RIGHTPARENTHESIS;
		                        balanceStart = (balanceCloseCode << TYPE_SHIFT) | tokenCount;
		                        break;
		                }

		                // /*
		                if (code === STAR && prevType === SLASH) {
		                    type = COMMENT$1;
		                    offset = findCommentEnd$1(source, offset + 1);
		                    tokenCount--; // rewrite prev token
		                    break;
		                }

		                // edge case for -.123 and +.123
		                if (code === FULLSTOP$1 && (prevType === PLUSSIGN$1 || prevType === HYPHENMINUS$1)) {
		                    if (offset + 1 < sourceLength && isNumber$1(source.charCodeAt(offset + 1))) {
		                        type = NUMBER$1;
		                        offset = findNumberEnd$1(source, offset + 2, false);
		                        tokenCount--; // rewrite prev token
		                        break;
		                    }
		                }

		                // <!--
		                if (code === EXCLAMATIONMARK && prevType === LESSTHANSIGN) {
		                    if (offset + 2 < sourceLength &&
		                        source.charCodeAt(offset + 1) === HYPHENMINUS$1 &&
		                        source.charCodeAt(offset + 2) === HYPHENMINUS$1) {
		                        type = CDO$1;
		                        offset = offset + 3;
		                        tokenCount--; // rewrite prev token
		                        break;
		                    }
		                }

		                // -->
		                if (code === HYPHENMINUS$1 && prevType === HYPHENMINUS$1) {
		                    if (offset + 1 < sourceLength && source.charCodeAt(offset + 1) === GREATERTHANSIGN) {
		                        type = CDC$1;
		                        offset = offset + 2;
		                        tokenCount--; // rewrite prev token
		                        break;
		                    }
		                }

		                // ident(
		                if (code === LEFTPARENTHESIS && prevType === IDENTIFIER$1) {
		                    offset = offset + 1;
		                    tokenCount--; // rewrite prev token
		                    balance[tokenCount] = balance[tokenCount + 1];
		                    balanceStart--;

		                    // 4 char length identifier and equal to `url(` (case insensitive)
		                    if (offset - anchor === 4 && cmpStr$1(source, anchor, offset, 'url(')) {
		                        // special case for url() because it can contain any symbols sequence with few exceptions
		                        anchor = findWhiteSpaceEnd$1(source, offset);
		                        code = source.charCodeAt(anchor);
		                        if (code !== LEFTPARENTHESIS &&
		                            code !== RIGHTPARENTHESIS &&
		                            code !== QUOTATIONMARK &&
		                            code !== APOSTROPHE) {
		                            // url(
		                            offsetAndType[tokenCount++] = (URL$1 << TYPE_SHIFT) | offset;
		                            balance[tokenCount] = sourceLength;

		                            // ws*
		                            if (anchor !== offset) {
		                                offsetAndType[tokenCount++] = (WHITESPACE$1 << TYPE_SHIFT) | anchor;
		                                balance[tokenCount] = sourceLength;
		                            }

		                            // raw
		                            type = RAW$1;
		                            offset = findUrlRawEnd$1(source, anchor);
		                        } else {
		                            type = URL$1;
		                        }
		                    } else {
		                        type = FUNCTION$1;
		                    }
		                    break;
		                }

		                type = code;
		                offset = offset + 1;
		                break;

		            case NUMBER$1:
		                offset = findNumberEnd$1(source, offset + 1, prevType !== FULLSTOP$1);

		                // merge number with a preceding dot, dash or plus
		                if (prevType === FULLSTOP$1 ||
		                    prevType === HYPHENMINUS$1 ||
		                    prevType === PLUSSIGN$1) {
		                    tokenCount--; // rewrite prev token
		                }

		                break;

		            case STRING$1:
		                offset = findStringEnd$1(source, offset + 1, code);
		                break;

		            default:
		                anchor = offset;
		                offset = findIdentifierEnd$1(source, offset);

		                // merge identifier with a preceding dash
		                if (prevType === HYPHENMINUS$1) {
		                    // rewrite prev token
		                    tokenCount--;
		                    // restore prev prev token type
		                    // for case @-prefix-ident
		                    prevType = tokenCount === 0 ? 0 : offsetAndType[tokenCount - 1] >> TYPE_SHIFT;
		                }

		                if (prevType === COMMERCIALAT) {
		                    // rewrite prev token and change type to <at-keyword-token>
		                    tokenCount--;
		                    type = ATRULE$1;
		                }
		        }

		        offsetAndType[tokenCount++] = (type << TYPE_SHIFT) | offset;
		        prevType = type;
		    }

		    // finalize arrays
		    offsetAndType[tokenCount] = offset;
		    balance[tokenCount] = sourceLength;
		    while (balanceStart !== 0) {
		        balancePrev = balanceStart & OFFSET_MASK;
		        balanceStart = balance[balancePrev];
		        balance[balancePrev] = sourceLength;
		    }

		    tokenizer.offsetAndType = offsetAndType;
		    tokenizer.tokenCount = tokenCount;
		    tokenizer.balance = balance;
		}

		//
		// tokenizer
		//

		var Tokenizer = function(source, startOffset, startLine, startColumn) {
		    this.offsetAndType = null;
		    this.balance = null;
		    this.lines = null;
		    this.columns = null;

		    this.setSource(source, startOffset, startLine, startColumn);
		};

		Tokenizer.prototype = {
		    setSource: function(source, startOffset, startLine, startColumn) {
		        var safeSource = String(source || '');
		        var start = firstCharOffset$1(safeSource);

		        this.source = safeSource;
		        this.firstCharOffset = start;
		        this.startOffset = typeof startOffset === 'undefined' ? 0 : startOffset;
		        this.startLine = typeof startLine === 'undefined' ? 1 : startLine;
		        this.startColumn = typeof startColumn === 'undefined' ? 1 : startColumn;
		        this.linesAnsColumnsComputed = false;

		        this.eof = false;
		        this.currentToken = -1;
		        this.tokenType = 0;
		        this.tokenStart = start;
		        this.tokenEnd = start;

		        tokenLayout(this, safeSource, start);
		        this.next();
		    },

		    lookupType: function(offset) {
		        offset += this.currentToken;

		        if (offset < this.tokenCount) {
		            return this.offsetAndType[offset] >> TYPE_SHIFT;
		        }

		        return NULL;
		    },
		    lookupNonWSType: function(offset) {
		        offset += this.currentToken;

		        for (var type; offset < this.tokenCount; offset++) {
		            type = this.offsetAndType[offset] >> TYPE_SHIFT;

		            if (type !== WHITESPACE$1) {
		                return type;
		            }
		        }

		        return NULL;
		    },
		    lookupValue: function(offset, referenceStr) {
		        offset += this.currentToken;

		        if (offset < this.tokenCount) {
		            return cmpStr$1(
		                this.source,
		                this.offsetAndType[offset - 1] & OFFSET_MASK,
		                this.offsetAndType[offset] & OFFSET_MASK,
		                referenceStr
		            );
		        }

		        return false;
		    },
		    getTokenStart: function(tokenNum) {
		        if (tokenNum === this.currentToken) {
		            return this.tokenStart;
		        }

		        if (tokenNum > 0) {
		            return tokenNum < this.tokenCount
		                ? this.offsetAndType[tokenNum - 1] & OFFSET_MASK
		                : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
		        }

		        return this.firstCharOffset;
		    },
		    getOffsetExcludeWS: function() {
		        if (this.currentToken > 0) {
		            if ((this.offsetAndType[this.currentToken - 1] >> TYPE_SHIFT) === WHITESPACE$1) {
		                return this.currentToken > 1
		                    ? this.offsetAndType[this.currentToken - 2] & OFFSET_MASK
		                    : this.firstCharOffset;
		            }
		        }
		        return this.tokenStart;
		    },
		    getRawLength: function(startToken, endTokenType1, endTokenType2, includeTokenType2) {
		        var cursor = startToken;
		        var balanceEnd;

		        loop:
		        for (; cursor < this.tokenCount; cursor++) {
		            balanceEnd = this.balance[cursor];

		            // belance end points to offset before start
		            if (balanceEnd < startToken) {
		                break loop;
		            }

		            // check token is stop type
		            switch (this.offsetAndType[cursor] >> TYPE_SHIFT) {
		                case endTokenType1:
		                    break loop;

		                case endTokenType2:
		                    if (includeTokenType2) {
		                        cursor++;
		                    }
		                    break loop;

		                default:
		                    // fast forward to the end of balanced block
		                    if (this.balance[balanceEnd] === cursor) {
		                        cursor = balanceEnd;
		                    }
		            }

		        }

		        return cursor - this.currentToken;
		    },

		    getTokenValue: function() {
		        return this.source.substring(this.tokenStart, this.tokenEnd);
		    },
		    substrToCursor: function(start) {
		        return this.source.substring(start, this.tokenStart);
		    },

		    skipWS: function() {
		        for (var i = this.currentToken, skipTokenCount = 0; i < this.tokenCount; i++, skipTokenCount++) {
		            if ((this.offsetAndType[i] >> TYPE_SHIFT) !== WHITESPACE$1) {
		                break;
		            }
		        }

		        if (skipTokenCount > 0) {
		            this.skip(skipTokenCount);
		        }
		    },
		    skipSC: function() {
		        while (this.tokenType === WHITESPACE$1 || this.tokenType === COMMENT$1) {
		            this.next();
		        }
		    },
		    skip: function(tokenCount) {
		        var next = this.currentToken + tokenCount;

		        if (next < this.tokenCount) {
		            this.currentToken = next;
		            this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
		            next = this.offsetAndType[next];
		            this.tokenType = next >> TYPE_SHIFT;
		            this.tokenEnd = next & OFFSET_MASK;
		        } else {
		            this.currentToken = this.tokenCount;
		            this.next();
		        }
		    },
		    next: function() {
		        var next = this.currentToken + 1;

		        if (next < this.tokenCount) {
		            this.currentToken = next;
		            this.tokenStart = this.tokenEnd;
		            next = this.offsetAndType[next];
		            this.tokenType = next >> TYPE_SHIFT;
		            this.tokenEnd = next & OFFSET_MASK;
		        } else {
		            this.currentToken = this.tokenCount;
		            this.eof = true;
		            this.tokenType = NULL;
		            this.tokenStart = this.tokenEnd = this.source.length;
		        }
		    },

		    eat: function(tokenType) {
		        if (this.tokenType !== tokenType) {
		            var offset = this.tokenStart;
		            var message = NAME$1[tokenType] + ' is expected';

		            // tweak message and offset
		            if (tokenType === IDENTIFIER$1) {
		                // when identifier is expected but there is a function or url
		                if (this.tokenType === FUNCTION$1 || this.tokenType === URL$1) {
		                    offset = this.tokenEnd - 1;
		                    message += ' but function found';
		                }
		            } else {
		                // when test type is part of another token show error for current position + 1
		                // e.g. eat(HYPHENMINUS) will fail on "-foo", but pointing on "-" is odd
		                if (this.source.charCodeAt(this.tokenStart) === tokenType) {
		                    offset = offset + 1;
		                }
		            }

		            this.error(message, offset);
		        }

		        this.next();
		    },
		    eatNonWS: function(tokenType) {
		        this.skipWS();
		        this.eat(tokenType);
		    },

		    consume: function(tokenType) {
		        var value = this.getTokenValue();

		        this.eat(tokenType);

		        return value;
		    },
		    consumeFunctionName: function() {
		        var name = this.source.substring(this.tokenStart, this.tokenEnd - 1);

		        this.eat(FUNCTION$1);

		        return name;
		    },
		    consumeNonWS: function(tokenType) {
		        this.skipWS();

		        return this.consume(tokenType);
		    },

		    expectIdentifier: function(name) {
		        if (this.tokenType !== IDENTIFIER$1 || cmpStr$1(this.source, this.tokenStart, this.tokenEnd, name) === false) {
		            this.error('Identifier `' + name + '` is expected');
		        }

		        this.next();
		    },

		    getLocation: function(offset, filename) {
		        if (!this.linesAnsColumnsComputed) {
		            computeLinesAndColumns(this, this.source);
		        }

		        return {
		            source: filename,
		            offset: this.startOffset + offset,
		            line: this.lines[offset],
		            column: this.columns[offset]
		        };
		    },

		    getLocationRange: function(start, end, filename) {
		        if (!this.linesAnsColumnsComputed) {
		            computeLinesAndColumns(this, this.source);
		        }

		        return {
		            source: filename,
		            start: {
		                offset: this.startOffset + start,
		                line: this.lines[start],
		                column: this.columns[start]
		            },
		            end: {
		                offset: this.startOffset + end,
		                line: this.lines[end],
		                column: this.columns[end]
		            }
		        };
		    },

		    error: function(message, offset) {
		        var location = typeof offset !== 'undefined' && offset < this.source.length
		            ? this.getLocation(offset)
		            : this.eof
		                ? findLastNonSpaceLocation$1(this)
		                : this.getLocation(this.tokenStart);

		        throw new error(
		            message || 'Unexpected input',
		            this.source,
		            location.offset,
		            location.line,
		            location.column
		        );
		    },

		    dump: function() {
		        var offset = 0;

		        return Array.prototype.slice.call(this.offsetAndType, 0, this.tokenCount).map(function(item, idx) {
		            var start = offset;
		            var end = item & OFFSET_MASK;

		            offset = end;

		            return {
		                idx: idx,
		                type: NAME$1[item >> TYPE_SHIFT],
		                chunk: this.source.substring(start, end),
		                balance: this.balance[idx]
		            };
		        }, this);
		    }
		};

		// extend with error class
		Tokenizer.CssSyntaxError = error;

		// extend tokenizer with constants
		Object.keys(_const).forEach(function(key) {
		    Tokenizer[key] = _const[key];
		});

		// extend tokenizer with static methods from utils
		Object.keys(utils).forEach(function(key) {
		    Tokenizer[key] = utils[key];
		});

		// warm up tokenizer to elimitate code branches that never execute
		// fix soft deoptimizations (insufficient type feedback)
		new Tokenizer('\n\r\r\n\f<!---->//""\'\'/*\r\n\f*/1a;.\\31\t\+2{url(a);func();+1.2e3 -.4e-5 .6e+7}').getLocation();

		var Tokenizer_1 = Tokenizer;

		var tokenizer$1 = Tokenizer_1;

		//
		//            item        item        item        item
		//          /------\    /------\    /------\    /------\
		//          | data |    | data |    | data |    | data |
		//  null <--+-prev |<---+-prev |<---+-prev |<---+-prev |
		//          | next-+--->| next-+--->| next-+--->| next-+--> null
		//          \------/    \------/    \------/    \------/
		//             ^                                    ^
		//             |                list                |
		//             |              /------\              |
		//             \--------------+-head |              |
		//                            | tail-+--------------/
		//                            \------/
		//

		function createItem(data) {
		    return {
		        prev: null,
		        next: null,
		        data: data
		    };
		}

		var cursors = null;
		var List = function() {
		    this.cursor = null;
		    this.head = null;
		    this.tail = null;
		};

		List.createItem = createItem;
		List.prototype.createItem = createItem;

		List.prototype.getSize = function() {
		    var size = 0;
		    var cursor = this.head;

		    while (cursor) {
		        size++;
		        cursor = cursor.next;
		    }

		    return size;
		};

		List.prototype.fromArray = function(array) {
		    var cursor = null;

		    this.head = null;

		    for (var i = 0; i < array.length; i++) {
		        var item = createItem(array[i]);

		        if (cursor !== null) {
		            cursor.next = item;
		        } else {
		            this.head = item;
		        }

		        item.prev = cursor;
		        cursor = item;
		    }

		    this.tail = cursor;

		    return this;
		};

		List.prototype.toArray = function() {
		    var cursor = this.head;
		    var result = [];

		    while (cursor) {
		        result.push(cursor.data);
		        cursor = cursor.next;
		    }

		    return result;
		};

		List.prototype.toJSON = List.prototype.toArray;

		List.prototype.isEmpty = function() {
		    return this.head === null;
		};

		List.prototype.first = function() {
		    return this.head && this.head.data;
		};

		List.prototype.last = function() {
		    return this.tail && this.tail.data;
		};

		function allocateCursor(node, prev, next) {
		    var cursor;

		    if (cursors !== null) {
		        cursor = cursors;
		        cursors = cursors.cursor;
		        cursor.prev = prev;
		        cursor.next = next;
		        cursor.cursor = node.cursor;
		    } else {
		        cursor = {
		            prev: prev,
		            next: next,
		            cursor: node.cursor
		        };
		    }

		    node.cursor = cursor;

		    return cursor;
		}

		function releaseCursor(node) {
		    var cursor = node.cursor;

		    node.cursor = cursor.cursor;
		    cursor.prev = null;
		    cursor.next = null;
		    cursor.cursor = cursors;
		    cursors = cursor;
		}

		List.prototype.each = function(fn, context) {
		    var item;

		    if (context === undefined) {
		        context = this;
		    }

		    // push cursor
		    var cursor = allocateCursor(this, null, this.head);

		    while (cursor.next !== null) {
		        item = cursor.next;
		        cursor.next = item.next;

		        fn.call(context, item.data, item, this);
		    }

		    // pop cursor
		    releaseCursor(this);
		};

		List.prototype.eachRight = function(fn, context) {
		    var item;

		    if (context === undefined) {
		        context = this;
		    }

		    // push cursor
		    var cursor = allocateCursor(this, this.tail, null);

		    while (cursor.prev !== null) {
		        item = cursor.prev;
		        cursor.prev = item.prev;

		        fn.call(context, item.data, item, this);
		    }

		    // pop cursor
		    releaseCursor(this);
		};

		List.prototype.nextUntil = function(start, fn, context) {
		    if (start === null) {
		        return;
		    }

		    var item;

		    if (context === undefined) {
		        context = this;
		    }

		    // push cursor
		    var cursor = allocateCursor(this, null, start);

		    while (cursor.next !== null) {
		        item = cursor.next;
		        cursor.next = item.next;

		        if (fn.call(context, item.data, item, this)) {
		            break;
		        }
		    }

		    // pop cursor
		    releaseCursor(this);
		};

		List.prototype.prevUntil = function(start, fn, context) {
		    if (start === null) {
		        return;
		    }

		    var item;

		    if (context === undefined) {
		        context = this;
		    }

		    // push cursor
		    var cursor = allocateCursor(this, start, null);

		    while (cursor.prev !== null) {
		        item = cursor.prev;
		        cursor.prev = item.prev;

		        if (fn.call(context, item.data, item, this)) {
		            break;
		        }
		    }

		    // pop cursor
		    releaseCursor(this);
		};

		List.prototype.some = function(fn, context) {
		    var cursor = this.head;

		    if (context === undefined) {
		        context = this;
		    }

		    while (cursor !== null) {
		        if (fn.call(context, cursor.data, cursor, this)) {
		            return true;
		        }

		        cursor = cursor.next;
		    }

		    return false;
		};

		List.prototype.map = function(fn, context) {
		    var result = [];
		    var cursor = this.head;

		    if (context === undefined) {
		        context = this;
		    }

		    while (cursor !== null) {
		        result.push(fn.call(context, cursor.data, cursor, this));
		        cursor = cursor.next;
		    }

		    return result;
		};

		List.prototype.clear = function() {
		    this.head = null;
		    this.tail = null;
		};

		List.prototype.copy = function() {
		    var result = new List();
		    var cursor = this.head;

		    while (cursor !== null) {
		        result.insert(createItem(cursor.data));
		        cursor = cursor.next;
		    }

		    return result;
		};

		List.prototype.updateCursors = function(prevOld, prevNew, nextOld, nextNew) {
		    var cursor = this.cursor;

		    while (cursor !== null) {
		        if (cursor.prev === prevOld) {
		            cursor.prev = prevNew;
		        }

		        if (cursor.next === nextOld) {
		            cursor.next = nextNew;
		        }

		        cursor = cursor.cursor;
		    }
		};

		List.prototype.prepend = function(item) {
		    //      head
		    //    ^
		    // item
		    this.updateCursors(null, item, this.head, item);

		    // insert to the beginning of the list
		    if (this.head !== null) {
		        // new item <- first item
		        this.head.prev = item;

		        // new item -> first item
		        item.next = this.head;
		    } else {
		        // if list has no head, then it also has no tail
		        // in this case tail points to the new item
		        this.tail = item;
		    }

		    // head always points to new item
		    this.head = item;

		    return this;
		};

		List.prototype.prependData = function(data) {
		    return this.prepend(createItem(data));
		};

		List.prototype.append = function(item) {
		    // tail
		    //      ^
		    //      item
		    this.updateCursors(this.tail, item, null, item);

		    // insert to the ending of the list
		    if (this.tail !== null) {
		        // last item -> new item
		        this.tail.next = item;

		        // last item <- new item
		        item.prev = this.tail;
		    } else {
		        // if list has no tail, then it also has no head
		        // in this case head points to new item
		        this.head = item;
		    }

		    // tail always points to new item
		    this.tail = item;

		    return this;
		};

		List.prototype.appendData = function(data) {
		    return this.append(createItem(data));
		};

		List.prototype.insert = function(item, before) {
		    if (before !== undefined && before !== null) {
		        // prev   before
		        //      ^
		        //     item
		        this.updateCursors(before.prev, item, before, item);

		        if (before.prev === null) {
		            // insert to the beginning of list
		            if (this.head !== before) {
		                throw new Error('before doesn\'t belong to list');
		            }

		            // since head points to before therefore list doesn't empty
		            // no need to check tail
		            this.head = item;
		            before.prev = item;
		            item.next = before;

		            this.updateCursors(null, item);
		        } else {

		            // insert between two items
		            before.prev.next = item;
		            item.prev = before.prev;

		            before.prev = item;
		            item.next = before;
		        }
		    } else {
		        this.append(item);
		    }
		};

		List.prototype.insertData = function(data, before) {
		    this.insert(createItem(data), before);
		};

		List.prototype.remove = function(item) {
		    //      item
		    //       ^
		    // prev     next
		    this.updateCursors(item, item.prev, item, item.next);

		    if (item.prev !== null) {
		        item.prev.next = item.next;
		    } else {
		        if (this.head !== item) {
		            throw new Error('item doesn\'t belong to list');
		        }

		        this.head = item.next;
		    }

		    if (item.next !== null) {
		        item.next.prev = item.prev;
		    } else {
		        if (this.tail !== item) {
		            throw new Error('item doesn\'t belong to list');
		        }

		        this.tail = item.prev;
		    }

		    item.prev = null;
		    item.next = null;

		    return item;
		};

		List.prototype.appendList = function(list) {
		    // ignore empty lists
		    if (list.head === null) {
		        return;
		    }

		    this.updateCursors(this.tail, list.tail, null, list.head);

		    // insert to end of the list
		    if (this.tail !== null) {
		        // if destination list has a tail, then it also has a head,
		        // but head doesn't change

		        // dest tail -> source head
		        this.tail.next = list.head;

		        // dest tail <- source head
		        list.head.prev = this.tail;
		    } else {
		        // if list has no a tail, then it also has no a head
		        // in this case points head to new item
		        this.head = list.head;
		    }

		    // tail always start point to new item
		    this.tail = list.tail;

		    list.head = null;
		    list.tail = null;
		};

		List.prototype.insertList = function(list, before) {
		    if (before !== undefined && before !== null) {
		        // ignore empty lists
		        if (list.head === null) {
		            return;
		        }

		        this.updateCursors(before.prev, list.tail, before, list.head);

		        // insert in the middle of dist list
		        if (before.prev !== null) {
		            // before.prev <-> list.head
		            before.prev.next = list.head;
		            list.head.prev = before.prev;
		        } else {
		            this.head = list.head;
		        }

		        before.prev = list.tail;
		        list.tail.next = before;

		        list.head = null;
		        list.tail = null;
		    } else {
		        this.appendList(list);
		    }
		};

		List.prototype.replace = function(oldItem, newItemOrList) {
		    if ('head' in newItemOrList) {
		        this.insertList(newItemOrList, oldItem);
		    } else {
		        this.insert(newItemOrList, oldItem);
		    }
		    this.remove(oldItem);
		};

		var list = List;

		var TYPE$3 = tokenizer$1.TYPE;
		var WHITESPACE$2 = TYPE$3.WhiteSpace;
		var COMMENT$2 = TYPE$3.Comment;

		var sequence = function readSequence(recognizer) {
		    var children = new list();
		    var child = null;
		    var context = {
		        recognizer: recognizer,
		        space: null,
		        ignoreWS: false,
		        ignoreWSAfter: false
		    };

		    this.scanner.skipSC();

		    while (!this.scanner.eof) {
		        switch (this.scanner.tokenType) {
		            case COMMENT$2:
		                this.scanner.next();
		                continue;

		            case WHITESPACE$2:
		                if (context.ignoreWS) {
		                    this.scanner.next();
		                } else {
		                    context.space = this.WhiteSpace();
		                }
		                continue;
		        }

		        child = recognizer.getNode.call(this, context);

		        if (child === undefined) {
		            break;
		        }

		        if (context.space !== null) {
		            children.appendData(context.space);
		            context.space = null;
		        }

		        children.appendData(child);

		        if (context.ignoreWSAfter) {
		            context.ignoreWSAfter = false;
		            context.ignoreWS = true;
		        } else {
		            context.ignoreWS = false;
		        }
		    }

		    return children;
		};

		var noop$1 = function() {};

		function createParseContext(name) {
		    return function() {
		        return this[name]();
		    };
		}

		function processConfig(config) {
		    var parserConfig = {
		        context: {},
		        scope: {},
		        atrule: {},
		        pseudo: {}
		    };

		    if (config.parseContext) {
		        for (var name in config.parseContext) {
		            switch (typeof config.parseContext[name]) {
		                case 'function':
		                    parserConfig.context[name] = config.parseContext[name];
		                    break;

		                case 'string':
		                    parserConfig.context[name] = createParseContext(config.parseContext[name]);
		                    break;
		            }
		        }
		    }

		    if (config.scope) {
		        for (var name in config.scope) {
		            parserConfig.scope[name] = config.scope[name];
		        }
		    }

		    if (config.atrule) {
		        for (var name in config.atrule) {
		            var atrule = config.atrule[name];

		            if (atrule.parse) {
		                parserConfig.atrule[name] = atrule.parse;
		            }
		        }
		    }

		    if (config.pseudo) {
		        for (var name in config.pseudo) {
		            var pseudo = config.pseudo[name];

		            if (pseudo.parse) {
		                parserConfig.pseudo[name] = pseudo.parse;
		            }
		        }
		    }

		    if (config.node) {
		        for (var name in config.node) {
		            parserConfig[name] = config.node[name].parse;
		        }
		    }

		    return parserConfig;
		}

		var create = function createParser(config) {
		    var parser = {
		        scanner: new tokenizer$1(),
		        filename: '<unknown>',
		        needPositions: false,
		        tolerant: false,
		        onParseError: noop$1,
		        parseAtruleExpression: true,
		        parseSelector: true,
		        parseValue: true,
		        parseCustomProperty: false,

		        readSequence: sequence,

		        tolerantParse: function(consumer, fallback) {
		            if (this.tolerant) {
		                var start = this.scanner.currentToken;

		                try {
		                    return consumer.call(this);
		                } catch (e) {
		                    this.onParseError(e);
		                    return fallback.call(this, start);
		                }
		            } else {
		                return consumer.call(this);
		            }
		        },

		        getLocation: function(start, end) {
		            if (this.needPositions) {
		                return this.scanner.getLocationRange(
		                    start,
		                    end,
		                    this.filename
		                );
		            }

		            return null;
		        },
		        getLocationFromList: function(list) {
		            if (this.needPositions) {
		                return this.scanner.getLocationRange(
		                    list.head !== null ? list.first().loc.start.offset - this.scanner.startOffset : this.scanner.tokenStart,
		                    list.head !== null ? list.last().loc.end.offset - this.scanner.startOffset : this.scanner.tokenStart,
		                    this.filename
		                );
		            }

		            return null;
		        }
		    };

		    config = processConfig(config || {});
		    for (var key in config) {
		        parser[key] = config[key];
		    }

		    return function(source, options) {
		        options = options || {};

		        var context = options.context || 'default';
		        var ast;

		        parser.scanner.setSource(source, options.offset, options.line, options.column);
		        parser.filename = options.filename || '<unknown>';
		        parser.needPositions = Boolean(options.positions);
		        parser.tolerant = Boolean(options.tolerant);
		        parser.onParseError = typeof options.onParseError === 'function' ? options.onParseError : noop$1;
		        parser.parseAtruleExpression = 'parseAtruleExpression' in options ? Boolean(options.parseAtruleExpression) : true;
		        parser.parseSelector = 'parseSelector' in options ? Boolean(options.parseSelector) : true;
		        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
		        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

		        if (!parser.context.hasOwnProperty(context)) {
		            throw new Error('Unknown context `' + context + '`');
		        }

		        ast = parser.context[context].call(parser, options);

		        if (!parser.scanner.eof) {
		            parser.scanner.error();
		        }

		        // console.log(JSON.stringify(ast, null, 4));
		        return ast;
		    };
		};

		var cmpChar$1 = tokenizer$1.cmpChar;
		var TYPE$4 = tokenizer$1.TYPE;

		var IDENTIFIER$2 = TYPE$4.Identifier;
		var STRING$2 = TYPE$4.String;
		var NUMBER$2 = TYPE$4.Number;
		var FUNCTION$2 = TYPE$4.Function;
		var URL$2 = TYPE$4.Url;
		var NUMBERSIGN = TYPE$4.NumberSign;
		var LEFTPARENTHESIS$1 = TYPE$4.LeftParenthesis;
		var LEFTSQUAREBRACKET$1 = TYPE$4.LeftSquareBracket;
		var PLUSSIGN$2 = TYPE$4.PlusSign;
		var HYPHENMINUS$2 = TYPE$4.HyphenMinus;
		var COMMA = TYPE$4.Comma;
		var SOLIDUS = TYPE$4.Solidus;
		var ASTERISK = TYPE$4.Asterisk;
		var PERCENTSIGN = TYPE$4.PercentSign;
		var BACKSLASH = TYPE$4.Backslash;
		var U = 117; // 'u'.charCodeAt(0)

		var _default = function defaultRecognizer(context) {
		    switch (this.scanner.tokenType) {
		        case NUMBERSIGN:
		            return this.HexColor();

		        case COMMA:
		            context.space = null;
		            context.ignoreWSAfter = true;
		            return this.Operator();

		        case SOLIDUS:
		        case ASTERISK:
		        case PLUSSIGN$2:
		        case HYPHENMINUS$2:
		            return this.Operator();

		        case LEFTPARENTHESIS$1:
		            return this.Parentheses(this.readSequence, context.recognizer);

		        case LEFTSQUAREBRACKET$1:
		            return this.Brackets(this.readSequence, context.recognizer);

		        case STRING$2:
		            return this.String();

		        case NUMBER$2:
		            switch (this.scanner.lookupType(1)) {
		                case PERCENTSIGN:
		                    return this.Percentage();

		                case IDENTIFIER$2:
		                    // edge case: number with folowing \0 and \9 hack shouldn't to be a Dimension
		                    if (cmpChar$1(this.scanner.source, this.scanner.tokenEnd, BACKSLASH)) {
		                        return this.Number();
		                    } else {
		                        return this.Dimension();
		                    }

		                default:
		                    return this.Number();
		            }

		        case FUNCTION$2:
		            return this.Function(this.readSequence, context.recognizer);

		        case URL$2:
		            return this.Url();

		        case IDENTIFIER$2:
		            // check for unicode range, it should start with u+ or U+
		            if (cmpChar$1(this.scanner.source, this.scanner.tokenStart, U) &&
		                cmpChar$1(this.scanner.source, this.scanner.tokenStart + 1, PLUSSIGN$2)) {
		                return this.UnicodeRange();
		            } else {
		                return this.Identifier();
		            }
		    }
		};

		var atruleExpression = {
		    getNode: _default
		};

		var TYPE$5 = tokenizer$1.TYPE;

		var IDENTIFIER$3 = TYPE$5.Identifier;
		var NUMBER$3 = TYPE$5.Number;
		var NUMBERSIGN$1 = TYPE$5.NumberSign;
		var LEFTSQUAREBRACKET$2 = TYPE$5.LeftSquareBracket;
		var PLUSSIGN$3 = TYPE$5.PlusSign;
		var SOLIDUS$1 = TYPE$5.Solidus;
		var ASTERISK$1 = TYPE$5.Asterisk;
		var FULLSTOP$2 = TYPE$5.FullStop;
		var COLON = TYPE$5.Colon;
		var GREATERTHANSIGN$1 = TYPE$5.GreaterThanSign;
		var VERTICALLINE = TYPE$5.VerticalLine;
		var TILDE = TYPE$5.Tilde;

		function getNode(context) {
		    switch (this.scanner.tokenType) {
		        case PLUSSIGN$3:
		        case GREATERTHANSIGN$1:
		        case TILDE:
		            context.space = null;
		            context.ignoreWSAfter = true;
		            return this.Combinator();

		        case SOLIDUS$1:  // /deep/
		            return this.Combinator();

		        case FULLSTOP$2:
		            return this.ClassSelector();

		        case LEFTSQUAREBRACKET$2:
		            return this.AttributeSelector();

		        case NUMBERSIGN$1:
		            return this.IdSelector();

		        case COLON:
		            if (this.scanner.lookupType(1) === COLON) {
		                return this.PseudoElementSelector();
		            } else {
		                return this.PseudoClassSelector();
		            }

		        case IDENTIFIER$3:
		        case ASTERISK$1:
		        case VERTICALLINE:
		            return this.TypeSelector();

		        case NUMBER$3:
		            return this.Percentage();
		    }
		}
		var selector = {
		    getNode: getNode
		};

		// https://drafts.csswg.org/css-images-4/#element-notation
		// https://developer.mozilla.org/en-US/docs/Web/CSS/element
		var element = function() {
		    this.scanner.skipSC();

		    var id = this.IdSelector();

		    this.scanner.skipSC();

		    return new list().appendData(
		        id
		    );
		};

		// legacy IE function
		// expression '(' raw ')'
		var expression = function() {
		    return new list().appendData(
		        this.Raw(this.scanner.currentToken, 0, 0, false, false)
		    );
		};

		var TYPE$6 = tokenizer$1.TYPE;

		var IDENTIFIER$4 = TYPE$6.Identifier;
		var COMMA$1 = TYPE$6.Comma;
		var SEMICOLON = TYPE$6.Semicolon;
		var HYPHENMINUS$3 = TYPE$6.HyphenMinus;
		var EXCLAMATIONMARK$1 = TYPE$6.ExclamationMark;

		// var '(' ident (',' <value>? )? ')'
		var _var = function() {
		    var children = new list();

		    this.scanner.skipSC();

		    var identStart = this.scanner.tokenStart;

		    this.scanner.eat(HYPHENMINUS$3);
		    if (this.scanner.source.charCodeAt(this.scanner.tokenStart) !== HYPHENMINUS$3) {
		        this.scanner.error('HyphenMinus is expected');
		    }
		    this.scanner.eat(IDENTIFIER$4);

		    children.appendData({
		        type: 'Identifier',
		        loc: this.getLocation(identStart, this.scanner.tokenStart),
		        name: this.scanner.substrToCursor(identStart)
		    });

		    this.scanner.skipSC();

		    if (this.scanner.tokenType === COMMA$1) {
		        children.appendData(this.Operator());
		        children.appendData(this.parseCustomProperty
		            ? this.Value(null)
		            : this.Raw(this.scanner.currentToken, EXCLAMATIONMARK$1, SEMICOLON, false, false)
		        );
		    }

		    return children;
		};

		var value = {
		    getNode: _default,
		    '-moz-element': element,
		    'element': element,
		    'expression': expression,
		    'var': _var
		};

		var scope = {
		    AtruleExpression: atruleExpression,
		    Selector: selector,
		    Value: value
		};

		var fontFace = {
		    parse: {
		        expression: null,
		        block: function() {
		            return this.Block(this.Declaration);
		        }
		    }
		};

		var TYPE$7 = tokenizer$1.TYPE;

		var STRING$3 = TYPE$7.String;
		var IDENTIFIER$5 = TYPE$7.Identifier;
		var URL$3 = TYPE$7.Url;
		var LEFTPARENTHESIS$2 = TYPE$7.LeftParenthesis;

		var _import = {
		    parse: {
		        expression: function() {
		            var children = new list();

		            this.scanner.skipSC();

		            switch (this.scanner.tokenType) {
		                case STRING$3:
		                    children.appendData(this.String());
		                    break;

		                case URL$3:
		                    children.appendData(this.Url());
		                    break;

		                default:
		                    this.scanner.error('String or url() is expected');
		            }

		            if (this.scanner.lookupNonWSType(0) === IDENTIFIER$5 ||
		                this.scanner.lookupNonWSType(0) === LEFTPARENTHESIS$2) {
		                children.appendData(this.WhiteSpace());
		                children.appendData(this.MediaQueryList());
		            }

		            return children;
		        },
		        block: null
		    }
		};

		var media = {
		    parse: {
		        expression: function() {
		            return new list().appendData(
		                this.MediaQueryList()
		            );
		        },
		        block: function() {
		            return this.Block(this.Rule);
		        }
		    }
		};

		var TYPE$8 = tokenizer$1.TYPE;
		var LEFTCURLYBRACKET$1 = TYPE$8.LeftCurlyBracket;

		var page = {
		    parse: {
		        expression: function() {
		            if (this.scanner.lookupNonWSType(0) === LEFTCURLYBRACKET$1) {
		                return null;
		            }

		            return new list().appendData(
		                this.SelectorList()
		            );
		        },
		        block: function() {
		            return this.Block(this.Declaration);
		        }
		    }
		};

		var TYPE$9 = tokenizer$1.TYPE;

		var WHITESPACE$3 = TYPE$9.WhiteSpace;
		var COMMENT$3 = TYPE$9.Comment;
		var IDENTIFIER$6 = TYPE$9.Identifier;
		var FUNCTION$3 = TYPE$9.Function;
		var LEFTPARENTHESIS$3 = TYPE$9.LeftParenthesis;
		var HYPHENMINUS$4 = TYPE$9.HyphenMinus;
		var COLON$1 = TYPE$9.Colon;

		function consumeRaw() {
		    return new list().appendData(
		        this.Raw(this.scanner.currentToken, 0, 0, false, false)
		    );
		}

		function parentheses() {
		    var index = 0;

		    this.scanner.skipSC();

		    // TODO: make it simplier
		    if (this.scanner.tokenType === IDENTIFIER$6) {
		        index = 1;
		    } else if (this.scanner.tokenType === HYPHENMINUS$4 &&
		               this.scanner.lookupType(1) === IDENTIFIER$6) {
		        index = 2;
		    }

		    if (index !== 0 && this.scanner.lookupNonWSType(index) === COLON$1) {
		        return new list().appendData(
		            this.Declaration()
		        );
		    }

		    return readSequence.call(this);
		}

		function readSequence() {
		    var children = new list();
		    var space = null;
		    var child;

		    this.scanner.skipSC();

		    scan:
		    while (!this.scanner.eof) {
		        switch (this.scanner.tokenType) {
		            case WHITESPACE$3:
		                space = this.WhiteSpace();
		                continue;

		            case COMMENT$3:
		                this.scanner.next();
		                continue;

		            case FUNCTION$3:
		                child = this.Function(consumeRaw, this.scope.AtruleExpression);
		                break;

		            case IDENTIFIER$6:
		                child = this.Identifier();
		                break;

		            case LEFTPARENTHESIS$3:
		                child = this.Parentheses(parentheses, this.scope.AtruleExpression);
		                break;

		            default:
		                break scan;
		        }

		        if (space !== null) {
		            children.appendData(space);
		            space = null;
		        }

		        children.appendData(child);
		    }

		    return children;
		}

		var supports = {
		    parse: {
		        expression: function() {
		            var children = readSequence.call(this);

		            if (children.isEmpty()) {
		                this.scanner.error('Condition is expected');
		            }

		            return children;
		        },
		        block: function() {
		            return this.Block(this.Rule);
		        }
		    }
		};

		var atrule = {
		    'font-face': fontFace,
		    'import': _import,
		    'media': media,
		    'page': page,
		    'supports': supports
		};

		var dir = {
		    parse: function() {
		        return new list().appendData(
		            this.Identifier()
		        );
		    }
		};

		var has$1 = {
		    parse: function() {
		        return new list().appendData(
		            this.SelectorList()
		        );
		    }
		};

		var lang = {
		    parse: function() {
		        return new list().appendData(
		            this.Identifier()
		        );
		    }
		};

		var selectorList = {
		    parse: function selectorList() {
		        return new list().appendData(
		            this.SelectorList()
		        );
		    }
		};

		var matches = selectorList;

		var not = selectorList;

		var ALLOW_OF_CLAUSE = true;

		var nthWithOfClause = {
		    parse: function() {
		        return new list().appendData(
		            this.Nth(ALLOW_OF_CLAUSE)
		        );
		    }
		};

		var nthChild = nthWithOfClause;

		var nthLastChild = nthWithOfClause;

		var DISALLOW_OF_CLAUSE = false;

		var nth = {
		    parse: function nth() {
		        return new list().appendData(
		            this.Nth(DISALLOW_OF_CLAUSE)
		        );
		    }
		};

		var nthLastOfType = nth;

		var nthOfType = nth;

		var slotted = {
		    parse: function compoundSelector() {
		        return new list().appendData(
		            this.Selector()
		        );
		    }
		};

		var pseudo = {
		    'dir': dir,
		    'has': has$1,
		    'lang': lang,
		    'matches': matches,
		    'not': not,
		    'nth-child': nthChild,
		    'nth-last-child': nthLastChild,
		    'nth-last-of-type': nthLastOfType,
		    'nth-of-type': nthOfType,
		    'slotted': slotted
		};

		var cmpChar$2 = tokenizer$1.cmpChar;
		var isNumber$2 = tokenizer$1.isNumber;
		var TYPE$a = tokenizer$1.TYPE;

		var IDENTIFIER$7 = TYPE$a.Identifier;
		var NUMBER$4 = TYPE$a.Number;
		var PLUSSIGN$4 = TYPE$a.PlusSign;
		var HYPHENMINUS$5 = TYPE$a.HyphenMinus;
		var N$3 = 110; // 'n'.charCodeAt(0)
		var DISALLOW_SIGN = true;
		var ALLOW_SIGN = false;

		function checkTokenIsInteger(scanner, disallowSign) {
		    var pos = scanner.tokenStart;

		    if (scanner.source.charCodeAt(pos) === PLUSSIGN$4 ||
		        scanner.source.charCodeAt(pos) === HYPHENMINUS$5) {
		        if (disallowSign) {
		            scanner.error();
		        }
		        pos++;
		    }

		    for (; pos < scanner.tokenEnd; pos++) {
		        if (!isNumber$2(scanner.source.charCodeAt(pos))) {
		            scanner.error('Unexpected input', pos);
		        }
		    }
		}

		// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
		var AnPlusB = {
		    name: 'AnPlusB',
		    structure: {
		        a: [String, null],
		        b: [String, null]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var end = start;
		        var prefix = '';
		        var a = null;
		        var b = null;

		        if (this.scanner.tokenType === NUMBER$4 ||
		            this.scanner.tokenType === PLUSSIGN$4) {
		            checkTokenIsInteger(this.scanner, ALLOW_SIGN);
		            prefix = this.scanner.getTokenValue();
		            this.scanner.next();
		            end = this.scanner.tokenStart;
		        }

		        if (this.scanner.tokenType === IDENTIFIER$7) {
		            var bStart = this.scanner.tokenStart;

		            if (cmpChar$2(this.scanner.source, bStart, HYPHENMINUS$5)) {
		                if (prefix === '') {
		                    prefix = '-';
		                    bStart++;
		                } else {
		                    this.scanner.error('Unexpected hyphen minus');
		                }
		            }

		            if (!cmpChar$2(this.scanner.source, bStart, N$3)) {
		                this.scanner.error();
		            }

		            a = prefix === ''  ? '1'  :
		                prefix === '+' ? '+1' :
		                prefix === '-' ? '-1' :
		                prefix;

		            var len = this.scanner.tokenEnd - bStart;
		            if (len > 1) {
		                // ..n-..
		                if (this.scanner.source.charCodeAt(bStart + 1) !== HYPHENMINUS$5) {
		                    this.scanner.error('Unexpected input', bStart + 1);
		                }

		                if (len > 2) {
		                    // ..n-{number}..
		                    this.scanner.tokenStart = bStart + 2;
		                } else {
		                    // ..n- {number}
		                    this.scanner.next();
		                    this.scanner.skipSC();
		                }

		                checkTokenIsInteger(this.scanner, DISALLOW_SIGN);
		                b = '-' + this.scanner.getTokenValue();
		                this.scanner.next();
		                end = this.scanner.tokenStart;
		            } else {
		                prefix = '';
		                this.scanner.next();
		                end = this.scanner.tokenStart;
		                this.scanner.skipSC();

		                if (this.scanner.tokenType === HYPHENMINUS$5 ||
		                    this.scanner.tokenType === PLUSSIGN$4) {
		                    prefix = this.scanner.getTokenValue();
		                    this.scanner.next();
		                    this.scanner.skipSC();
		                }

		                if (this.scanner.tokenType === NUMBER$4) {
		                    checkTokenIsInteger(this.scanner, prefix !== '');

		                    if (!isNumber$2(this.scanner.source.charCodeAt(this.scanner.tokenStart))) {
		                        prefix = this.scanner.source.charAt(this.scanner.tokenStart);
		                        this.scanner.tokenStart++;
		                    }

		                    if (prefix === '') {
		                        // should be an operator before number
		                        this.scanner.error();
		                    } else if (prefix === '+') {
		                        // plus is using by default
		                        prefix = '';
		                    }

		                    b = prefix + this.scanner.getTokenValue();

		                    this.scanner.next();
		                    end = this.scanner.tokenStart;
		                } else {
		                    if (prefix) {
		                        this.scanner.eat(NUMBER$4);
		                    }
		                }
		            }
		        } else {
		            if (prefix === '' || prefix === '+') { // no number
		                this.scanner.error(
		                    'Number or identifier is expected',
		                    this.scanner.tokenStart + (
		                        this.scanner.tokenType === PLUSSIGN$4 ||
		                        this.scanner.tokenType === HYPHENMINUS$5
		                    )
		                );
		            }

		            b = prefix;
		        }

		        return {
		            type: 'AnPlusB',
		            loc: this.getLocation(start, end),
		            a: a,
		            b: b
		        };
		    },
		    generate: function(processChunk, node) {
		        var a = node.a !== null && node.a !== undefined;
		        var b = node.b !== null && node.b !== undefined;

		        if (a) {
		            processChunk(
		                node.a === '+1' ? '+n' :
		                node.a ===  '1' ?  'n' :
		                node.a === '-1' ? '-n' :
		                node.a + 'n'
		            );

		            if (b) {
		                b = String(node.b);
		                if (b.charAt(0) === '-' || b.charAt(0) === '+') {
		                    processChunk(b.charAt(0));
		                    processChunk(b.substr(1));
		                } else {
		                    processChunk('+');
		                    processChunk(b);
		                }
		            }
		        } else {
		            processChunk(String(node.b));
		        }
		    }
		};

		var TYPE$b = tokenizer$1.TYPE;

		var ATRULE$2 = TYPE$b.Atrule;
		var SEMICOLON$1 = TYPE$b.Semicolon;
		var LEFTCURLYBRACKET$2 = TYPE$b.LeftCurlyBracket;
		var RIGHTCURLYBRACKET$1 = TYPE$b.RightCurlyBracket;

		function isBlockAtrule() {
		    for (var offset = 1, type; type = this.scanner.lookupType(offset); offset++) {
		        if (type === RIGHTCURLYBRACKET$1) {
		            return true;
		        }

		        if (type === LEFTCURLYBRACKET$2 ||
		            type === ATRULE$2) {
		            return false;
		        }
		    }

		    this.scanner.skip(offset);
		    this.scanner.eat(RIGHTCURLYBRACKET$1);
		}

		var Atrule = {
		    name: 'Atrule',
		    structure: {
		        name: String,
		        expression: ['AtruleExpression', null],
		        block: ['Block', null]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var name;
		        var nameLowerCase;
		        var expression = null;
		        var block = null;

		        this.scanner.eat(ATRULE$2);

		        name = this.scanner.substrToCursor(start + 1);
		        nameLowerCase = name.toLowerCase();
		        this.scanner.skipSC();

		        expression = this.AtruleExpression(name);

		        // turn empty AtruleExpression into null
		        if (expression.children.head === null) {
		            expression = null;
		        }

		        this.scanner.skipSC();

		        if (this.atrule.hasOwnProperty(nameLowerCase)) {
		            if (typeof this.atrule[nameLowerCase].block === 'function') {
		                if (this.scanner.tokenType !== LEFTCURLYBRACKET$2) {
		                    // FIXME: make tolerant
		                    this.scanner.error('Curly bracket is expected');
		                }

		                block = this.atrule[nameLowerCase].block.call(this);
		            } else {
		                if (!this.tolerant || !this.scanner.eof) {
		                    this.scanner.eat(SEMICOLON$1);
		                }
		            }
		        } else {
		            switch (this.scanner.tokenType) {
		                case SEMICOLON$1:
		                    this.scanner.next();
		                    break;

		                case LEFTCURLYBRACKET$2:
		                    // TODO: should consume block content as Raw?
		                    block = this.Block(isBlockAtrule.call(this) ? this.Declaration : this.Rule);
		                    break;

		                default:
		                    if (!this.tolerant) {
		                        this.scanner.error('Semicolon or block is expected');
		                    }
		            }
		        }

		        return {
		            type: 'Atrule',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: name,
		            expression: expression,
		            block: block
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('@');
		        processChunk(node.name);

		        if (node.expression !== null) {
		            processChunk(' ');
		            this.generate(processChunk, node.expression);
		        }

		        if (node.block) {
		            this.generate(processChunk, node.block);
		        } else {
		            processChunk(';');
		        }
		    },
		    walkContext: 'atrule'
		};

		var TYPE$c = tokenizer$1.TYPE;
		var SEMICOLON$2 = TYPE$c.Semicolon;
		var LEFTCURLYBRACKET$3 = TYPE$c.LeftCurlyBracket;

		function consumeRaw$1(startToken) {
		    return new list().appendData(
		        this.Raw(startToken, SEMICOLON$2, LEFTCURLYBRACKET$3, false, true)
		    );
		}

		function consumeDefaultSequence() {
		    return this.readSequence(this.scope.AtruleExpression);
		}

		var AtruleExpression = {
		    name: 'AtruleExpression',
		    structure: {
		        children: [[]]
		    },
		    parse: function(name) {
		        var children = null;
		        var startToken = this.scanner.currentToken;

		        if (name !== null) {
		            name = name.toLowerCase();
		        }

		        if (this.parseAtruleExpression) {
		            // custom consumer
		            if (this.atrule.hasOwnProperty(name)) {
		                if (typeof this.atrule[name].expression === 'function') {
		                    children = this.tolerantParse(this.atrule[name].expression, consumeRaw$1);
		                }
		            } else {
		                // default consumer
		                this.scanner.skipSC();
		                children = this.tolerantParse(consumeDefaultSequence, consumeRaw$1);
		            }

		            if (this.tolerant) {
		                if (this.scanner.eof || (this.scanner.tokenType !== SEMICOLON$2 && this.scanner.tokenType !== LEFTCURLYBRACKET$3)) {
		                    children = consumeRaw$1.call(this, startToken);
		                }
		            }
		        } else {
		            children = consumeRaw$1.call(this, startToken);
		        }

		        if (children === null) {
		            children = new list();
		        }

		        return {
		            type: 'AtruleExpression',
		            loc: this.getLocationFromList(children),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.each(processChunk, node);
		    },
		    walkContext: 'atruleExpression'
		};

		var TYPE$d = tokenizer$1.TYPE;

		var IDENTIFIER$8 = TYPE$d.Identifier;
		var STRING$4 = TYPE$d.String;
		var DOLLARSIGN = TYPE$d.DollarSign;
		var ASTERISK$2 = TYPE$d.Asterisk;
		var COLON$2 = TYPE$d.Colon;
		var EQUALSSIGN = TYPE$d.EqualsSign;
		var LEFTSQUAREBRACKET$3 = TYPE$d.LeftSquareBracket;
		var RIGHTSQUAREBRACKET$1 = TYPE$d.RightSquareBracket;
		var CIRCUMFLEXACCENT = TYPE$d.CircumflexAccent;
		var VERTICALLINE$1 = TYPE$d.VerticalLine;
		var TILDE$1 = TYPE$d.Tilde;

		function getAttributeName() {
		    if (this.scanner.eof) {
		        this.scanner.error('Unexpected end of input');
		    }

		    var start = this.scanner.tokenStart;
		    var expectIdentifier = false;
		    var checkColon = true;

		    if (this.scanner.tokenType === ASTERISK$2) {
		        expectIdentifier = true;
		        checkColon = false;
		        this.scanner.next();
		    } else if (this.scanner.tokenType !== VERTICALLINE$1) {
		        this.scanner.eat(IDENTIFIER$8);
		    }

		    if (this.scanner.tokenType === VERTICALLINE$1) {
		        if (this.scanner.lookupType(1) !== EQUALSSIGN) {
		            this.scanner.next();
		            this.scanner.eat(IDENTIFIER$8);
		        } else if (expectIdentifier) {
		            this.scanner.error('Identifier is expected', this.scanner.tokenEnd);
		        }
		    } else if (expectIdentifier) {
		        this.scanner.error('Vertical line is expected');
		    }

		    if (checkColon && this.scanner.tokenType === COLON$2) {
		        this.scanner.next();
		        this.scanner.eat(IDENTIFIER$8);
		    }

		    return {
		        type: 'Identifier',
		        loc: this.getLocation(start, this.scanner.tokenStart),
		        name: this.scanner.substrToCursor(start)
		    };
		}

		function getOperator() {
		    var start = this.scanner.tokenStart;
		    var tokenType = this.scanner.tokenType;

		    if (tokenType !== EQUALSSIGN &&        // =
		        tokenType !== TILDE$1 &&             // ~=
		        tokenType !== CIRCUMFLEXACCENT &&  // ^=
		        tokenType !== DOLLARSIGN &&        // $=
		        tokenType !== ASTERISK$2 &&          // *=
		        tokenType !== VERTICALLINE$1         // |=
		    ) {
		        this.scanner.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected');
		    }

		    if (tokenType === EQUALSSIGN) {
		        this.scanner.next();
		    } else {
		        this.scanner.next();
		        this.scanner.eat(EQUALSSIGN);
		    }

		    return this.scanner.substrToCursor(start);
		}

		// '[' S* attrib_name ']'
		// '[' S* attrib_name S* attrib_matcher S* [ IDENT | STRING ] S* attrib_flags? S* ']'
		var AttributeSelector = {
		    name: 'AttributeSelector',
		    structure: {
		        name: 'Identifier',
		        matcher: [String, null],
		        value: ['String', 'Identifier', null],
		        flags: [String, null]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var name;
		        var matcher = null;
		        var value = null;
		        var flags = null;

		        this.scanner.eat(LEFTSQUAREBRACKET$3);
		        this.scanner.skipSC();

		        name = getAttributeName.call(this);
		        this.scanner.skipSC();

		        if (this.scanner.tokenType !== RIGHTSQUAREBRACKET$1) {
		            // avoid case `[name i]`
		            if (this.scanner.tokenType !== IDENTIFIER$8) {
		                matcher = getOperator.call(this);

		                this.scanner.skipSC();

		                value = this.scanner.tokenType === STRING$4
		                    ? this.String()
		                    : this.Identifier();

		                this.scanner.skipSC();
		            }

		            // attribute flags
		            if (this.scanner.tokenType === IDENTIFIER$8) {
		                flags = this.scanner.getTokenValue();
		                this.scanner.next();

		                this.scanner.skipSC();
		            }
		        }

		        this.scanner.eat(RIGHTSQUAREBRACKET$1);

		        return {
		            type: 'AttributeSelector',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: name,
		            matcher: matcher,
		            value: value,
		            flags: flags
		        };
		    },
		    generate: function(processChunk, node) {
		        var flagsPrefix = ' ';

		        processChunk('[');
		        this.generate(processChunk, node.name);

		        if (node.matcher !== null) {
		            processChunk(node.matcher);

		            if (node.value !== null) {
		                this.generate(processChunk, node.value);

		                // space between string and flags is not required
		                if (node.value.type === 'String') {
		                    flagsPrefix = '';
		                }
		            }
		        }

		        if (node.flags !== null) {
		            processChunk(flagsPrefix);
		            processChunk(node.flags);
		        }

		        processChunk(']');
		    }
		};

		var TYPE$e = tokenizer$1.TYPE;

		var WHITESPACE$4 = TYPE$e.WhiteSpace;
		var COMMENT$4 = TYPE$e.Comment;
		var SEMICOLON$3 = TYPE$e.Semicolon;
		var ATRULE$3 = TYPE$e.Atrule;
		var LEFTCURLYBRACKET$4 = TYPE$e.LeftCurlyBracket;
		var RIGHTCURLYBRACKET$2 = TYPE$e.RightCurlyBracket;

		function consumeRaw$2(startToken) {
		    return this.Raw(startToken, 0, SEMICOLON$3, true, true);
		}

		var Block = {
		    name: 'Block',
		    structure: {
		        children: [['Atrule', 'Rule', 'Declaration']]
		    },
		    parse: function(defaultConsumer) {
		        if (!defaultConsumer) {
		            defaultConsumer = this.Declaration;
		        }

		        var start = this.scanner.tokenStart;
		        var children = new list();

		        this.scanner.eat(LEFTCURLYBRACKET$4);

		        scan:
		        while (!this.scanner.eof) {
		            switch (this.scanner.tokenType) {
		                case RIGHTCURLYBRACKET$2:
		                    break scan;

		                case WHITESPACE$4:
		                case COMMENT$4:
		                case SEMICOLON$3:
		                    this.scanner.next();
		                    break;

		                case ATRULE$3:
		                    children.appendData(this.tolerantParse(this.Atrule, consumeRaw$2));
		                    break;

		                default:
		                    children.appendData(this.tolerantParse(defaultConsumer, consumeRaw$2));
		            }
		        }

		        if (!this.tolerant || !this.scanner.eof) {
		            this.scanner.eat(RIGHTCURLYBRACKET$2);
		        }

		        return {
		            type: 'Block',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('{');
		        this.each(processChunk, node);
		        processChunk('}');
		    },
		    walkContext: 'block'
		};

		var TYPE$f = tokenizer$1.TYPE;
		var LEFTSQUAREBRACKET$4 = TYPE$f.LeftSquareBracket;
		var RIGHTSQUAREBRACKET$2 = TYPE$f.RightSquareBracket;

		// currently only Grid Layout uses square brackets, but left it universal
		// https://drafts.csswg.org/css-grid/#track-sizing
		// [ ident* ]
		var Brackets = {
		    name: 'Brackets',
		    structure: {
		        children: [[]]
		    },
		    parse: function(readSequence, recognizer) {
		        var start = this.scanner.tokenStart;
		        var children = null;

		        this.scanner.eat(LEFTSQUAREBRACKET$4);
		        children = readSequence.call(this, recognizer);
		        this.scanner.eat(RIGHTSQUAREBRACKET$2);

		        return {
		            type: 'Brackets',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('[');
		        this.each(processChunk, node);
		        processChunk(']');
		    }
		};

		var CDC$2 = tokenizer$1.TYPE.CDC;

		var CDC_1 = {
		    name: 'CDC',
		    structure: [],
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        this.scanner.eat(CDC$2); // -->

		        return {
		            type: 'CDC',
		            loc: this.getLocation(start, this.scanner.tokenStart)
		        };
		    },
		    generate: function(processChunk) {
		        processChunk('-->');
		    }
		};

		var CDO$2 = tokenizer$1.TYPE.CDO;

		var CDO_1 = {
		    name: 'CDO',
		    structure: [],
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        this.scanner.eat(CDO$2); // <!--

		        return {
		            type: 'CDO',
		            loc: this.getLocation(start, this.scanner.tokenStart)
		        };
		    },
		    generate: function(processChunk) {
		        processChunk('<!--');
		    }
		};

		var TYPE$g = tokenizer$1.TYPE;
		var IDENTIFIER$9 = TYPE$g.Identifier;
		var FULLSTOP$3 = TYPE$g.FullStop;

		// '.' ident
		var ClassSelector = {
		    name: 'ClassSelector',
		    structure: {
		        name: String
		    },
		    parse: function() {
		        this.scanner.eat(FULLSTOP$3);

		        return {
		            type: 'ClassSelector',
		            loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
		            name: this.scanner.consume(IDENTIFIER$9)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('.');
		        processChunk(node.name);
		    }
		};

		var TYPE$h = tokenizer$1.TYPE;

		var PLUSSIGN$5 = TYPE$h.PlusSign;
		var SOLIDUS$2 = TYPE$h.Solidus;
		var GREATERTHANSIGN$2 = TYPE$h.GreaterThanSign;
		var TILDE$2 = TYPE$h.Tilde;

		// + | > | ~ | /deep/
		var Combinator = {
		    name: 'Combinator',
		    structure: {
		        name: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        switch (this.scanner.tokenType) {
		            case GREATERTHANSIGN$2:
		            case PLUSSIGN$5:
		            case TILDE$2:
		                this.scanner.next();
		                break;

		            case SOLIDUS$2:
		                this.scanner.next();
		                this.scanner.expectIdentifier('deep');
		                this.scanner.eat(SOLIDUS$2);
		                break;

		            default:
		                this.scanner.error('Combinator is expected');
		        }

		        return {
		            type: 'Combinator',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: this.scanner.substrToCursor(start)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.name);
		    }
		};

		var TYPE$i = tokenizer$1.TYPE;

		var ASTERISK$3 = TYPE$i.Asterisk;
		var SOLIDUS$3 = TYPE$i.Solidus;

		// '/*' .* '*/'
		var Comment = {
		    name: 'Comment',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var end = this.scanner.tokenEnd;

		        if ((end - start + 2) >= 2 &&
		            this.scanner.source.charCodeAt(end - 2) === ASTERISK$3 &&
		            this.scanner.source.charCodeAt(end - 1) === SOLIDUS$3) {
		            end -= 2;
		        }

		        this.scanner.next();

		        return {
		            type: 'Comment',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: this.scanner.source.substring(start + 2, end)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('/*');
		        processChunk(node.value);
		        processChunk('*/');
		    }
		};

		var TYPE$j = tokenizer$1.TYPE;

		var IDENTIFIER$a = TYPE$j.Identifier;
		var COLON$3 = TYPE$j.Colon;
		var EXCLAMATIONMARK$2 = TYPE$j.ExclamationMark;
		var SOLIDUS$4 = TYPE$j.Solidus;
		var ASTERISK$4 = TYPE$j.Asterisk;
		var DOLLARSIGN$1 = TYPE$j.DollarSign;
		var HYPHENMINUS$6 = TYPE$j.HyphenMinus;
		var SEMICOLON$4 = TYPE$j.Semicolon;
		var RIGHTCURLYBRACKET$3 = TYPE$j.RightCurlyBracket;
		var RIGHTPARENTHESIS$1 = TYPE$j.RightParenthesis;
		var PLUSSIGN$6 = TYPE$j.PlusSign;
		var NUMBERSIGN$2 = TYPE$j.NumberSign;

		var Declaration = {
		    name: 'Declaration',
		    structure: {
		        important: [Boolean, String],
		        property: String,
		        value: ['Value', 'Raw']
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var property = readProperty.call(this);
		        var important = false;
		        var value;

		        this.scanner.skipSC();
		        this.scanner.eat(COLON$3);

		        if (isCustomProperty(property) ? this.parseCustomProperty : this.parseValue) {
		            value = this.Value(property);
		        } else {
		            value = this.Raw(this.scanner.currentToken, EXCLAMATIONMARK$2, SEMICOLON$4, false, false);
		        }

		        if (this.scanner.tokenType === EXCLAMATIONMARK$2) {
		            important = getImportant(this.scanner);
		            this.scanner.skipSC();
		        }

		        // TODO: include or not to include semicolon to range?
		        // if (this.scanner.tokenType === SEMICOLON) {
		        //     this.scanner.next();
		        // }

		        if (!this.scanner.eof &&
		            this.scanner.tokenType !== SEMICOLON$4 &&
		            this.scanner.tokenType !== RIGHTPARENTHESIS$1 &&
		            this.scanner.tokenType !== RIGHTCURLYBRACKET$3) {
		            this.scanner.error();
		        }

		        return {
		            type: 'Declaration',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            important: important,
		            property: property,
		            value: value
		        };
		    },
		    generate: function(processChunk, node, item) {
		        processChunk(node.property);
		        processChunk(':');
		        this.generate(processChunk, node.value);

		        if (node.important) {
		            processChunk(node.important === true ? '!important' : '!' + node.important);
		        }

		        if (item && item.next) {
		            processChunk(';');
		        }
		    },
		    walkContext: 'declaration'
		};

		function isCustomProperty(name) {
		    return name.length >= 2 &&
		           name.charCodeAt(0) === HYPHENMINUS$6 &&
		           name.charCodeAt(1) === HYPHENMINUS$6;
		}

		function readProperty() {
		    var start = this.scanner.tokenStart;
		    var prefix = 0;

		    // hacks
		    switch (this.scanner.tokenType) {
		        case ASTERISK$4:
		        case DOLLARSIGN$1:
		        case PLUSSIGN$6:
		        case NUMBERSIGN$2:
		            prefix = 1;
		            break;

		        // TODO: not sure we should support this hack
		        case SOLIDUS$4:
		            prefix = this.scanner.lookupType(1) === SOLIDUS$4 ? 2 : 1;
		            break;
		    }

		    if (this.scanner.lookupType(prefix) === HYPHENMINUS$6) {
		        prefix++;
		    }

		    if (prefix) {
		        this.scanner.skip(prefix);
		    }

		    this.scanner.eat(IDENTIFIER$a);

		    return this.scanner.substrToCursor(start);
		}

		// ! ws* important
		function getImportant(scanner) {
		    scanner.eat(EXCLAMATIONMARK$2);
		    scanner.skipSC();

		    var important = scanner.consume(IDENTIFIER$a);

		    // store original value in case it differ from `important`
		    // for better original source restoring and hacks like `!ie` support
		    return important === 'important' ? true : important;
		}

		var TYPE$k = tokenizer$1.TYPE;

		var WHITESPACE$5 = TYPE$k.WhiteSpace;
		var COMMENT$5 = TYPE$k.Comment;
		var SEMICOLON$5 = TYPE$k.Semicolon;

		function consumeRaw$3(startToken) {
		    return this.Raw(startToken, 0, SEMICOLON$5, true, true);
		}

		var DeclarationList = {
		    name: 'DeclarationList',
		    structure: {
		        children: [['Declaration']]
		    },
		    parse: function() {
		        var children = new list();

		        scan:
		        while (!this.scanner.eof) {
		            switch (this.scanner.tokenType) {
		                case WHITESPACE$5:
		                case COMMENT$5:
		                case SEMICOLON$5:
		                    this.scanner.next();
		                    break;

		                default:
		                    children.appendData(this.tolerantParse(this.Declaration, consumeRaw$3));
		            }
		        }

		        return {
		            type: 'DeclarationList',
		            loc: this.getLocationFromList(children),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.each(processChunk, node);
		    }
		};

		var NUMBER$5 = tokenizer$1.TYPE.Number;

		// special reader for units to avoid adjoined IE hacks (i.e. '1px\9')
		function readUnit(scanner) {
		    var unit = scanner.getTokenValue();
		    var backSlashPos = unit.indexOf('\\');

		    if (backSlashPos > 0) {
		        // patch token offset
		        scanner.tokenStart += backSlashPos;

		        // return part before backslash
		        return unit.substring(0, backSlashPos);
		    }

		    // no backslash in unit name
		    scanner.next();

		    return unit;
		}

		// number ident
		var Dimension = {
		    name: 'Dimension',
		    structure: {
		        value: String,
		        unit: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var value = this.scanner.consume(NUMBER$5);
		        var unit = readUnit(this.scanner);

		        return {
		            type: 'Dimension',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: value,
		            unit: unit
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		        processChunk(node.unit);
		    }
		};

		var TYPE$l = tokenizer$1.TYPE;
		var RIGHTPARENTHESIS$2 = TYPE$l.RightParenthesis;

		// <function-token> <sequence> ')'
		var _Function = {
		    name: 'Function',
		    structure: {
		        name: String,
		        children: [[]]
		    },
		    parse: function(readSequence, recognizer) {
		        var start = this.scanner.tokenStart;
		        var name = this.scanner.consumeFunctionName();
		        var nameLowerCase = name.toLowerCase();
		        var children;

		        children = recognizer.hasOwnProperty(nameLowerCase)
		            ? recognizer[nameLowerCase].call(this, recognizer)
		            : readSequence.call(this, recognizer);

		        this.scanner.eat(RIGHTPARENTHESIS$2);

		        return {
		            type: 'Function',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: name,
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.name);
		        processChunk('(');
		        this.each(processChunk, node);
		        processChunk(')');
		    },
		    walkContext: 'function'
		};

		var isHex$1 = tokenizer$1.isHex;
		var TYPE$m = tokenizer$1.TYPE;

		var IDENTIFIER$b = TYPE$m.Identifier;
		var NUMBER$6 = TYPE$m.Number;
		var NUMBERSIGN$3 = TYPE$m.NumberSign;

		function consumeHexSequence(scanner, required) {
		    if (!isHex$1(scanner.source.charCodeAt(scanner.tokenStart))) {
		        if (required) {
		            scanner.error('Unexpected input', scanner.tokenStart);
		        } else {
		            return;
		        }
		    }

		    for (var pos = scanner.tokenStart + 1; pos < scanner.tokenEnd; pos++) {
		        var code = scanner.source.charCodeAt(pos);

		        // break on non-hex char
		        if (!isHex$1(code)) {
		            // break token, exclude symbol
		            scanner.tokenStart = pos;
		            return;
		        }
		    }

		    // token is full hex sequence, go to next token
		    scanner.next();
		}

		// # ident
		var HexColor = {
		    name: 'HexColor',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        this.scanner.eat(NUMBERSIGN$3);

		        scan:
		        switch (this.scanner.tokenType) {
		            case NUMBER$6:
		                consumeHexSequence(this.scanner, true);

		                // if token is identifier then number consists of hex only,
		                // try to add identifier to result
		                if (this.scanner.tokenType === IDENTIFIER$b) {
		                    consumeHexSequence(this.scanner, false);
		                }

		                break;

		            case IDENTIFIER$b:
		                consumeHexSequence(this.scanner, true);
		                break;

		            default:
		                this.scanner.error('Number or identifier is expected');
		        }

		        return {
		            type: 'HexColor',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: this.scanner.substrToCursor(start + 1) // skip #
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('#');
		        processChunk(node.value);
		    }
		};

		var TYPE$n = tokenizer$1.TYPE;
		var IDENTIFIER$c = TYPE$n.Identifier;

		var Identifier = {
		    name: 'Identifier',
		    structure: {
		        name: String
		    },
		    parse: function() {
		        return {
		            type: 'Identifier',
		            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
		            name: this.scanner.consume(IDENTIFIER$c)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.name);
		    }
		};

		var TYPE$o = tokenizer$1.TYPE;
		var IDENTIFIER$d = TYPE$o.Identifier;
		var NUMBERSIGN$4 = TYPE$o.NumberSign;

		// '#' ident
		var IdSelector = {
		    name: 'IdSelector',
		    structure: {
		        name: String
		    },
		    parse: function() {
		        this.scanner.eat(NUMBERSIGN$4);

		        return {
		            type: 'IdSelector',
		            loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
		            name: this.scanner.consume(IDENTIFIER$d)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('#');
		        processChunk(node.name);
		    }
		};

		var TYPE$p = tokenizer$1.TYPE;

		var IDENTIFIER$e = TYPE$p.Identifier;
		var NUMBER$7 = TYPE$p.Number;
		var LEFTPARENTHESIS$4 = TYPE$p.LeftParenthesis;
		var RIGHTPARENTHESIS$3 = TYPE$p.RightParenthesis;
		var COLON$4 = TYPE$p.Colon;
		var SOLIDUS$5 = TYPE$p.Solidus;

		var MediaFeature = {
		    name: 'MediaFeature',
		    structure: {
		        name: String,
		        value: ['Identifier', 'Number', 'Dimension', 'Ratio', null]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var name;
		        var value = null;

		        this.scanner.eat(LEFTPARENTHESIS$4);
		        this.scanner.skipSC();

		        name = this.scanner.consume(IDENTIFIER$e);
		        this.scanner.skipSC();

		        if (this.scanner.tokenType !== RIGHTPARENTHESIS$3) {
		            this.scanner.eat(COLON$4);
		            this.scanner.skipSC();

		            switch (this.scanner.tokenType) {
		                case NUMBER$7:
		                    if (this.scanner.lookupType(1) === IDENTIFIER$e) {
		                        value = this.Dimension();
		                    } else if (this.scanner.lookupNonWSType(1) === SOLIDUS$5) {
		                        value = this.Ratio();
		                    } else {
		                        value = this.Number();
		                    }

		                    break;

		                case IDENTIFIER$e:
		                    value = this.Identifier();

		                    break;

		                default:
		                    this.scanner.error('Number, dimension, ratio or identifier is expected');
		            }

		            this.scanner.skipSC();
		        }

		        this.scanner.eat(RIGHTPARENTHESIS$3);

		        return {
		            type: 'MediaFeature',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: name,
		            value: value
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('(');
		        processChunk(node.name);
		        if (node.value !== null) {
		            processChunk(':');
		            this.generate(processChunk, node.value);
		        }
		        processChunk(')');
		    }
		};

		var TYPE$q = tokenizer$1.TYPE;

		var WHITESPACE$6 = TYPE$q.WhiteSpace;
		var COMMENT$6 = TYPE$q.Comment;
		var IDENTIFIER$f = TYPE$q.Identifier;
		var LEFTPARENTHESIS$5 = TYPE$q.LeftParenthesis;

		var MediaQuery = {
		    name: 'MediaQuery',
		    structure: {
		        children: [['Identifier', 'MediaFeature', 'WhiteSpace']]
		    },
		    parse: function() {
		        this.scanner.skipSC();

		        var children = new list();
		        var child = null;
		        var space = null;

		        scan:
		        while (!this.scanner.eof) {
		            switch (this.scanner.tokenType) {
		                case COMMENT$6:
		                    this.scanner.next();
		                    continue;

		                case WHITESPACE$6:
		                    space = this.WhiteSpace();
		                    continue;

		                case IDENTIFIER$f:
		                    child = this.Identifier();
		                    break;

		                case LEFTPARENTHESIS$5:
		                    child = this.MediaFeature();
		                    break;

		                default:
		                    break scan;
		            }

		            if (space !== null) {
		                children.appendData(space);
		                space = null;
		            }

		            children.appendData(child);
		        }

		        if (child === null) {
		            this.scanner.error('Identifier or parenthesis is expected');
		        }

		        return {
		            type: 'MediaQuery',
		            loc: this.getLocationFromList(children),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.each(processChunk, node);
		    }
		};

		var COMMA$2 = tokenizer$1.TYPE.Comma;

		var MediaQueryList = {
		    name: 'MediaQueryList',
		    structure: {
		        children: [['MediaQuery']]
		    },
		    parse: function(relative) {
		        var children = new list();

		        this.scanner.skipSC();

		        while (!this.scanner.eof) {
		            children.appendData(this.MediaQuery(relative));

		            if (this.scanner.tokenType !== COMMA$2) {
		                break;
		            }

		            this.scanner.next();
		        }

		        return {
		            type: 'MediaQueryList',
		            loc: this.getLocationFromList(children),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.eachComma(processChunk, node);
		    }
		};

		// https://drafts.csswg.org/css-syntax-3/#the-anb-type
		var Nth = {
		    name: 'Nth',
		    structure: {
		        nth: ['AnPlusB', 'Identifier'],
		        selector: ['SelectorList', null]
		    },
		    parse: function(allowOfClause) {
		        this.scanner.skipSC();

		        var start = this.scanner.tokenStart;
		        var end = start;
		        var selector = null;
		        var query;

		        if (this.scanner.lookupValue(0, 'odd') || this.scanner.lookupValue(0, 'even')) {
		            query = this.Identifier();
		        } else {
		            query = this.AnPlusB();
		        }

		        this.scanner.skipSC();

		        if (allowOfClause && this.scanner.lookupValue(0, 'of')) {
		            this.scanner.next();

		            selector = this.SelectorList();

		            if (this.needPositions) {
		                end = selector.children.last().loc.end.offset;
		            }
		        } else {
		            if (this.needPositions) {
		                end = query.loc.end.offset;
		            }
		        }

		        return {
		            type: 'Nth',
		            loc: this.getLocation(start, end),
		            nth: query,
		            selector: selector
		        };
		    },
		    generate: function(processChunk, node) {
		        this.generate(processChunk, node.nth);
		        if (node.selector !== null) {
		            processChunk(' of ');
		            this.generate(processChunk, node.selector);
		        }
		    }
		};

		var NUMBER$8 = tokenizer$1.TYPE.Number;

		var _Number = {
		    name: 'Number',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        return {
		            type: 'Number',
		            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
		            value: this.scanner.consume(NUMBER$8)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		    }
		};

		// '/' | '*' | ',' | ':' | '+' | '-'
		var Operator = {
		    name: 'Operator',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        this.scanner.next();

		        return {
		            type: 'Operator',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: this.scanner.substrToCursor(start)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		    }
		};

		var TYPE$r = tokenizer$1.TYPE;
		var LEFTPARENTHESIS$6 = TYPE$r.LeftParenthesis;
		var RIGHTPARENTHESIS$4 = TYPE$r.RightParenthesis;

		var Parentheses = {
		    name: 'Parentheses',
		    structure: {
		        children: [[]]
		    },
		    parse: function(readSequence, recognizer) {
		        var start = this.scanner.tokenStart;
		        var children = null;

		        this.scanner.eat(LEFTPARENTHESIS$6);
		        children = readSequence.call(this, recognizer);
		        this.scanner.eat(RIGHTPARENTHESIS$4);

		        return {
		            type: 'Parentheses',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('(');
		        this.each(processChunk, node);
		        processChunk(')');
		    }
		};

		var TYPE$s = tokenizer$1.TYPE;

		var NUMBER$9 = TYPE$s.Number;
		var PERCENTSIGN$1 = TYPE$s.PercentSign;

		var Percentage = {
		    name: 'Percentage',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var number = this.scanner.consume(NUMBER$9);

		        this.scanner.eat(PERCENTSIGN$1);

		        return {
		            type: 'Percentage',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: number
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		        processChunk('%');
		    }
		};

		var TYPE$t = tokenizer$1.TYPE;

		var IDENTIFIER$g = TYPE$t.Identifier;
		var FUNCTION$4 = TYPE$t.Function;
		var COLON$5 = TYPE$t.Colon;
		var RIGHTPARENTHESIS$5 = TYPE$t.RightParenthesis;

		// : ident [ '(' .. ')' ]?
		var PseudoClassSelector = {
		    name: 'PseudoClassSelector',
		    structure: {
		        name: String,
		        children: [['Raw'], null]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var children = null;
		        var name;
		        var nameLowerCase;

		        this.scanner.eat(COLON$5);

		        if (this.scanner.tokenType === FUNCTION$4) {
		            name = this.scanner.consumeFunctionName();
		            nameLowerCase = name.toLowerCase();

		            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
		                this.scanner.skipSC();
		                children = this.pseudo[nameLowerCase].call(this);
		                this.scanner.skipSC();
		            } else {
		                children = new list().appendData(
		                    this.Raw(this.scanner.currentToken, 0, 0, false, false)
		                );
		            }

		            this.scanner.eat(RIGHTPARENTHESIS$5);
		        } else {
		            name = this.scanner.consume(IDENTIFIER$g);
		        }

		        return {
		            type: 'PseudoClassSelector',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: name,
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(':');
		        processChunk(node.name);

		        if (node.children !== null) {
		            processChunk('(');
		            this.each(processChunk, node);
		            processChunk(')');
		        }
		    },
		    walkContext: 'function'
		};

		var TYPE$u = tokenizer$1.TYPE;

		var IDENTIFIER$h = TYPE$u.Identifier;
		var FUNCTION$5 = TYPE$u.Function;
		var COLON$6 = TYPE$u.Colon;
		var RIGHTPARENTHESIS$6 = TYPE$u.RightParenthesis;

		// :: ident [ '(' .. ')' ]?
		var PseudoElementSelector = {
		    name: 'PseudoElementSelector',
		    structure: {
		        name: String,
		        children: [['Raw'], null]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var children = null;
		        var name;
		        var nameLowerCase;

		        this.scanner.eat(COLON$6);
		        this.scanner.eat(COLON$6);

		        if (this.scanner.tokenType === FUNCTION$5) {
		            name = this.scanner.consumeFunctionName();
		            nameLowerCase = name.toLowerCase();

		            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
		                this.scanner.skipSC();
		                children = this.pseudo[nameLowerCase].call(this);
		                this.scanner.skipSC();
		            } else {
		                children = new list().appendData(
		                    this.Raw(this.scanner.currentToken, 0, 0, false, false)
		                );
		            }

		            this.scanner.eat(RIGHTPARENTHESIS$6);
		        } else {
		            name = this.scanner.consume(IDENTIFIER$h);
		        }

		        return {
		            type: 'PseudoElementSelector',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: name,
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('::');
		        processChunk(node.name);

		        if (node.children !== null) {
		            processChunk('(');
		            this.each(processChunk, node);
		            processChunk(')');
		        }
		    },
		    walkContext: 'function'
		};

		var isNumber$3 = tokenizer$1.isNumber;
		var TYPE$v = tokenizer$1.TYPE;
		var NUMBER$a = TYPE$v.Number;
		var SOLIDUS$6 = TYPE$v.Solidus;
		var FULLSTOP$4 = TYPE$v.FullStop;

		// Terms of <ratio> should to be a positive number (not zero or negative)
		// (see https://drafts.csswg.org/mediaqueries-3/#values)
		// However, -o-min-device-pixel-ratio takes fractional values as a ratio's term
		// and this is using by various sites. Therefore we relax checking on parse
		// to test a term is unsigned number without exponent part.
		// Additional checks may to be applied on lexer validation.
		function consumeNumber(scanner) {
		    var value = scanner.consumeNonWS(NUMBER$a);

		    for (var i = 0; i < value.length; i++) {
		        var code = value.charCodeAt(i);
		        if (!isNumber$3(code) && code !== FULLSTOP$4) {
		            scanner.error('Unsigned number is expected', scanner.tokenStart - value.length + i);
		        }
		    }

		    if (Number(value) === 0) {
		        scanner.error('Zero number is not allowed', scanner.tokenStart - value.length);
		    }

		    return value;
		}

		// <positive-integer> S* '/' S* <positive-integer>
		var Ratio = {
		    name: 'Ratio',
		    structure: {
		        left: String,
		        right: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var left = consumeNumber(this.scanner);
		        var right;

		        this.scanner.eatNonWS(SOLIDUS$6);
		        right = consumeNumber(this.scanner);

		        return {
		            type: 'Ratio',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            left: left,
		            right: right
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.left);
		        processChunk('/');
		        processChunk(node.right);
		    }
		};

		var Raw = {
		    name: 'Raw',
		    structure: {
		        value: String
		    },
		    parse: function(startToken, endTokenType1, endTokenType2, includeTokenType2, excludeWhiteSpace) {
		        var startOffset = this.scanner.getTokenStart(startToken);
		        var endOffset;

		        this.scanner.skip(
		            this.scanner.getRawLength(
		                startToken,
		                endTokenType1,
		                endTokenType2,
		                includeTokenType2
		            )
		        );

		        if (excludeWhiteSpace && this.scanner.tokenStart > startOffset) {
		            endOffset = this.scanner.getOffsetExcludeWS();
		        } else {
		            endOffset = this.scanner.tokenStart;
		        }

		        return {
		            type: 'Raw',
		            loc: this.getLocation(startOffset, endOffset),
		            value: this.scanner.source.substring(startOffset, endOffset)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		    }
		};

		var TYPE$w = tokenizer$1.TYPE;

		var LEFTCURLYBRACKET$5 = TYPE$w.LeftCurlyBracket;

		function consumeRaw$4(startToken) {
		    return this.Raw(startToken, LEFTCURLYBRACKET$5, 0, false, true);
		}

		var Rule = {
		    name: 'Rule',
		    structure: {
		        selector: ['SelectorList', 'Raw'],
		        block: ['Block']
		    },
		    parse: function() {
		        var startToken = this.scanner.currentToken;
		        var startOffset = this.scanner.tokenStart;
		        var selector = this.parseSelector
		            ? this.tolerantParse(this.SelectorList, consumeRaw$4)
		            : consumeRaw$4.call(this, startToken);
		        var block = this.Block(this.Declaration);

		        return {
		            type: 'Rule',
		            loc: this.getLocation(startOffset, this.scanner.tokenStart),
		            selector: selector,
		            block: block
		        };
		    },
		    generate: function(processChunk, node) {
		        this.generate(processChunk, node.selector);
		        this.generate(processChunk, node.block);
		    },
		    walkContext: 'rule'
		};

		var Selector = {
		    name: 'Selector',
		    structure: {
		        children: [[
		            'TypeSelector',
		            'IdSelector',
		            'ClassSelector',
		            'AttributeSelector',
		            'PseudoClassSelector',
		            'PseudoElementSelector',
		            'Combinator',
		            'WhiteSpace'
		        ]]
		    },
		    parse: function() {
		        var children = this.readSequence(this.scope.Selector);

		        // nothing were consumed
		        if (children.isEmpty()) {
		            this.scanner.error('Selector is expected');
		        }

		        return {
		            type: 'Selector',
		            loc: this.getLocationFromList(children),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.each(processChunk, node);
		    }
		};

		var TYPE$x = tokenizer$1.TYPE;

		var COMMA$3 = TYPE$x.Comma;
		var LEFTCURLYBRACKET$6 = TYPE$x.LeftCurlyBracket;

		var SelectorList = {
		    name: 'SelectorList',
		    structure: {
		        children: [['Selector', 'Raw']]
		    },
		    parse: function() {
		        var children = new list();

		        while (!this.scanner.eof) {
		            children.appendData(this.parseSelector
		                ? this.Selector()
		                : this.Raw(this.scanner.currentToken, COMMA$3, LEFTCURLYBRACKET$6, false, false)
		            );

		            if (this.scanner.tokenType === COMMA$3) {
		                this.scanner.next();
		                continue;
		            }

		            break;
		        }

		        return {
		            type: 'SelectorList',
		            loc: this.getLocationFromList(children),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.eachComma(processChunk, node);
		    },
		    walkContext: 'selector'
		};

		var STRING$5 = tokenizer$1.TYPE.String;

		var _String = {
		    name: 'String',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        return {
		            type: 'String',
		            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
		            value: this.scanner.consume(STRING$5)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		    }
		};

		var TYPE$y = tokenizer$1.TYPE;

		var WHITESPACE$7 = TYPE$y.WhiteSpace;
		var COMMENT$7 = TYPE$y.Comment;
		var EXCLAMATIONMARK$3 = TYPE$y.ExclamationMark;
		var ATRULE$4 = TYPE$y.Atrule;
		var CDO$3 = TYPE$y.CDO;
		var CDC$3 = TYPE$y.CDC;

		function consumeRaw$5(startToken) {
		    return this.Raw(startToken, 0, 0, false, false);
		}

		var StyleSheet = {
		    name: 'StyleSheet',
		    structure: {
		        children: [['Comment', 'Atrule', 'Rule', 'Raw']]
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var children = new list();
		        var child;

		        scan:
		        while (!this.scanner.eof) {
		            switch (this.scanner.tokenType) {
		                case WHITESPACE$7:
		                    this.scanner.next();
		                    continue;

		                case COMMENT$7:
		                    // ignore comments except exclamation comments (i.e. /*! .. */) on top level
		                    if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== EXCLAMATIONMARK$3) {
		                        this.scanner.next();
		                        continue;
		                    }

		                    child = this.Comment();
		                    break;

		                case CDO$3: // <!--
		                    child = this.CDO();
		                    break;

		                case CDC$3: // -->
		                    child = this.CDC();
		                    break;

		                // CSS Syntax Module Level 3
		                // §2.2 Error handling
		                // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
		                case ATRULE$4:
		                    child = this.Atrule();
		                    break;

		                // Anything else starts a qualified rule ...
		                default:
		                    child = this.tolerantParse(this.Rule, consumeRaw$5);
		            }

		            children.appendData(child);
		        }

		        return {
		            type: 'StyleSheet',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.each(processChunk, node);
		    },
		    walkContext: 'stylesheet'
		};

		var TYPE$z = tokenizer$1.TYPE;

		var IDENTIFIER$i = TYPE$z.Identifier;
		var ASTERISK$5 = TYPE$z.Asterisk;
		var VERTICALLINE$2 = TYPE$z.VerticalLine;

		function eatIdentifierOrAsterisk() {
		    if (this.scanner.tokenType !== IDENTIFIER$i &&
		        this.scanner.tokenType !== ASTERISK$5) {
		        this.scanner.error('Identifier or asterisk is expected');
		    }

		    this.scanner.next();
		}

		// ident
		// ident|ident
		// ident|*
		// *
		// *|ident
		// *|*
		// |ident
		// |*
		var TypeSelector = {
		    name: 'TypeSelector',
		    structure: {
		        name: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        if (this.scanner.tokenType === VERTICALLINE$2) {
		            this.scanner.next();
		            eatIdentifierOrAsterisk.call(this);
		        } else {
		            eatIdentifierOrAsterisk.call(this);

		            if (this.scanner.tokenType === VERTICALLINE$2) {
		                this.scanner.next();
		                eatIdentifierOrAsterisk.call(this);
		            }
		        }

		        return {
		            type: 'TypeSelector',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            name: this.scanner.substrToCursor(start)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.name);
		    }
		};

		var isHex$2 = tokenizer$1.isHex;
		var TYPE$A = tokenizer$1.TYPE;

		var IDENTIFIER$j = TYPE$A.Identifier;
		var NUMBER$b = TYPE$A.Number;
		var PLUSSIGN$7 = TYPE$A.PlusSign;
		var HYPHENMINUS$7 = TYPE$A.HyphenMinus;
		var FULLSTOP$5 = TYPE$A.FullStop;
		var QUESTIONMARK = TYPE$A.QuestionMark;

		function scanUnicodeNumber(scanner) {
		    for (var pos = scanner.tokenStart + 1; pos < scanner.tokenEnd; pos++) {
		        var code = scanner.source.charCodeAt(pos);

		        // break on fullstop or hyperminus/plussign after exponent
		        if (code === FULLSTOP$5 || code === PLUSSIGN$7) {
		            // break token, exclude symbol
		            scanner.tokenStart = pos;
		            return false;
		        }
		    }

		    return true;
		}

		// https://drafts.csswg.org/css-syntax-3/#urange
		function scanUnicodeRange(scanner) {
		    var hexStart = scanner.tokenStart + 1; // skip +
		    var hexLength = 0;

		    scan: {
		        if (scanner.tokenType === NUMBER$b) {
		            if (scanner.source.charCodeAt(scanner.tokenStart) !== FULLSTOP$5 && scanUnicodeNumber(scanner)) {
		                scanner.next();
		            } else if (scanner.source.charCodeAt(scanner.tokenStart) !== HYPHENMINUS$7) {
		                break scan;
		            }
		        } else {
		            scanner.next(); // PLUSSIGN
		        }

		        if (scanner.tokenType === HYPHENMINUS$7) {
		            scanner.next();
		        }

		        if (scanner.tokenType === NUMBER$b) {
		            scanner.next();
		        }

		        if (scanner.tokenType === IDENTIFIER$j) {
		            scanner.next();
		        }

		        if (scanner.tokenStart === hexStart) {
		            scanner.error('Unexpected input', hexStart);
		        }
		    }

		    // validate for U+x{1,6} or U+x{1,6}-x{1,6}
		    // where x is [0-9a-fA-F]
		    for (var i = hexStart, wasHyphenMinus = false; i < scanner.tokenStart; i++) {
		        var code = scanner.source.charCodeAt(i);

		        if (isHex$2(code) === false && (code !== HYPHENMINUS$7 || wasHyphenMinus)) {
		            scanner.error('Unexpected input', i);
		        }

		        if (code === HYPHENMINUS$7) {
		            // hex sequence shouldn't be an empty
		            if (hexLength === 0) {
		                scanner.error('Unexpected input', i);
		            }

		            wasHyphenMinus = true;
		            hexLength = 0;
		        } else {
		            hexLength++;

		            // too long hex sequence
		            if (hexLength > 6) {
		                scanner.error('Too long hex sequence', i);
		            }
		        }

		    }

		    // check we have a non-zero sequence
		    if (hexLength === 0) {
		        scanner.error('Unexpected input', i - 1);
		    }

		    // U+abc???
		    if (!wasHyphenMinus) {
		        // consume as many U+003F QUESTION MARK (?) code points as possible
		        for (; hexLength < 6 && !scanner.eof; scanner.next()) {
		            if (scanner.tokenType !== QUESTIONMARK) {
		                break;
		            }

		            hexLength++;
		        }
		    }
		}

		var UnicodeRange = {
		    name: 'UnicodeRange',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;

		        this.scanner.next(); // U or u
		        scanUnicodeRange(this.scanner);

		        return {
		            type: 'UnicodeRange',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: this.scanner.substrToCursor(start)
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		    }
		};

		var TYPE$B = tokenizer$1.TYPE;

		var STRING$6 = TYPE$B.String;
		var URL$4 = TYPE$B.Url;
		var RAW$2 = TYPE$B.Raw;
		var RIGHTPARENTHESIS$7 = TYPE$B.RightParenthesis;

		// url '(' S* (string | raw) S* ')'
		var Url = {
		    name: 'Url',
		    structure: {
		        value: ['String', 'Raw']
		    },
		    parse: function() {
		        var start = this.scanner.tokenStart;
		        var value;

		        this.scanner.eat(URL$4);
		        this.scanner.skipSC();

		        switch (this.scanner.tokenType) {
		            case STRING$6:
		                value = this.String();
		                break;

		            case RAW$2:
		                value = this.Raw(this.scanner.currentToken, 0, RAW$2, true, false);
		                break;

		            default:
		                this.scanner.error('String or Raw is expected');
		        }

		        this.scanner.skipSC();
		        this.scanner.eat(RIGHTPARENTHESIS$7);

		        return {
		            type: 'Url',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            value: value
		        };
		    },
		    generate: function(processChunk, node) {
		        processChunk('url');
		        processChunk('(');
		        this.generate(processChunk, node.value);
		        processChunk(')');
		    }
		};

		var endsWith$1 = tokenizer$1.endsWith;
		var TYPE$C = tokenizer$1.TYPE;

		var WHITESPACE$8 = TYPE$C.WhiteSpace;
		var COMMENT$8 = TYPE$C.Comment;
		var FUNCTION$6 = TYPE$C.Function;
		var COLON$7 = TYPE$C.Colon;
		var SEMICOLON$6 = TYPE$C.Semicolon;
		var EXCLAMATIONMARK$4 = TYPE$C.ExclamationMark;

		// 'progid:' ws* 'DXImageTransform.Microsoft.' ident ws* '(' .* ')'
		function checkProgid(scanner) {
		    var offset = 0;

		    for (var type; type = scanner.lookupType(offset); offset++) {
		        if (type !== WHITESPACE$8 && type !== COMMENT$8) {
		            break;
		        }
		    }

		    if (scanner.lookupValue(offset, 'alpha(') ||
		        scanner.lookupValue(offset, 'chroma(') ||
		        scanner.lookupValue(offset, 'dropshadow(')) {
		        if (scanner.lookupType(offset) !== FUNCTION$6) {
		            return false;
		        }
		    } else {
		        if (scanner.lookupValue(offset, 'progid') === false ||
		            scanner.lookupType(offset + 1) !== COLON$7) {
		            return false;
		        }
		    }

		    return true;
		}

		var Value = {
		    name: 'Value',
		    structure: {
		        children: [[]]
		    },
		    parse: function(property) {
		        // special parser for filter property since it can contains non-standart syntax for old IE
		        if (property !== null && endsWith$1(property, 'filter') && checkProgid(this.scanner)) {
		            this.scanner.skipSC();
		            return this.Raw(this.scanner.currentToken, EXCLAMATIONMARK$4, SEMICOLON$6, false, false);
		        }

		        var start = this.scanner.tokenStart;
		        var children = this.readSequence(this.scope.Value);

		        return {
		            type: 'Value',
		            loc: this.getLocation(start, this.scanner.tokenStart),
		            children: children
		        };
		    },
		    generate: function(processChunk, node) {
		        this.each(processChunk, node);
		    }
		};

		var WHITESPACE$9 = tokenizer$1.TYPE.WhiteSpace;
		var SPACE$2 = Object.freeze({
		    type: 'WhiteSpace',
		    loc: null,
		    value: ' '
		});

		var WhiteSpace = {
		    name: 'WhiteSpace',
		    structure: {
		        value: String
		    },
		    parse: function() {
		        this.scanner.eat(WHITESPACE$9);
		        return SPACE$2;

		        // return {
		        //     type: 'WhiteSpace',
		        //     loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
		        //     value: this.scanner.consume(WHITESPACE)
		        // };
		    },
		    generate: function(processChunk, node) {
		        processChunk(node.value);
		    }
		};

		var node = {
		    AnPlusB: AnPlusB,
		    Atrule: Atrule,
		    AtruleExpression: AtruleExpression,
		    AttributeSelector: AttributeSelector,
		    Block: Block,
		    Brackets: Brackets,
		    CDC: CDC_1,
		    CDO: CDO_1,
		    ClassSelector: ClassSelector,
		    Combinator: Combinator,
		    Comment: Comment,
		    Declaration: Declaration,
		    DeclarationList: DeclarationList,
		    Dimension: Dimension,
		    Function: _Function,
		    HexColor: HexColor,
		    Identifier: Identifier,
		    IdSelector: IdSelector,
		    MediaFeature: MediaFeature,
		    MediaQuery: MediaQuery,
		    MediaQueryList: MediaQueryList,
		    Nth: Nth,
		    Number: _Number,
		    Operator: Operator,
		    Parentheses: Parentheses,
		    Percentage: Percentage,
		    PseudoClassSelector: PseudoClassSelector,
		    PseudoElementSelector: PseudoElementSelector,
		    Ratio: Ratio,
		    Raw: Raw,
		    Rule: Rule,
		    Selector: Selector,
		    SelectorList: SelectorList,
		    String: _String,
		    StyleSheet: StyleSheet,
		    TypeSelector: TypeSelector,
		    UnicodeRange: UnicodeRange,
		    Url: Url,
		    Value: Value,
		    WhiteSpace: WhiteSpace
		};

		var parser = {
		    parseContext: {
		        default: 'StyleSheet',
		        stylesheet: 'StyleSheet',
		        atrule: 'Atrule',
		        atruleExpression: function(options) {
		            return this.AtruleExpression(options.atrule ? String(options.atrule) : null);
		        },
		        mediaQueryList: 'MediaQueryList',
		        mediaQuery: 'MediaQuery',
		        rule: 'Rule',
		        selectorList: 'SelectorList',
		        selector: 'Selector',
		        block: function() {
		            return this.Block(this.Declaration);
		        },
		        declarationList: 'DeclarationList',
		        declaration: 'Declaration',
		        value: function(options) {
		            return this.Value(options.property ? String(options.property) : null);
		        }
		    },
		    scope: scope,
		    atrule: atrule,
		    pseudo: pseudo,
		    node: node
		};

		var parser$1 = create(parser);

		function walk ( ast, ref) {
			var enter = ref.enter;
			var leave = ref.leave;

			visit( ast, null, enter, leave );
		}

		var shouldSkip = false;
		var context = { skip: function () { return shouldSkip = true; } };

		var childKeys = {};

		var toString$1 = Object.prototype.toString;

		function isArray$1 ( thing ) {
			return toString$1.call( thing ) === '[object Array]';
		}

		function visit ( node, parent, enter, leave, prop, index ) {
			if ( !node ) { return; }

			if ( enter ) {
				var _shouldSkip = shouldSkip;
				shouldSkip = false;
				enter.call( context, node, parent, prop, index );
				var skipped = shouldSkip;
				shouldSkip = _shouldSkip;

				if ( skipped ) { return; }
			}

			var keys = childKeys[ node.type ] || (
				childKeys[ node.type ] = Object.keys( node ).filter( function (key) { return typeof node[ key ] === 'object'; } )
			);

			for ( var i = 0; i < keys.length; i += 1 ) {
				var key = keys[i];
				var value = node[ key ];

				if ( isArray$1( value ) ) {
					for ( var j = 0; j < value.length; j += 1 ) {
						visit( value[j], node, enter, leave, key, j );
					}
				}

				else if ( value && value.type ) {
					visit( value, node, enter, leave, key, null );
				}
			}

			if ( leave ) {
				leave( node, parent, prop, index );
			}
		}

		function readStyle(parser, start, attributes) {
		    const contentStart = parser.index;
		    const styles = parser.readUntil(/<\/style>/);
		    const contentEnd = parser.index;
		    let ast;
		    try {
		        ast = parser$1(styles, {
		            positions: true,
		            offset: contentStart,
		        });
		    }
		    catch (err) {
		        if (err.name === 'CssSyntaxError') {
		            parser.error({
		                code: `css-syntax-error`,
		                message: err.message
		            }, err.offset);
		        }
		        else {
		            throw err;
		        }
		    }
		    ast = JSON.parse(JSON.stringify(ast));
		    // tidy up AST
		    walk(ast, {
		        enter: (node) => {
		            // replace `ref:a` nodes
		            if (node.type === 'Selector') {
		                for (let i = 0; i < node.children.length; i += 1) {
		                    const a = node.children[i];
		                    const b = node.children[i + 1];
		                    if (isRefSelector(a, b)) {
		                        node.children.splice(i, 2, {
		                            type: 'RefSelector',
		                            start: a.loc.start.offset,
		                            end: b.loc.end.offset,
		                            name: b.name
		                        });
		                    }
		                }
		            }
		            if (node.loc) {
		                node.start = node.loc.start.offset;
		                node.end = node.loc.end.offset;
		                delete node.loc;
		            }
		        }
		    });
		    parser.eat('</style>', true);
		    const end = parser.index;
		    return {
		        start,
		        end,
		        attributes,
		        children: ast.children,
		        content: {
		            start: contentStart,
		            end: contentEnd,
		            styles,
		        },
		    };
		}
		function isRefSelector(a, b) {
		    if (!b)
		        return false;
		    return (a.type === 'TypeSelector' &&
		        a.name === 'ref' &&
		        b.type === 'PseudoClassSelector');
		}

		const DIRECTIVES = {
		    Ref: {
		        names: ['ref'],
		        attribute(start, end, type, name) {
		            return { start, end, type, name };
		        },
		        allowedExpressionTypes: [],
		        error: 'ref directives cannot have a value'
		    },
		    EventHandler: {
		        names: ['on'],
		        attribute(start, end, type, lhs, expression) {
		            const [name, ...modifiers] = lhs.split('|');
		            return { start, end, type, name, modifiers, expression };
		        },
		        allowedExpressionTypes: ['CallExpression'],
		        error: 'Expected a method call'
		    },
		    Binding: {
		        names: ['bind'],
		        attribute(start, end, type, name, expression) {
		            return {
		                start, end, type, name,
		                value: expression || {
		                    type: 'Identifier',
		                    start: start + 5,
		                    end,
		                    name,
		                }
		            };
		        },
		        allowedExpressionTypes: ['Identifier', 'MemberExpression'],
		        error: 'Can only bind to an identifier (e.g. `foo`) or a member expression (e.g. `foo.bar` or `foo[baz]`)'
		    },
		    Transition: {
		        names: ['in', 'out', 'transition'],
		        attribute(start, end, type, name, expression, directiveName) {
		            return {
		                start, end, type, name, expression,
		                intro: directiveName === 'in' || directiveName === 'transition',
		                outro: directiveName === 'out' || directiveName === 'transition',
		            };
		        },
		        allowedExpressionTypes: ['ObjectExpression'],
		        error: 'Transition argument must be an object literal, e.g. `{ duration: 400 }`'
		    },
		    Animation: {
		        names: ['animate'],
		        attribute(start, end, type, name, expression) {
		            return { start, end, type, name, expression };
		        },
		        allowedExpressionTypes: ['ObjectExpression'],
		        error: 'Animation argument must be an object literal, e.g. `{ duration: 400 }`'
		    },
		    Action: {
		        names: ['use'],
		        attribute(start, end, type, name, expression) {
		            return { start, end, type, name, expression };
		        },
		        allowedExpressionTypes: ['*'],
		        error: 'Data passed to actions must be an identifier (e.g. `foo`), a member expression ' +
		            '(e.g. `foo.bar` or `foo[baz]`), a method call (e.g. `foo()`), or a literal (e.g. `true` or `\'a string\'`'
		    },
		    Class: {
		        names: ['class'],
		        attribute(start, end, type, name, expression) {
		            return { start, end, type, name, expression };
		        },
		        allowedExpressionTypes: ['*'],
		        error: 'Data passed to class directives must be an expression'
		    },
		};
		const lookupByName = {};
		Object.keys(DIRECTIVES).forEach(name => {
		    const directive = DIRECTIVES[name];
		    directive.names.forEach(type => lookupByName[type] = name);
		});
		function readExpression$1(parser, start, quoteMark) {
		    let i = start;
		    let escaped = false;
		    for (; i < parser.template.length; i += 1) {
		        const char = parser.template[i];
		        if (quoteMark) {
		            if (char === quoteMark) {
		                if (!escaped)
		                    break;
		            }
		            else if (escaped) {
		                escaped = false;
		            }
		            else if (char === '\\') {
		                escaped = true;
		            }
		        }
		        else if (/[\s\/>]/.test(char)) {
		            break;
		        }
		    }
		    const expression = parseExpressionAt(parser.template.slice(0, i), start, {
		        ecmaVersion: 9,
		    });
		    parser.index = expression.end;
		    parser.allowWhitespace();
		    if (quoteMark)
		        parser.eat(quoteMark, true);
		    return expression;
		}
		function readDirective(parser, start, attrName) {
		    const [directiveName, name] = attrName.split(':');
		    if (name === undefined)
		        return; // No colon in the name
		    if (directiveName === '') {
		        // not a directive — :foo is short for foo={{foo}}
		        return {
		            start: start,
		            end: start + name.length + 1,
		            type: 'Attribute',
		            name,
		            value: getShorthandValue(start + 1, name)
		        };
		    }
		    const type = lookupByName[directiveName];
		    if (!type)
		        return; // not a registered directive
		    const directive = DIRECTIVES[type];
		    let expression = null;
		    if (parser.eat('=')) {
		        const quoteMark = parser.eat(`'`) ? `'` : parser.eat(`"`) ? `"` : null;
		        const expressionStart = parser.index;
		        try {
		            expression = readExpression$1(parser, expressionStart, quoteMark);
		            const allowed = directive.allowedExpressionTypes;
		            if (allowed[0] !== '*' && allowed.indexOf(expression.type) === -1) {
		                parser.error({
		                    code: `invalid-directive-value`,
		                    message: directive.error
		                }, expressionStart);
		            }
		        }
		        catch (err) {
		            if (parser.template[expressionStart] === '{') {
		                // assume the mistake was wrapping the directive arguments.
		                // this could yield false positives! but hopefully not too many
		                let message = 'directive values should not be wrapped';
		                const expressionEnd = parser.template.indexOf('}', expressionStart);
		                if (expressionEnd !== -1) {
		                    const value = parser.template.slice(expressionStart + 1, expressionEnd);
		                    message += ` — use '${value}', not '{${value}}'`;
		                }
		                parser.error({
		                    code: `invalid-directive-value`,
		                    message
		                }, expressionStart);
		            }
		            throw err;
		        }
		    }
		    return directive.attribute(start, parser.index, type, name, expression, directiveName);
		}
		function getShorthandValue(start, name) {
		    const end = start + name.length;
		    return [
		        {
		            type: 'AttributeShorthand',
		            start,
		            end,
		            expression: {
		                type: 'Identifier',
		                start,
		                end,
		                name,
		            },
		        },
		    ];
		}

		// https://dev.w3.org/html5/html-author/charref
		var htmlEntities = {
		    CounterClockwiseContourIntegral: 8755,
		    ClockwiseContourIntegral: 8754,
		    DoubleLongLeftRightArrow: 10234,
		    DiacriticalDoubleAcute: 733,
		    NotSquareSupersetEqual: 8931,
		    CloseCurlyDoubleQuote: 8221,
		    DoubleContourIntegral: 8751,
		    FilledVerySmallSquare: 9642,
		    NegativeVeryThinSpace: 8203,
		    NotPrecedesSlantEqual: 8928,
		    NotRightTriangleEqual: 8941,
		    NotSucceedsSlantEqual: 8929,
		    CapitalDifferentialD: 8517,
		    DoubleLeftRightArrow: 8660,
		    DoubleLongRightArrow: 10233,
		    EmptyVerySmallSquare: 9643,
		    NestedGreaterGreater: 8811,
		    NotDoubleVerticalBar: 8742,
		    NotLeftTriangleEqual: 8940,
		    NotSquareSubsetEqual: 8930,
		    OpenCurlyDoubleQuote: 8220,
		    ReverseUpEquilibrium: 10607,
		    DoubleLongLeftArrow: 10232,
		    DownLeftRightVector: 10576,
		    LeftArrowRightArrow: 8646,
		    NegativeMediumSpace: 8203,
		    RightArrowLeftArrow: 8644,
		    SquareSupersetEqual: 8850,
		    leftrightsquigarrow: 8621,
		    DownRightTeeVector: 10591,
		    DownRightVectorBar: 10583,
		    LongLeftRightArrow: 10231,
		    Longleftrightarrow: 10234,
		    NegativeThickSpace: 8203,
		    PrecedesSlantEqual: 8828,
		    ReverseEquilibrium: 8651,
		    RightDoubleBracket: 10215,
		    RightDownTeeVector: 10589,
		    RightDownVectorBar: 10581,
		    RightTriangleEqual: 8885,
		    SquareIntersection: 8851,
		    SucceedsSlantEqual: 8829,
		    blacktriangleright: 9656,
		    longleftrightarrow: 10231,
		    DoubleUpDownArrow: 8661,
		    DoubleVerticalBar: 8741,
		    DownLeftTeeVector: 10590,
		    DownLeftVectorBar: 10582,
		    FilledSmallSquare: 9724,
		    GreaterSlantEqual: 10878,
		    LeftDoubleBracket: 10214,
		    LeftDownTeeVector: 10593,
		    LeftDownVectorBar: 10585,
		    LeftTriangleEqual: 8884,
		    NegativeThinSpace: 8203,
		    NotReverseElement: 8716,
		    NotTildeFullEqual: 8775,
		    RightAngleBracket: 10217,
		    RightUpDownVector: 10575,
		    SquareSubsetEqual: 8849,
		    VerticalSeparator: 10072,
		    blacktriangledown: 9662,
		    blacktriangleleft: 9666,
		    leftrightharpoons: 8651,
		    rightleftharpoons: 8652,
		    twoheadrightarrow: 8608,
		    DiacriticalAcute: 180,
		    DiacriticalGrave: 96,
		    DiacriticalTilde: 732,
		    DoubleRightArrow: 8658,
		    DownArrowUpArrow: 8693,
		    EmptySmallSquare: 9723,
		    GreaterEqualLess: 8923,
		    GreaterFullEqual: 8807,
		    LeftAngleBracket: 10216,
		    LeftUpDownVector: 10577,
		    LessEqualGreater: 8922,
		    NonBreakingSpace: 160,
		    NotRightTriangle: 8939,
		    NotSupersetEqual: 8841,
		    RightTriangleBar: 10704,
		    RightUpTeeVector: 10588,
		    RightUpVectorBar: 10580,
		    UnderParenthesis: 9181,
		    UpArrowDownArrow: 8645,
		    circlearrowright: 8635,
		    downharpoonright: 8642,
		    ntrianglerighteq: 8941,
		    rightharpoondown: 8641,
		    rightrightarrows: 8649,
		    twoheadleftarrow: 8606,
		    vartriangleright: 8883,
		    CloseCurlyQuote: 8217,
		    ContourIntegral: 8750,
		    DoubleDownArrow: 8659,
		    DoubleLeftArrow: 8656,
		    DownRightVector: 8641,
		    LeftRightVector: 10574,
		    LeftTriangleBar: 10703,
		    LeftUpTeeVector: 10592,
		    LeftUpVectorBar: 10584,
		    LowerRightArrow: 8600,
		    NotGreaterEqual: 8817,
		    NotGreaterTilde: 8821,
		    NotLeftTriangle: 8938,
		    OverParenthesis: 9180,
		    RightDownVector: 8642,
		    ShortRightArrow: 8594,
		    UpperRightArrow: 8599,
		    bigtriangledown: 9661,
		    circlearrowleft: 8634,
		    curvearrowright: 8631,
		    downharpoonleft: 8643,
		    leftharpoondown: 8637,
		    leftrightarrows: 8646,
		    nLeftrightarrow: 8654,
		    nleftrightarrow: 8622,
		    ntrianglelefteq: 8940,
		    rightleftarrows: 8644,
		    rightsquigarrow: 8605,
		    rightthreetimes: 8908,
		    straightepsilon: 1013,
		    trianglerighteq: 8885,
		    vartriangleleft: 8882,
		    DiacriticalDot: 729,
		    DoubleRightTee: 8872,
		    DownLeftVector: 8637,
		    GreaterGreater: 10914,
		    HorizontalLine: 9472,
		    InvisibleComma: 8291,
		    InvisibleTimes: 8290,
		    LeftDownVector: 8643,
		    LeftRightArrow: 8596,
		    Leftrightarrow: 8660,
		    LessSlantEqual: 10877,
		    LongRightArrow: 10230,
		    Longrightarrow: 10233,
		    LowerLeftArrow: 8601,
		    NestedLessLess: 8810,
		    NotGreaterLess: 8825,
		    NotLessGreater: 8824,
		    NotSubsetEqual: 8840,
		    NotVerticalBar: 8740,
		    OpenCurlyQuote: 8216,
		    ReverseElement: 8715,
		    RightTeeVector: 10587,
		    RightVectorBar: 10579,
		    ShortDownArrow: 8595,
		    ShortLeftArrow: 8592,
		    SquareSuperset: 8848,
		    TildeFullEqual: 8773,
		    UpperLeftArrow: 8598,
		    ZeroWidthSpace: 8203,
		    curvearrowleft: 8630,
		    doublebarwedge: 8966,
		    downdownarrows: 8650,
		    hookrightarrow: 8618,
		    leftleftarrows: 8647,
		    leftrightarrow: 8596,
		    leftthreetimes: 8907,
		    longrightarrow: 10230,
		    looparrowright: 8620,
		    nshortparallel: 8742,
		    ntriangleright: 8939,
		    rightarrowtail: 8611,
		    rightharpoonup: 8640,
		    trianglelefteq: 8884,
		    upharpoonright: 8638,
		    ApplyFunction: 8289,
		    DifferentialD: 8518,
		    DoubleLeftTee: 10980,
		    DoubleUpArrow: 8657,
		    LeftTeeVector: 10586,
		    LeftVectorBar: 10578,
		    LessFullEqual: 8806,
		    LongLeftArrow: 10229,
		    Longleftarrow: 10232,
		    NotTildeEqual: 8772,
		    NotTildeTilde: 8777,
		    Poincareplane: 8460,
		    PrecedesEqual: 10927,
		    PrecedesTilde: 8830,
		    RightArrowBar: 8677,
		    RightTeeArrow: 8614,
		    RightTriangle: 8883,
		    RightUpVector: 8638,
		    SucceedsEqual: 10928,
		    SucceedsTilde: 8831,
		    SupersetEqual: 8839,
		    UpEquilibrium: 10606,
		    VerticalTilde: 8768,
		    VeryThinSpace: 8202,
		    bigtriangleup: 9651,
		    blacktriangle: 9652,
		    divideontimes: 8903,
		    fallingdotseq: 8786,
		    hookleftarrow: 8617,
		    leftarrowtail: 8610,
		    leftharpoonup: 8636,
		    longleftarrow: 10229,
		    looparrowleft: 8619,
		    measuredangle: 8737,
		    ntriangleleft: 8938,
		    shortparallel: 8741,
		    smallsetminus: 8726,
		    triangleright: 9657,
		    upharpoonleft: 8639,
		    DownArrowBar: 10515,
		    DownTeeArrow: 8615,
		    ExponentialE: 8519,
		    GreaterEqual: 8805,
		    GreaterTilde: 8819,
		    HilbertSpace: 8459,
		    HumpDownHump: 8782,
		    Intersection: 8898,
		    LeftArrowBar: 8676,
		    LeftTeeArrow: 8612,
		    LeftTriangle: 8882,
		    LeftUpVector: 8639,
		    NotCongruent: 8802,
		    NotLessEqual: 8816,
		    NotLessTilde: 8820,
		    Proportional: 8733,
		    RightCeiling: 8969,
		    RoundImplies: 10608,
		    ShortUpArrow: 8593,
		    SquareSubset: 8847,
		    UnderBracket: 9141,
		    VerticalLine: 124,
		    blacklozenge: 10731,
		    exponentiale: 8519,
		    risingdotseq: 8787,
		    triangledown: 9663,
		    triangleleft: 9667,
		    CircleMinus: 8854,
		    CircleTimes: 8855,
		    Equilibrium: 8652,
		    GreaterLess: 8823,
		    LeftCeiling: 8968,
		    LessGreater: 8822,
		    MediumSpace: 8287,
		    NotPrecedes: 8832,
		    NotSucceeds: 8833,
		    OverBracket: 9140,
		    RightVector: 8640,
		    Rrightarrow: 8667,
		    RuleDelayed: 10740,
		    SmallCircle: 8728,
		    SquareUnion: 8852,
		    SubsetEqual: 8838,
		    UpDownArrow: 8597,
		    Updownarrow: 8661,
		    VerticalBar: 8739,
		    backepsilon: 1014,
		    blacksquare: 9642,
		    circledcirc: 8858,
		    circleddash: 8861,
		    curlyeqprec: 8926,
		    curlyeqsucc: 8927,
		    diamondsuit: 9830,
		    eqslantless: 10901,
		    expectation: 8496,
		    nRightarrow: 8655,
		    nrightarrow: 8603,
		    preccurlyeq: 8828,
		    precnapprox: 10937,
		    quaternions: 8461,
		    straightphi: 981,
		    succcurlyeq: 8829,
		    succnapprox: 10938,
		    thickapprox: 8776,
		    updownarrow: 8597,
		    Bernoullis: 8492,
		    CirclePlus: 8853,
		    EqualTilde: 8770,
		    Fouriertrf: 8497,
		    ImaginaryI: 8520,
		    Laplacetrf: 8466,
		    LeftVector: 8636,
		    Lleftarrow: 8666,
		    NotElement: 8713,
		    NotGreater: 8815,
		    Proportion: 8759,
		    RightArrow: 8594,
		    RightFloor: 8971,
		    Rightarrow: 8658,
		    TildeEqual: 8771,
		    TildeTilde: 8776,
		    UnderBrace: 9183,
		    UpArrowBar: 10514,
		    UpTeeArrow: 8613,
		    circledast: 8859,
		    complement: 8705,
		    curlywedge: 8911,
		    eqslantgtr: 10902,
		    gtreqqless: 10892,
		    lessapprox: 10885,
		    lesseqqgtr: 10891,
		    lmoustache: 9136,
		    longmapsto: 10236,
		    mapstodown: 8615,
		    mapstoleft: 8612,
		    nLeftarrow: 8653,
		    nleftarrow: 8602,
		    precapprox: 10935,
		    rightarrow: 8594,
		    rmoustache: 9137,
		    sqsubseteq: 8849,
		    sqsupseteq: 8850,
		    subsetneqq: 10955,
		    succapprox: 10936,
		    supsetneqq: 10956,
		    upuparrows: 8648,
		    varepsilon: 949,
		    varnothing: 8709,
		    Backslash: 8726,
		    CenterDot: 183,
		    CircleDot: 8857,
		    Congruent: 8801,
		    Coproduct: 8720,
		    DoubleDot: 168,
		    DownArrow: 8595,
		    DownBreve: 785,
		    Downarrow: 8659,
		    HumpEqual: 8783,
		    LeftArrow: 8592,
		    LeftFloor: 8970,
		    Leftarrow: 8656,
		    LessTilde: 8818,
		    Mellintrf: 8499,
		    MinusPlus: 8723,
		    NotCupCap: 8813,
		    NotExists: 8708,
		    OverBrace: 9182,
		    PlusMinus: 177,
		    Therefore: 8756,
		    ThinSpace: 8201,
		    TripleDot: 8411,
		    UnionPlus: 8846,
		    backprime: 8245,
		    backsimeq: 8909,
		    bigotimes: 10754,
		    centerdot: 183,
		    checkmark: 10003,
		    complexes: 8450,
		    dotsquare: 8865,
		    downarrow: 8595,
		    gtrapprox: 10886,
		    gtreqless: 8923,
		    heartsuit: 9829,
		    leftarrow: 8592,
		    lesseqgtr: 8922,
		    nparallel: 8742,
		    nshortmid: 8740,
		    nsubseteq: 8840,
		    nsupseteq: 8841,
		    pitchfork: 8916,
		    rationals: 8474,
		    spadesuit: 9824,
		    subseteqq: 10949,
		    subsetneq: 8842,
		    supseteqq: 10950,
		    supsetneq: 8843,
		    therefore: 8756,
		    triangleq: 8796,
		    varpropto: 8733,
		    DDotrahd: 10513,
		    DotEqual: 8784,
		    Integral: 8747,
		    LessLess: 10913,
		    NotEqual: 8800,
		    NotTilde: 8769,
		    PartialD: 8706,
		    Precedes: 8826,
		    RightTee: 8866,
		    Succeeds: 8827,
		    SuchThat: 8715,
		    Superset: 8835,
		    Uarrocir: 10569,
		    UnderBar: 818,
		    andslope: 10840,
		    angmsdaa: 10664,
		    angmsdab: 10665,
		    angmsdac: 10666,
		    angmsdad: 10667,
		    angmsdae: 10668,
		    angmsdaf: 10669,
		    angmsdag: 10670,
		    angmsdah: 10671,
		    angrtvbd: 10653,
		    approxeq: 8778,
		    awconint: 8755,
		    backcong: 8780,
		    barwedge: 8965,
		    bbrktbrk: 9142,
		    bigoplus: 10753,
		    bigsqcup: 10758,
		    biguplus: 10756,
		    bigwedge: 8896,
		    boxminus: 8863,
		    boxtimes: 8864,
		    capbrcup: 10825,
		    circledR: 174,
		    circledS: 9416,
		    cirfnint: 10768,
		    clubsuit: 9827,
		    cupbrcap: 10824,
		    curlyvee: 8910,
		    cwconint: 8754,
		    doteqdot: 8785,
		    dotminus: 8760,
		    drbkarow: 10512,
		    dzigrarr: 10239,
		    elinters: 9191,
		    emptyset: 8709,
		    eqvparsl: 10725,
		    fpartint: 10765,
		    geqslant: 10878,
		    gesdotol: 10884,
		    gnapprox: 10890,
		    hksearow: 10533,
		    hkswarow: 10534,
		    imagline: 8464,
		    imagpart: 8465,
		    infintie: 10717,
		    integers: 8484,
		    intercal: 8890,
		    intlarhk: 10775,
		    laemptyv: 10676,
		    ldrushar: 10571,
		    leqslant: 10877,
		    lesdotor: 10883,
		    llcorner: 8990,
		    lnapprox: 10889,
		    lrcorner: 8991,
		    lurdshar: 10570,
		    mapstoup: 8613,
		    multimap: 8888,
		    naturals: 8469,
		    otimesas: 10806,
		    parallel: 8741,
		    plusacir: 10787,
		    pointint: 10773,
		    precneqq: 10933,
		    precnsim: 8936,
		    profalar: 9006,
		    profline: 8978,
		    profsurf: 8979,
		    raemptyv: 10675,
		    realpart: 8476,
		    rppolint: 10770,
		    rtriltri: 10702,
		    scpolint: 10771,
		    setminus: 8726,
		    shortmid: 8739,
		    smeparsl: 10724,
		    sqsubset: 8847,
		    sqsupset: 8848,
		    subseteq: 8838,
		    succneqq: 10934,
		    succnsim: 8937,
		    supseteq: 8839,
		    thetasym: 977,
		    thicksim: 8764,
		    timesbar: 10801,
		    triangle: 9653,
		    triminus: 10810,
		    trpezium: 9186,
		    ulcorner: 8988,
		    urcorner: 8989,
		    varkappa: 1008,
		    varsigma: 962,
		    vartheta: 977,
		    Because: 8757,
		    Cayleys: 8493,
		    Cconint: 8752,
		    Cedilla: 184,
		    Diamond: 8900,
		    DownTee: 8868,
		    Element: 8712,
		    Epsilon: 917,
		    Implies: 8658,
		    LeftTee: 8867,
		    NewLine: 10,
		    NoBreak: 8288,
		    NotLess: 8814,
		    Omicron: 927,
		    OverBar: 175,
		    Product: 8719,
		    UpArrow: 8593,
		    Uparrow: 8657,
		    Upsilon: 933,
		    alefsym: 8501,
		    angrtvb: 8894,
		    angzarr: 9084,
		    asympeq: 8781,
		    backsim: 8765,
		    because: 8757,
		    bemptyv: 10672,
		    between: 8812,
		    bigcirc: 9711,
		    bigodot: 10752,
		    bigstar: 9733,
		    boxplus: 8862,
		    ccupssm: 10832,
		    cemptyv: 10674,
		    cirscir: 10690,
		    coloneq: 8788,
		    congdot: 10861,
		    cudarrl: 10552,
		    cudarrr: 10549,
		    cularrp: 10557,
		    curarrm: 10556,
		    dbkarow: 10511,
		    ddagger: 8225,
		    ddotseq: 10871,
		    demptyv: 10673,
		    diamond: 8900,
		    digamma: 989,
		    dotplus: 8724,
		    dwangle: 10662,
		    epsilon: 949,
		    eqcolon: 8789,
		    equivDD: 10872,
		    gesdoto: 10882,
		    gtquest: 10876,
		    gtrless: 8823,
		    harrcir: 10568,
		    intprod: 10812,
		    isindot: 8949,
		    larrbfs: 10527,
		    larrsim: 10611,
		    lbrksld: 10639,
		    lbrkslu: 10637,
		    ldrdhar: 10599,
		    lesdoto: 10881,
		    lessdot: 8918,
		    lessgtr: 8822,
		    lesssim: 8818,
		    lotimes: 10804,
		    lozenge: 9674,
		    ltquest: 10875,
		    luruhar: 10598,
		    maltese: 10016,
		    minusdu: 10794,
		    napprox: 8777,
		    natural: 9838,
		    nearrow: 8599,
		    nexists: 8708,
		    notinva: 8713,
		    notinvb: 8951,
		    notinvc: 8950,
		    notniva: 8716,
		    notnivb: 8958,
		    notnivc: 8957,
		    npolint: 10772,
		    nsqsube: 8930,
		    nsqsupe: 8931,
		    nvinfin: 10718,
		    nwarrow: 8598,
		    olcross: 10683,
		    omicron: 959,
		    orderof: 8500,
		    orslope: 10839,
		    pertenk: 8241,
		    planckh: 8462,
		    pluscir: 10786,
		    plussim: 10790,
		    plustwo: 10791,
		    precsim: 8830,
		    quatint: 10774,
		    questeq: 8799,
		    rarrbfs: 10528,
		    rarrsim: 10612,
		    rbrksld: 10638,
		    rbrkslu: 10640,
		    rdldhar: 10601,
		    realine: 8475,
		    rotimes: 10805,
		    ruluhar: 10600,
		    searrow: 8600,
		    simplus: 10788,
		    simrarr: 10610,
		    subedot: 10947,
		    submult: 10945,
		    subplus: 10943,
		    subrarr: 10617,
		    succsim: 8831,
		    supdsub: 10968,
		    supedot: 10948,
		    suphsub: 10967,
		    suplarr: 10619,
		    supmult: 10946,
		    supplus: 10944,
		    swarrow: 8601,
		    topfork: 10970,
		    triplus: 10809,
		    tritime: 10811,
		    uparrow: 8593,
		    upsilon: 965,
		    uwangle: 10663,
		    vzigzag: 10650,
		    zigrarr: 8669,
		    Aacute: 193,
		    Abreve: 258,
		    Agrave: 192,
		    Assign: 8788,
		    Atilde: 195,
		    Barwed: 8966,
		    Bumpeq: 8782,
		    Cacute: 262,
		    Ccaron: 268,
		    Ccedil: 199,
		    Colone: 10868,
		    Conint: 8751,
		    CupCap: 8781,
		    Dagger: 8225,
		    Dcaron: 270,
		    DotDot: 8412,
		    Dstrok: 272,
		    Eacute: 201,
		    Ecaron: 282,
		    Egrave: 200,
		    Exists: 8707,
		    ForAll: 8704,
		    Gammad: 988,
		    Gbreve: 286,
		    Gcedil: 290,
		    HARDcy: 1066,
		    Hstrok: 294,
		    Iacute: 205,
		    Igrave: 204,
		    Itilde: 296,
		    Jsercy: 1032,
		    Kcedil: 310,
		    Lacute: 313,
		    Lambda: 923,
		    Lcaron: 317,
		    Lcedil: 315,
		    Lmidot: 319,
		    Lstrok: 321,
		    Nacute: 323,
		    Ncaron: 327,
		    Ncedil: 325,
		    Ntilde: 209,
		    Oacute: 211,
		    Odblac: 336,
		    Ograve: 210,
		    Oslash: 216,
		    Otilde: 213,
		    Otimes: 10807,
		    Racute: 340,
		    Rarrtl: 10518,
		    Rcaron: 344,
		    Rcedil: 342,
		    SHCHcy: 1065,
		    SOFTcy: 1068,
		    Sacute: 346,
		    Scaron: 352,
		    Scedil: 350,
		    Square: 9633,
		    Subset: 8912,
		    Supset: 8913,
		    Tcaron: 356,
		    Tcedil: 354,
		    Tstrok: 358,
		    Uacute: 218,
		    Ubreve: 364,
		    Udblac: 368,
		    Ugrave: 217,
		    Utilde: 360,
		    Vdashl: 10982,
		    Verbar: 8214,
		    Vvdash: 8874,
		    Yacute: 221,
		    Zacute: 377,
		    Zcaron: 381,
		    aacute: 225,
		    abreve: 259,
		    agrave: 224,
		    andand: 10837,
		    angmsd: 8737,
		    angsph: 8738,
		    apacir: 10863,
		    approx: 8776,
		    atilde: 227,
		    barvee: 8893,
		    barwed: 8965,
		    becaus: 8757,
		    bernou: 8492,
		    bigcap: 8898,
		    bigcup: 8899,
		    bigvee: 8897,
		    bkarow: 10509,
		    bottom: 8869,
		    bowtie: 8904,
		    boxbox: 10697,
		    bprime: 8245,
		    brvbar: 166,
		    bullet: 8226,
		    bumpeq: 8783,
		    cacute: 263,
		    capand: 10820,
		    capcap: 10827,
		    capcup: 10823,
		    capdot: 10816,
		    ccaron: 269,
		    ccedil: 231,
		    circeq: 8791,
		    cirmid: 10991,
		    colone: 8788,
		    commat: 64,
		    compfn: 8728,
		    conint: 8750,
		    coprod: 8720,
		    copysr: 8471,
		    cularr: 8630,
		    cupcap: 10822,
		    cupcup: 10826,
		    cupdot: 8845,
		    curarr: 8631,
		    curren: 164,
		    cylcty: 9005,
		    dagger: 8224,
		    daleth: 8504,
		    dcaron: 271,
		    dfisht: 10623,
		    divide: 247,
		    divonx: 8903,
		    dlcorn: 8990,
		    dlcrop: 8973,
		    dollar: 36,
		    drcorn: 8991,
		    drcrop: 8972,
		    dstrok: 273,
		    eacute: 233,
		    easter: 10862,
		    ecaron: 283,
		    ecolon: 8789,
		    egrave: 232,
		    egsdot: 10904,
		    elsdot: 10903,
		    emptyv: 8709,
		    emsp13: 8196,
		    emsp14: 8197,
		    eparsl: 10723,
		    eqcirc: 8790,
		    equals: 61,
		    equest: 8799,
		    female: 9792,
		    ffilig: 64259,
		    ffllig: 64260,
		    forall: 8704,
		    frac12: 189,
		    frac13: 8531,
		    frac14: 188,
		    frac15: 8533,
		    frac16: 8537,
		    frac18: 8539,
		    frac23: 8532,
		    frac25: 8534,
		    frac34: 190,
		    frac35: 8535,
		    frac38: 8540,
		    frac45: 8536,
		    frac56: 8538,
		    frac58: 8541,
		    frac78: 8542,
		    gacute: 501,
		    gammad: 989,
		    gbreve: 287,
		    gesdot: 10880,
		    gesles: 10900,
		    gtlPar: 10645,
		    gtrarr: 10616,
		    gtrdot: 8919,
		    gtrsim: 8819,
		    hairsp: 8202,
		    hamilt: 8459,
		    hardcy: 1098,
		    hearts: 9829,
		    hellip: 8230,
		    hercon: 8889,
		    homtht: 8763,
		    horbar: 8213,
		    hslash: 8463,
		    hstrok: 295,
		    hybull: 8259,
		    hyphen: 8208,
		    iacute: 237,
		    igrave: 236,
		    iiiint: 10764,
		    iinfin: 10716,
		    incare: 8453,
		    inodot: 305,
		    intcal: 8890,
		    iquest: 191,
		    isinsv: 8947,
		    itilde: 297,
		    jsercy: 1112,
		    kappav: 1008,
		    kcedil: 311,
		    kgreen: 312,
		    lAtail: 10523,
		    lacute: 314,
		    lagran: 8466,
		    lambda: 955,
		    langle: 10216,
		    larrfs: 10525,
		    larrhk: 8617,
		    larrlp: 8619,
		    larrpl: 10553,
		    larrtl: 8610,
		    latail: 10521,
		    lbrace: 123,
		    lbrack: 91,
		    lcaron: 318,
		    lcedil: 316,
		    ldquor: 8222,
		    lesdot: 10879,
		    lesges: 10899,
		    lfisht: 10620,
		    lfloor: 8970,
		    lharul: 10602,
		    llhard: 10603,
		    lmidot: 320,
		    lmoust: 9136,
		    loplus: 10797,
		    lowast: 8727,
		    lowbar: 95,
		    lparlt: 10643,
		    lrhard: 10605,
		    lsaquo: 8249,
		    lsquor: 8218,
		    lstrok: 322,
		    lthree: 8907,
		    ltimes: 8905,
		    ltlarr: 10614,
		    ltrPar: 10646,
		    mapsto: 8614,
		    marker: 9646,
		    mcomma: 10793,
		    midast: 42,
		    midcir: 10992,
		    middot: 183,
		    minusb: 8863,
		    minusd: 8760,
		    mnplus: 8723,
		    models: 8871,
		    mstpos: 8766,
		    nVDash: 8879,
		    nVdash: 8878,
		    nacute: 324,
		    ncaron: 328,
		    ncedil: 326,
		    nearhk: 10532,
		    nequiv: 8802,
		    nesear: 10536,
		    nexist: 8708,
		    nltrie: 8940,
		    nprcue: 8928,
		    nrtrie: 8941,
		    nsccue: 8929,
		    nsimeq: 8772,
		    ntilde: 241,
		    numero: 8470,
		    nvDash: 8877,
		    nvHarr: 10500,
		    nvdash: 8876,
		    nvlArr: 10498,
		    nvrArr: 10499,
		    nwarhk: 10531,
		    nwnear: 10535,
		    oacute: 243,
		    odblac: 337,
		    odsold: 10684,
		    ograve: 242,
		    ominus: 8854,
		    origof: 8886,
		    oslash: 248,
		    otilde: 245,
		    otimes: 8855,
		    parsim: 10995,
		    percnt: 37,
		    period: 46,
		    permil: 8240,
		    phmmat: 8499,
		    planck: 8463,
		    plankv: 8463,
		    plusdo: 8724,
		    plusdu: 10789,
		    plusmn: 177,
		    preceq: 10927,
		    primes: 8473,
		    prnsim: 8936,
		    propto: 8733,
		    prurel: 8880,
		    puncsp: 8200,
		    qprime: 8279,
		    rAtail: 10524,
		    racute: 341,
		    rangle: 10217,
		    rarrap: 10613,
		    rarrfs: 10526,
		    rarrhk: 8618,
		    rarrlp: 8620,
		    rarrpl: 10565,
		    rarrtl: 8611,
		    ratail: 10522,
		    rbrace: 125,
		    rbrack: 93,
		    rcaron: 345,
		    rcedil: 343,
		    rdquor: 8221,
		    rfisht: 10621,
		    rfloor: 8971,
		    rharul: 10604,
		    rmoust: 9137,
		    roplus: 10798,
		    rpargt: 10644,
		    rsaquo: 8250,
		    rsquor: 8217,
		    rthree: 8908,
		    rtimes: 8906,
		    sacute: 347,
		    scaron: 353,
		    scedil: 351,
		    scnsim: 8937,
		    searhk: 10533,
		    seswar: 10537,
		    sfrown: 8994,
		    shchcy: 1097,
		    sigmaf: 962,
		    sigmav: 962,
		    simdot: 10858,
		    smashp: 10803,
		    softcy: 1100,
		    solbar: 9023,
		    spades: 9824,
		    sqsube: 8849,
		    sqsupe: 8850,
		    square: 9633,
		    squarf: 9642,
		    ssetmn: 8726,
		    ssmile: 8995,
		    sstarf: 8902,
		    subdot: 10941,
		    subset: 8834,
		    subsim: 10951,
		    subsub: 10965,
		    subsup: 10963,
		    succeq: 10928,
		    supdot: 10942,
		    supset: 8835,
		    supsim: 10952,
		    supsub: 10964,
		    supsup: 10966,
		    swarhk: 10534,
		    swnwar: 10538,
		    target: 8982,
		    tcaron: 357,
		    tcedil: 355,
		    telrec: 8981,
		    there4: 8756,
		    thetav: 977,
		    thinsp: 8201,
		    thksim: 8764,
		    timesb: 8864,
		    timesd: 10800,
		    topbot: 9014,
		    topcir: 10993,
		    tprime: 8244,
		    tridot: 9708,
		    tstrok: 359,
		    uacute: 250,
		    ubreve: 365,
		    udblac: 369,
		    ufisht: 10622,
		    ugrave: 249,
		    ulcorn: 8988,
		    ulcrop: 8975,
		    urcorn: 8989,
		    urcrop: 8974,
		    utilde: 361,
		    vangrt: 10652,
		    varphi: 966,
		    varrho: 1009,
		    veebar: 8891,
		    vellip: 8942,
		    verbar: 124,
		    wedbar: 10847,
		    wedgeq: 8793,
		    weierp: 8472,
		    wreath: 8768,
		    xoplus: 10753,
		    xotime: 10754,
		    xsqcup: 10758,
		    xuplus: 10756,
		    xwedge: 8896,
		    yacute: 253,
		    zacute: 378,
		    zcaron: 382,
		    zeetrf: 8488,
		    AElig: 198,
		    Acirc: 194,
		    Alpha: 913,
		    Amacr: 256,
		    Aogon: 260,
		    Aring: 197,
		    Breve: 728,
		    Ccirc: 264,
		    Colon: 8759,
		    Cross: 10799,
		    Dashv: 10980,
		    Delta: 916,
		    Ecirc: 202,
		    Emacr: 274,
		    Eogon: 280,
		    Equal: 10869,
		    Gamma: 915,
		    Gcirc: 284,
		    Hacek: 711,
		    Hcirc: 292,
		    IJlig: 306,
		    Icirc: 206,
		    Imacr: 298,
		    Iogon: 302,
		    Iukcy: 1030,
		    Jcirc: 308,
		    Jukcy: 1028,
		    Kappa: 922,
		    OElig: 338,
		    Ocirc: 212,
		    Omacr: 332,
		    Omega: 937,
		    Prime: 8243,
		    RBarr: 10512,
		    Scirc: 348,
		    Sigma: 931,
		    THORN: 222,
		    TRADE: 8482,
		    TSHcy: 1035,
		    Theta: 920,
		    Tilde: 8764,
		    Ubrcy: 1038,
		    Ucirc: 219,
		    Umacr: 362,
		    Union: 8899,
		    Uogon: 370,
		    UpTee: 8869,
		    Uring: 366,
		    VDash: 8875,
		    Vdash: 8873,
		    Wcirc: 372,
		    Wedge: 8896,
		    Ycirc: 374,
		    acirc: 226,
		    acute: 180,
		    aelig: 230,
		    aleph: 8501,
		    alpha: 945,
		    amacr: 257,
		    amalg: 10815,
		    angle: 8736,
		    angrt: 8735,
		    angst: 8491,
		    aogon: 261,
		    aring: 229,
		    asymp: 8776,
		    awint: 10769,
		    bcong: 8780,
		    bdquo: 8222,
		    bepsi: 1014,
		    blank: 9251,
		    blk12: 9618,
		    blk14: 9617,
		    blk34: 9619,
		    block: 9608,
		    boxDL: 9559,
		    boxDR: 9556,
		    boxDl: 9558,
		    boxDr: 9555,
		    boxHD: 9574,
		    boxHU: 9577,
		    boxHd: 9572,
		    boxHu: 9575,
		    boxUL: 9565,
		    boxUR: 9562,
		    boxUl: 9564,
		    boxUr: 9561,
		    boxVH: 9580,
		    boxVL: 9571,
		    boxVR: 9568,
		    boxVh: 9579,
		    boxVl: 9570,
		    boxVr: 9567,
		    boxdL: 9557,
		    boxdR: 9554,
		    boxdl: 9488,
		    boxdr: 9484,
		    boxhD: 9573,
		    boxhU: 9576,
		    boxhd: 9516,
		    boxhu: 9524,
		    boxuL: 9563,
		    boxuR: 9560,
		    boxul: 9496,
		    boxur: 9492,
		    boxvH: 9578,
		    boxvL: 9569,
		    boxvR: 9566,
		    boxvh: 9532,
		    boxvl: 9508,
		    boxvr: 9500,
		    breve: 728,
		    bsemi: 8271,
		    bsime: 8909,
		    bsolb: 10693,
		    bumpE: 10926,
		    bumpe: 8783,
		    caret: 8257,
		    caron: 711,
		    ccaps: 10829,
		    ccirc: 265,
		    ccups: 10828,
		    cedil: 184,
		    check: 10003,
		    clubs: 9827,
		    colon: 58,
		    comma: 44,
		    crarr: 8629,
		    cross: 10007,
		    csube: 10961,
		    csupe: 10962,
		    ctdot: 8943,
		    cuepr: 8926,
		    cuesc: 8927,
		    cupor: 10821,
		    cuvee: 8910,
		    cuwed: 8911,
		    cwint: 8753,
		    dashv: 8867,
		    dblac: 733,
		    ddarr: 8650,
		    delta: 948,
		    dharl: 8643,
		    dharr: 8642,
		    diams: 9830,
		    disin: 8946,
		    doteq: 8784,
		    dtdot: 8945,
		    dtrif: 9662,
		    duarr: 8693,
		    duhar: 10607,
		    eDDot: 10871,
		    ecirc: 234,
		    efDot: 8786,
		    emacr: 275,
		    empty: 8709,
		    eogon: 281,
		    eplus: 10865,
		    epsiv: 949,
		    eqsim: 8770,
		    equiv: 8801,
		    erDot: 8787,
		    erarr: 10609,
		    esdot: 8784,
		    exist: 8707,
		    fflig: 64256,
		    filig: 64257,
		    fllig: 64258,
		    fltns: 9649,
		    forkv: 10969,
		    frasl: 8260,
		    frown: 8994,
		    gamma: 947,
		    gcirc: 285,
		    gescc: 10921,
		    gimel: 8503,
		    gneqq: 8809,
		    gnsim: 8935,
		    grave: 96,
		    gsime: 10894,
		    gsiml: 10896,
		    gtcir: 10874,
		    gtdot: 8919,
		    harrw: 8621,
		    hcirc: 293,
		    hoarr: 8703,
		    icirc: 238,
		    iexcl: 161,
		    iiint: 8749,
		    iiota: 8489,
		    ijlig: 307,
		    imacr: 299,
		    image: 8465,
		    imath: 305,
		    imped: 437,
		    infin: 8734,
		    iogon: 303,
		    iprod: 10812,
		    isinE: 8953,
		    isins: 8948,
		    isinv: 8712,
		    iukcy: 1110,
		    jcirc: 309,
		    jmath: 567,
		    jukcy: 1108,
		    kappa: 954,
		    lAarr: 8666,
		    lBarr: 10510,
		    langd: 10641,
		    laquo: 171,
		    larrb: 8676,
		    lbarr: 10508,
		    lbbrk: 10098,
		    lbrke: 10635,
		    lceil: 8968,
		    ldquo: 8220,
		    lescc: 10920,
		    lhard: 8637,
		    lharu: 8636,
		    lhblk: 9604,
		    llarr: 8647,
		    lltri: 9722,
		    lneqq: 8808,
		    lnsim: 8934,
		    loang: 10220,
		    loarr: 8701,
		    lobrk: 10214,
		    lopar: 10629,
		    lrarr: 8646,
		    lrhar: 8651,
		    lrtri: 8895,
		    lsime: 10893,
		    lsimg: 10895,
		    lsquo: 8216,
		    ltcir: 10873,
		    ltdot: 8918,
		    ltrie: 8884,
		    ltrif: 9666,
		    mDDot: 8762,
		    mdash: 8212,
		    micro: 181,
		    minus: 8722,
		    mumap: 8888,
		    nabla: 8711,
		    napos: 329,
		    natur: 9838,
		    ncong: 8775,
		    ndash: 8211,
		    neArr: 8663,
		    nearr: 8599,
		    ngsim: 8821,
		    nhArr: 8654,
		    nharr: 8622,
		    nhpar: 10994,
		    nlArr: 8653,
		    nlarr: 8602,
		    nless: 8814,
		    nlsim: 8820,
		    nltri: 8938,
		    notin: 8713,
		    notni: 8716,
		    nprec: 8832,
		    nrArr: 8655,
		    nrarr: 8603,
		    nrtri: 8939,
		    nsime: 8772,
		    nsmid: 8740,
		    nspar: 8742,
		    nsube: 8840,
		    nsucc: 8833,
		    nsupe: 8841,
		    numsp: 8199,
		    nwArr: 8662,
		    nwarr: 8598,
		    ocirc: 244,
		    odash: 8861,
		    oelig: 339,
		    ofcir: 10687,
		    ohbar: 10677,
		    olarr: 8634,
		    olcir: 10686,
		    oline: 8254,
		    omacr: 333,
		    omega: 969,
		    operp: 10681,
		    oplus: 8853,
		    orarr: 8635,
		    order: 8500,
		    ovbar: 9021,
		    parsl: 11005,
		    phone: 9742,
		    plusb: 8862,
		    pluse: 10866,
		    pound: 163,
		    prcue: 8828,
		    prime: 8242,
		    prnap: 10937,
		    prsim: 8830,
		    quest: 63,
		    rAarr: 8667,
		    rBarr: 10511,
		    radic: 8730,
		    rangd: 10642,
		    range: 10661,
		    raquo: 187,
		    rarrb: 8677,
		    rarrc: 10547,
		    rarrw: 8605,
		    ratio: 8758,
		    rbarr: 10509,
		    rbbrk: 10099,
		    rbrke: 10636,
		    rceil: 8969,
		    rdquo: 8221,
		    reals: 8477,
		    rhard: 8641,
		    rharu: 8640,
		    rlarr: 8644,
		    rlhar: 8652,
		    rnmid: 10990,
		    roang: 10221,
		    roarr: 8702,
		    robrk: 10215,
		    ropar: 10630,
		    rrarr: 8649,
		    rsquo: 8217,
		    rtrie: 8885,
		    rtrif: 9656,
		    sbquo: 8218,
		    sccue: 8829,
		    scirc: 349,
		    scnap: 10938,
		    scsim: 8831,
		    sdotb: 8865,
		    sdote: 10854,
		    seArr: 8664,
		    searr: 8600,
		    setmn: 8726,
		    sharp: 9839,
		    sigma: 963,
		    simeq: 8771,
		    simgE: 10912,
		    simlE: 10911,
		    simne: 8774,
		    slarr: 8592,
		    smile: 8995,
		    sqcap: 8851,
		    sqcup: 8852,
		    sqsub: 8847,
		    sqsup: 8848,
		    srarr: 8594,
		    starf: 9733,
		    strns: 175,
		    subnE: 10955,
		    subne: 8842,
		    supnE: 10956,
		    supne: 8843,
		    swArr: 8665,
		    swarr: 8601,
		    szlig: 223,
		    theta: 952,
		    thkap: 8776,
		    thorn: 254,
		    tilde: 732,
		    times: 215,
		    trade: 8482,
		    trisb: 10701,
		    tshcy: 1115,
		    twixt: 8812,
		    ubrcy: 1118,
		    ucirc: 251,
		    udarr: 8645,
		    udhar: 10606,
		    uharl: 8639,
		    uharr: 8638,
		    uhblk: 9600,
		    ultri: 9720,
		    umacr: 363,
		    uogon: 371,
		    uplus: 8846,
		    upsih: 978,
		    uring: 367,
		    urtri: 9721,
		    utdot: 8944,
		    utrif: 9652,
		    uuarr: 8648,
		    vBarv: 10985,
		    vDash: 8872,
		    varpi: 982,
		    vdash: 8866,
		    veeeq: 8794,
		    vltri: 8882,
		    vprop: 8733,
		    vrtri: 8883,
		    wcirc: 373,
		    wedge: 8743,
		    xcirc: 9711,
		    xdtri: 9661,
		    xhArr: 10234,
		    xharr: 10231,
		    xlArr: 10232,
		    xlarr: 10229,
		    xodot: 10752,
		    xrArr: 10233,
		    xrarr: 10230,
		    xutri: 9651,
		    ycirc: 375,
		    Aopf: 120120,
		    Ascr: 119964,
		    Auml: 196,
		    Barv: 10983,
		    Beta: 914,
		    Bopf: 120121,
		    Bscr: 8492,
		    CHcy: 1063,
		    COPY: 169,
		    Cdot: 266,
		    Copf: 8450,
		    Cscr: 119966,
		    DJcy: 1026,
		    DScy: 1029,
		    DZcy: 1039,
		    Darr: 8609,
		    Dopf: 120123,
		    Dscr: 119967,
		    Edot: 278,
		    Eopf: 120124,
		    Escr: 8496,
		    Esim: 10867,
		    Euml: 203,
		    Fopf: 120125,
		    Fscr: 8497,
		    GJcy: 1027,
		    Gdot: 288,
		    Gopf: 120126,
		    Gscr: 119970,
		    Hopf: 8461,
		    Hscr: 8459,
		    IEcy: 1045,
		    IOcy: 1025,
		    Idot: 304,
		    Iopf: 120128,
		    Iota: 921,
		    Iscr: 8464,
		    Iuml: 207,
		    Jopf: 120129,
		    Jscr: 119973,
		    KHcy: 1061,
		    KJcy: 1036,
		    Kopf: 120130,
		    Kscr: 119974,
		    LJcy: 1033,
		    Lang: 10218,
		    Larr: 8606,
		    Lopf: 120131,
		    Lscr: 8466,
		    Mopf: 120132,
		    Mscr: 8499,
		    NJcy: 1034,
		    Nopf: 8469,
		    Nscr: 119977,
		    Oopf: 120134,
		    Oscr: 119978,
		    Ouml: 214,
		    Popf: 8473,
		    Pscr: 119979,
		    QUOT: 34,
		    Qopf: 8474,
		    Qscr: 119980,
		    Rang: 10219,
		    Rarr: 8608,
		    Ropf: 8477,
		    Rscr: 8475,
		    SHcy: 1064,
		    Sopf: 120138,
		    Sqrt: 8730,
		    Sscr: 119982,
		    Star: 8902,
		    TScy: 1062,
		    Topf: 120139,
		    Tscr: 119983,
		    Uarr: 8607,
		    Uopf: 120140,
		    Upsi: 978,
		    Uscr: 119984,
		    Uuml: 220,
		    Vbar: 10987,
		    Vert: 8214,
		    Vopf: 120141,
		    Vscr: 119985,
		    Wopf: 120142,
		    Wscr: 119986,
		    Xopf: 120143,
		    Xscr: 119987,
		    YAcy: 1071,
		    YIcy: 1031,
		    YUcy: 1070,
		    Yopf: 120144,
		    Yscr: 119988,
		    Yuml: 376,
		    ZHcy: 1046,
		    Zdot: 379,
		    Zeta: 918,
		    Zopf: 8484,
		    Zscr: 119989,
		    andd: 10844,
		    andv: 10842,
		    ange: 10660,
		    aopf: 120146,
		    apid: 8779,
		    apos: 39,
		    ascr: 119990,
		    auml: 228,
		    bNot: 10989,
		    bbrk: 9141,
		    beta: 946,
		    beth: 8502,
		    bnot: 8976,
		    bopf: 120147,
		    boxH: 9552,
		    boxV: 9553,
		    boxh: 9472,
		    boxv: 9474,
		    bscr: 119991,
		    bsim: 8765,
		    bsol: 92,
		    bull: 8226,
		    bump: 8782,
		    cdot: 267,
		    cent: 162,
		    chcy: 1095,
		    cirE: 10691,
		    circ: 710,
		    cire: 8791,
		    comp: 8705,
		    cong: 8773,
		    copf: 120148,
		    copy: 169,
		    cscr: 119992,
		    csub: 10959,
		    csup: 10960,
		    dArr: 8659,
		    dHar: 10597,
		    darr: 8595,
		    dash: 8208,
		    diam: 8900,
		    djcy: 1106,
		    dopf: 120149,
		    dscr: 119993,
		    dscy: 1109,
		    dsol: 10742,
		    dtri: 9663,
		    dzcy: 1119,
		    eDot: 8785,
		    ecir: 8790,
		    edot: 279,
		    emsp: 8195,
		    ensp: 8194,
		    eopf: 120150,
		    epar: 8917,
		    epsi: 1013,
		    escr: 8495,
		    esim: 8770,
		    euml: 235,
		    euro: 8364,
		    excl: 33,
		    flat: 9837,
		    fnof: 402,
		    fopf: 120151,
		    fork: 8916,
		    fscr: 119995,
		    gdot: 289,
		    geqq: 8807,
		    gjcy: 1107,
		    gnap: 10890,
		    gneq: 10888,
		    gopf: 120152,
		    gscr: 8458,
		    gsim: 8819,
		    gtcc: 10919,
		    hArr: 8660,
		    half: 189,
		    harr: 8596,
		    hbar: 8463,
		    hopf: 120153,
		    hscr: 119997,
		    iecy: 1077,
		    imof: 8887,
		    iocy: 1105,
		    iopf: 120154,
		    iota: 953,
		    iscr: 119998,
		    isin: 8712,
		    iuml: 239,
		    jopf: 120155,
		    jscr: 119999,
		    khcy: 1093,
		    kjcy: 1116,
		    kopf: 120156,
		    kscr: 120000,
		    lArr: 8656,
		    lHar: 10594,
		    lang: 10216,
		    larr: 8592,
		    late: 10925,
		    lcub: 123,
		    ldca: 10550,
		    ldsh: 8626,
		    leqq: 8806,
		    ljcy: 1113,
		    lnap: 10889,
		    lneq: 10887,
		    lopf: 120157,
		    lozf: 10731,
		    lpar: 40,
		    lscr: 120001,
		    lsim: 8818,
		    lsqb: 91,
		    ltcc: 10918,
		    ltri: 9667,
		    macr: 175,
		    male: 9794,
		    malt: 10016,
		    mlcp: 10971,
		    mldr: 8230,
		    mopf: 120158,
		    mscr: 120002,
		    nbsp: 160,
		    ncap: 10819,
		    ncup: 10818,
		    ngeq: 8817,
		    ngtr: 8815,
		    nisd: 8954,
		    njcy: 1114,
		    nldr: 8229,
		    nleq: 8816,
		    nmid: 8740,
		    nopf: 120159,
		    npar: 8742,
		    nscr: 120003,
		    nsim: 8769,
		    nsub: 8836,
		    nsup: 8837,
		    ntgl: 8825,
		    ntlg: 8824,
		    oast: 8859,
		    ocir: 8858,
		    odiv: 10808,
		    odot: 8857,
		    ogon: 731,
		    oint: 8750,
		    omid: 10678,
		    oopf: 120160,
		    opar: 10679,
		    ordf: 170,
		    ordm: 186,
		    oror: 10838,
		    oscr: 8500,
		    osol: 8856,
		    ouml: 246,
		    para: 182,
		    part: 8706,
		    perp: 8869,
		    phiv: 966,
		    plus: 43,
		    popf: 120161,
		    prap: 10935,
		    prec: 8826,
		    prnE: 10933,
		    prod: 8719,
		    prop: 8733,
		    pscr: 120005,
		    qint: 10764,
		    qopf: 120162,
		    qscr: 120006,
		    quot: 34,
		    rArr: 8658,
		    rHar: 10596,
		    race: 10714,
		    rang: 10217,
		    rarr: 8594,
		    rcub: 125,
		    rdca: 10551,
		    rdsh: 8627,
		    real: 8476,
		    rect: 9645,
		    rhov: 1009,
		    ring: 730,
		    ropf: 120163,
		    rpar: 41,
		    rscr: 120007,
		    rsqb: 93,
		    rtri: 9657,
		    scap: 10936,
		    scnE: 10934,
		    sdot: 8901,
		    sect: 167,
		    semi: 59,
		    sext: 10038,
		    shcy: 1096,
		    sime: 8771,
		    simg: 10910,
		    siml: 10909,
		    smid: 8739,
		    smte: 10924,
		    solb: 10692,
		    sopf: 120164,
		    spar: 8741,
		    squf: 9642,
		    sscr: 120008,
		    star: 9734,
		    subE: 10949,
		    sube: 8838,
		    succ: 8827,
		    sung: 9834,
		    sup1: 185,
		    sup2: 178,
		    sup3: 179,
		    supE: 10950,
		    supe: 8839,
		    tbrk: 9140,
		    tdot: 8411,
		    tint: 8749,
		    toea: 10536,
		    topf: 120165,
		    tosa: 10537,
		    trie: 8796,
		    tscr: 120009,
		    tscy: 1094,
		    uArr: 8657,
		    uHar: 10595,
		    uarr: 8593,
		    uopf: 120166,
		    upsi: 965,
		    uscr: 120010,
		    utri: 9653,
		    uuml: 252,
		    vArr: 8661,
		    vBar: 10984,
		    varr: 8597,
		    vert: 124,
		    vopf: 120167,
		    vscr: 120011,
		    wopf: 120168,
		    wscr: 120012,
		    xcap: 8898,
		    xcup: 8899,
		    xmap: 10236,
		    xnis: 8955,
		    xopf: 120169,
		    xscr: 120013,
		    xvee: 8897,
		    yacy: 1103,
		    yicy: 1111,
		    yopf: 120170,
		    yscr: 120014,
		    yucy: 1102,
		    yuml: 255,
		    zdot: 380,
		    zeta: 950,
		    zhcy: 1078,
		    zopf: 120171,
		    zscr: 120015,
		    zwnj: 8204,
		    AMP: 38,
		    Acy: 1040,
		    Afr: 120068,
		    And: 10835,
		    Bcy: 1041,
		    Bfr: 120069,
		    Cap: 8914,
		    Cfr: 8493,
		    Chi: 935,
		    Cup: 8915,
		    Dcy: 1044,
		    Del: 8711,
		    Dfr: 120071,
		    Dot: 168,
		    ENG: 330,
		    ETH: 208,
		    Ecy: 1069,
		    Efr: 120072,
		    Eta: 919,
		    Fcy: 1060,
		    Ffr: 120073,
		    Gcy: 1043,
		    Gfr: 120074,
		    Hat: 94,
		    Hfr: 8460,
		    Icy: 1048,
		    Ifr: 8465,
		    Int: 8748,
		    Jcy: 1049,
		    Jfr: 120077,
		    Kcy: 1050,
		    Kfr: 120078,
		    Lcy: 1051,
		    Lfr: 120079,
		    Lsh: 8624,
		    Map: 10501,
		    Mcy: 1052,
		    Mfr: 120080,
		    Ncy: 1053,
		    Nfr: 120081,
		    Not: 10988,
		    Ocy: 1054,
		    Ofr: 120082,
		    Pcy: 1055,
		    Pfr: 120083,
		    Phi: 934,
		    Psi: 936,
		    Qfr: 120084,
		    REG: 174,
		    Rcy: 1056,
		    Rfr: 8476,
		    Rho: 929,
		    Rsh: 8625,
		    Scy: 1057,
		    Sfr: 120086,
		    Sub: 8912,
		    Sum: 8721,
		    Sup: 8913,
		    Tab: 9,
		    Tau: 932,
		    Tcy: 1058,
		    Tfr: 120087,
		    Ucy: 1059,
		    Ufr: 120088,
		    Vcy: 1042,
		    Vee: 8897,
		    Vfr: 120089,
		    Wfr: 120090,
		    Xfr: 120091,
		    Ycy: 1067,
		    Yfr: 120092,
		    Zcy: 1047,
		    Zfr: 8488,
		    acd: 8767,
		    acy: 1072,
		    afr: 120094,
		    amp: 38,
		    and: 8743,
		    ang: 8736,
		    apE: 10864,
		    ape: 8778,
		    ast: 42,
		    bcy: 1073,
		    bfr: 120095,
		    bot: 8869,
		    cap: 8745,
		    cfr: 120096,
		    chi: 967,
		    cir: 9675,
		    cup: 8746,
		    dcy: 1076,
		    deg: 176,
		    dfr: 120097,
		    die: 168,
		    div: 247,
		    dot: 729,
		    ecy: 1101,
		    efr: 120098,
		    egs: 10902,
		    ell: 8467,
		    els: 10901,
		    eng: 331,
		    eta: 951,
		    eth: 240,
		    fcy: 1092,
		    ffr: 120099,
		    gEl: 10892,
		    gap: 10886,
		    gcy: 1075,
		    gel: 8923,
		    geq: 8805,
		    ges: 10878,
		    gfr: 120100,
		    ggg: 8921,
		    glE: 10898,
		    gla: 10917,
		    glj: 10916,
		    gnE: 8809,
		    gne: 10888,
		    hfr: 120101,
		    icy: 1080,
		    iff: 8660,
		    ifr: 120102,
		    int: 8747,
		    jcy: 1081,
		    jfr: 120103,
		    kcy: 1082,
		    kfr: 120104,
		    lEg: 10891,
		    lap: 10885,
		    lat: 10923,
		    lcy: 1083,
		    leg: 8922,
		    leq: 8804,
		    les: 10877,
		    lfr: 120105,
		    lgE: 10897,
		    lnE: 8808,
		    lne: 10887,
		    loz: 9674,
		    lrm: 8206,
		    lsh: 8624,
		    map: 8614,
		    mcy: 1084,
		    mfr: 120106,
		    mho: 8487,
		    mid: 8739,
		    nap: 8777,
		    ncy: 1085,
		    nfr: 120107,
		    nge: 8817,
		    ngt: 8815,
		    nis: 8956,
		    niv: 8715,
		    nle: 8816,
		    nlt: 8814,
		    not: 172,
		    npr: 8832,
		    nsc: 8833,
		    num: 35,
		    ocy: 1086,
		    ofr: 120108,
		    ogt: 10689,
		    ohm: 8486,
		    olt: 10688,
		    ord: 10845,
		    orv: 10843,
		    par: 8741,
		    pcy: 1087,
		    pfr: 120109,
		    phi: 966,
		    piv: 982,
		    prE: 10931,
		    pre: 10927,
		    psi: 968,
		    qfr: 120110,
		    rcy: 1088,
		    reg: 174,
		    rfr: 120111,
		    rho: 961,
		    rlm: 8207,
		    rsh: 8625,
		    scE: 10932,
		    sce: 10928,
		    scy: 1089,
		    sfr: 120112,
		    shy: 173,
		    sim: 8764,
		    smt: 10922,
		    sol: 47,
		    squ: 9633,
		    sub: 8834,
		    sum: 8721,
		    sup: 8835,
		    tau: 964,
		    tcy: 1090,
		    tfr: 120113,
		    top: 8868,
		    ucy: 1091,
		    ufr: 120114,
		    uml: 168,
		    vcy: 1074,
		    vee: 8744,
		    vfr: 120115,
		    wfr: 120116,
		    xfr: 120117,
		    ycy: 1099,
		    yen: 165,
		    yfr: 120118,
		    zcy: 1079,
		    zfr: 120119,
		    zwj: 8205,
		    DD: 8517,
		    GT: 62,
		    Gg: 8921,
		    Gt: 8811,
		    Im: 8465,
		    LT: 60,
		    Ll: 8920,
		    Lt: 8810,
		    Mu: 924,
		    Nu: 925,
		    Or: 10836,
		    Pi: 928,
		    Pr: 10939,
		    Re: 8476,
		    Sc: 10940,
		    Xi: 926,
		    ac: 8766,
		    af: 8289,
		    ap: 8776,
		    dd: 8518,
		    ee: 8519,
		    eg: 10906,
		    el: 10905,
		    gE: 8807,
		    ge: 8805,
		    gg: 8811,
		    gl: 8823,
		    gt: 62,
		    ic: 8291,
		    ii: 8520,
		    in: 8712,
		    it: 8290,
		    lE: 8806,
		    le: 8804,
		    lg: 8822,
		    ll: 8810,
		    lt: 60,
		    mp: 8723,
		    mu: 956,
		    ne: 8800,
		    ni: 8715,
		    nu: 957,
		    oS: 9416,
		    or: 8744,
		    pi: 960,
		    pm: 177,
		    pr: 8826,
		    rx: 8478,
		    sc: 8827,
		    wp: 8472,
		    wr: 8768,
		    xi: 958,
		};

		const windows1252 = [
		    8364,
		    129,
		    8218,
		    402,
		    8222,
		    8230,
		    8224,
		    8225,
		    710,
		    8240,
		    352,
		    8249,
		    338,
		    141,
		    381,
		    143,
		    144,
		    8216,
		    8217,
		    8220,
		    8221,
		    8226,
		    8211,
		    8212,
		    732,
		    8482,
		    353,
		    8250,
		    339,
		    157,
		    382,
		    376,
		];
		const entityPattern = new RegExp(`&(#?(?:x[\\w\\d]+|\\d+|${Object.keys(htmlEntities).join('|')}));?`, 'g');
		function decodeCharacterReferences(html) {
		    return html.replace(entityPattern, (match, entity) => {
		        let code;
		        // Handle named entities
		        if (entity[0] !== '#') {
		            code = htmlEntities[entity];
		        }
		        else if (entity[1] === 'x') {
		            code = parseInt(entity.substring(2), 16);
		        }
		        else {
		            code = parseInt(entity.substring(1), 10);
		        }
		        if (!code) {
		            return match;
		        }
		        return String.fromCodePoint(validateCode(code));
		    });
		}
		const NUL = 0;
		// some code points are verboten. If we were inserting HTML, the browser would replace the illegal
		// code points with alternatives in some cases - since we're bypassing that mechanism, we need
		// to replace them ourselves
		//
		// Source: http://en.wikipedia.org/wiki/Character_encodings_in_HTML#Illegal_characters
		function validateCode(code) {
		    // line feed becomes generic whitespace
		    if (code === 10) {
		        return 32;
		    }
		    // ASCII range. (Why someone would use HTML entities for ASCII characters I don't know, but...)
		    if (code < 128) {
		        return code;
		    }
		    // code points 128-159 are dealt with leniently by browsers, but they're incorrect. We need
		    // to correct the mistake or we'll end up with missing € signs and so on
		    if (code <= 159) {
		        return windows1252[code - 128];
		    }
		    // basic multilingual plane
		    if (code < 55296) {
		        return code;
		    }
		    // UTF-16 surrogate halves
		    if (code <= 57343) {
		        return NUL;
		    }
		    // rest of the basic multilingual plane
		    if (code <= 65535) {
		        return code;
		    }
		    // supplementary multilingual plane 0x10000 - 0x1ffff
		    if (code >= 65536 && code <= 131071) {
		        return code;
		    }
		    // supplementary ideographic plane 0x20000 - 0x2ffff
		    if (code >= 131072 && code <= 196607) {
		        return code;
		    }
		    return NUL;
		}

		const voidElementNames = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
		function isVoidElementName(name) {
		    return voidElementNames.test(name) || name.toLowerCase() === '!doctype';
		}

		const validTagName = /^\!?[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/;
		const metaTags = new Map([
		    ['svelte:document', 'Document'],
		    ['svelte:window', 'Window'],
		    ['svelte:head', 'Head']
		]);
		const specials = new Map([
		    [
		        'script',
		        {
		            read: readScript,
		            property: 'js',
		        },
		    ],
		    [
		        'style',
		        {
		            read: readStyle,
		            property: 'css',
		        },
		    ],
		]);
		const SELF = 'svelte:self';
		const COMPONENT = 'svelte:component';
		// based on http://developers.whatwg.org/syntax.html#syntax-tag-omission
		const disallowedContents = new Map([
		    ['li', new Set(['li'])],
		    ['dt', new Set(['dt', 'dd'])],
		    ['dd', new Set(['dt', 'dd'])],
		    [
		        'p',
		        new Set('address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul'.split(' ')),
		    ],
		    ['rt', new Set(['rt', 'rp'])],
		    ['rp', new Set(['rt', 'rp'])],
		    ['optgroup', new Set(['optgroup'])],
		    ['option', new Set(['option', 'optgroup'])],
		    ['thead', new Set(['tbody', 'tfoot'])],
		    ['tbody', new Set(['tbody', 'tfoot'])],
		    ['tfoot', new Set(['tbody'])],
		    ['tr', new Set(['tr', 'tbody'])],
		    ['td', new Set(['td', 'th', 'tr'])],
		    ['th', new Set(['td', 'th', 'tr'])],
		]);
		function parentIsHead(stack) {
		    let i = stack.length;
		    while (i--) {
		        const { type } = stack[i];
		        if (type === 'Head')
		            return true;
		        if (type === 'Element' || type === 'InlineComponent')
		            return false;
		    }
		    return false;
		}
		function tag(parser) {
		    const start = parser.index++;
		    let parent = parser.current();
		    if (parser.eat('!--')) {
		        const data = parser.readUntil(/-->/);
		        parser.eat('-->', true, 'comment was left open, expected -->');
		        parser.current().children.push({
		            start,
		            end: parser.index,
		            type: 'Comment',
		            data,
		        });
		        return;
		    }
		    const isClosingTag = parser.eat('/');
		    const name = readTagName(parser);
		    if (metaTags.has(name)) {
		        const slug = metaTags.get(name).toLowerCase();
		        if (isClosingTag) {
		            if ((name === 'svelte:window' || name === 'svelte:document') &&
		                parser.current().children.length) {
		                parser.error({
		                    code: `invalid-${name.slice(7)}-content`,
		                    message: `<${name}> cannot have children`
		                }, parser.current().children[0].start);
		            }
		        }
		        else {
		            if (name in parser.metaTags) {
		                parser.error({
		                    code: `duplicate-${slug}`,
		                    message: `A component can only have one <${name}> tag`
		                }, start);
		            }
		            if (parser.stack.length > 1) {
		                parser.error({
		                    code: `invalid-${slug}-placement`,
		                    message: `<${name}> tags cannot be inside elements or blocks`
		                }, start);
		            }
		            parser.metaTags[name] = true;
		        }
		    }
		    const type = metaTags.has(name)
		        ? metaTags.get(name)
		        : (/[A-Z]/.test(name[0]) || name === 'svelte:self' || name === 'svelte:component') ? 'InlineComponent'
		            : name === 'title' && parentIsHead(parser.stack) ? 'Title'
		                : name === 'slot' && !parser.customElement ? 'Slot' : 'Element';
		    const element = {
		        start,
		        end: null,
		        type,
		        name,
		        attributes: [],
		        children: [],
		    };
		    parser.allowWhitespace();
		    if (isClosingTag) {
		        if (isVoidElementName(name)) {
		            parser.error({
		                code: `invalid-void-content`,
		                message: `<${name}> is a void element and cannot have children, or a closing tag`
		            }, start);
		        }
		        parser.eat('>', true);
		        // close any elements that don't have their own closing tags, e.g. <div><p></div>
		        while (parent.name !== name) {
		            if (parent.type !== 'Element')
		                parser.error({
		                    code: `invalid-closing-tag`,
		                    message: `</${name}> attempted to close an element that was not open`
		                }, start);
		            parent.end = start;
		            parser.stack.pop();
		            parent = parser.current();
		        }
		        parent.end = parser.index;
		        parser.stack.pop();
		        return;
		    }
		    else if (disallowedContents.has(parent.name)) {
		        // can this be a child of the parent element, or does it implicitly
		        // close it, like `<li>one<li>two`?
		        if (disallowedContents.get(parent.name).has(name)) {
		            parent.end = start;
		            parser.stack.pop();
		        }
		    }
		    if (name === 'slot') {
		        let i = parser.stack.length;
		        while (i--) {
		            const item = parser.stack[i];
		            if (item.type === 'EachBlock') {
		                parser.error({
		                    code: `invalid-slot-placement`,
		                    message: `<slot> cannot be a child of an each-block`
		                }, start);
		            }
		        }
		    }
		    const uniqueNames = new Set();
		    let attribute;
		    while ((attribute = readAttribute(parser, uniqueNames))) {
		        if (attribute.type === 'Binding' && !parser.allowBindings) {
		            parser.error({
		                code: `binding-disabled`,
		                message: `Two-way binding is disabled`
		            }, attribute.start);
		        }
		        element.attributes.push(attribute);
		        parser.allowWhitespace();
		    }
		    if (name === 'svelte:component') {
		        // TODO post v2, treat this just as any other attribute
		        const index = element.attributes.findIndex(attr => attr.name === 'this');
		        if (!~index) {
		            parser.error({
		                code: `missing-component-definition`,
		                message: `<svelte:component> must have a 'this' attribute`
		            }, start);
		        }
		        const definition = element.attributes.splice(index, 1)[0];
		        if (definition.value === true || definition.value.length !== 1 || definition.value[0].type === 'Text') {
		            parser.error({
		                code: `invalid-component-definition`,
		                message: `invalid component definition`
		            }, definition.start);
		        }
		        element.expression = definition.value[0].expression;
		    }
		    // special cases – top-level <script> and <style>
		    if (specials.has(name) && parser.stack.length === 1) {
		        const special = specials.get(name);
		        if (parser[special.property]) {
		            parser.index = start;
		            parser.error({
		                code: `duplicate-${name}`,
		                message: `You can only have one top-level <${name}> tag per component`
		            });
		        }
		        parser.eat('>', true);
		        parser[special.property] = special.read(parser, start, element.attributes);
		        return;
		    }
		    parser.current().children.push(element);
		    const selfClosing = parser.eat('/') || isVoidElementName(name);
		    parser.eat('>', true);
		    if (selfClosing) {
		        // don't push self-closing elements onto the stack
		        element.end = parser.index;
		    }
		    else if (name === 'textarea') {
		        // special case
		        element.children = readSequence$1(parser, () => parser.template.slice(parser.index, parser.index + 11) === '</textarea>');
		        parser.read(/<\/textarea>/);
		        element.end = parser.index;
		    }
		    else if (name === 'script') {
		        // special case
		        const start = parser.index;
		        const data = parser.readUntil(/<\/script>/);
		        const end = parser.index;
		        element.children.push({ start, end, type: 'Text', data });
		        parser.eat('</script>', true);
		        element.end = parser.index;
		    }
		    else if (name === 'style') {
		        // special case
		        const start = parser.index;
		        const data = parser.readUntil(/<\/style>/);
		        const end = parser.index;
		        element.children.push({ start, end, type: 'Text', data });
		        parser.eat('</style>', true);
		    }
		    else {
		        parser.stack.push(element);
		    }
		}
		function readTagName(parser) {
		    const start = parser.index;
		    if (parser.eat(SELF)) {
		        // check we're inside a block, otherwise this
		        // will cause infinite recursion
		        let i = parser.stack.length;
		        let legal = false;
		        while (i--) {
		            const fragment = parser.stack[i];
		            if (fragment.type === 'IfBlock' || fragment.type === 'EachBlock') {
		                legal = true;
		                break;
		            }
		        }
		        if (!legal) {
		            parser.error({
		                code: `invalid-self-placement`,
		                message: `<${SELF}> components can only exist inside if-blocks or each-blocks`
		            }, start);
		        }
		        return SELF;
		    }
		    if (parser.eat(COMPONENT))
		        return COMPONENT;
		    const name = parser.readUntil(/(\s|\/|>)/);
		    if (metaTags.has(name))
		        return name;
		    if (!validTagName.test(name)) {
		        parser.error({
		            code: `invalid-tag-name`,
		            message: `Expected valid tag name`
		        }, start);
		    }
		    return name;
		}
		function readAttribute(parser, uniqueNames) {
		    const start = parser.index;
		    if (parser.eat('{')) {
		        parser.allowWhitespace();
		        if (parser.eat('...')) {
		            const expression = readExpression(parser);
		            parser.allowWhitespace();
		            parser.eat('}', true);
		            return {
		                start,
		                end: parser.index,
		                type: 'Spread',
		                expression
		            };
		        }
		        else {
		            const valueStart = parser.index;
		            const name = parser.readIdentifier();
		            parser.allowWhitespace();
		            parser.eat('}', true);
		            return {
		                start,
		                end: parser.index,
		                type: 'Attribute',
		                name,
		                value: [{
		                        start: valueStart,
		                        end: valueStart + name.length,
		                        type: 'AttributeShorthand',
		                        expression: {
		                            start: valueStart,
		                            end: valueStart + name.length,
		                            type: 'Identifier',
		                            name
		                        }
		                    }]
		            };
		        }
		    }
		    let name = parser.readUntil(/(\s|=|\/|>)/);
		    if (!name)
		        return null;
		    if (uniqueNames.has(name)) {
		        parser.error({
		            code: `duplicate-attribute`,
		            message: 'Attributes need to be unique'
		        }, start);
		    }
		    uniqueNames.add(name);
		    parser.allowWhitespace();
		    const directive = readDirective(parser, start, name);
		    if (directive)
		        return directive;
		    let value = parser.eat('=') ? readAttributeValue(parser) : true;
		    return {
		        start,
		        end: parser.index,
		        type: 'Attribute',
		        name,
		        value,
		    };
		}
		function readAttributeValue(parser) {
		    const quoteMark = parser.eat(`'`) ? `'` : parser.eat(`"`) ? `"` : null;
		    const regex = (quoteMark === `'` ? /'/ :
		        quoteMark === `"` ? /"/ :
		            /(\/>|[\s"'=<>`])/);
		    const value = readSequence$1(parser, () => !!parser.matchRegex(regex));
		    if (quoteMark)
		        parser.index += 1;
		    return value;
		}
		function readSequence$1(parser, done) {
		    let currentChunk = {
		        start: parser.index,
		        end: null,
		        type: 'Text',
		        data: '',
		    };
		    const chunks = [];
		    while (parser.index < parser.template.length) {
		        const index = parser.index;
		        if (done()) {
		            currentChunk.end = parser.index;
		            if (currentChunk.data)
		                chunks.push(currentChunk);
		            chunks.forEach(chunk => {
		                if (chunk.type === 'Text')
		                    chunk.data = decodeCharacterReferences(chunk.data);
		            });
		            return chunks;
		        }
		        else if (parser.eat('{')) {
		            if (currentChunk.data) {
		                currentChunk.end = index;
		                chunks.push(currentChunk);
		            }
		            parser.allowWhitespace();
		            const expression = readExpression(parser);
		            parser.allowWhitespace();
		            parser.eat('}', true);
		            chunks.push({
		                start: index,
		                end: parser.index,
		                type: 'MustacheTag',
		                expression,
		            });
		            currentChunk = {
		                start: parser.index,
		                end: null,
		                type: 'Text',
		                data: '',
		            };
		        }
		        else {
		            currentChunk.data += parser.template[parser.index++];
		        }
		    }
		    parser.error({
		        code: `unexpected-eof`,
		        message: `Unexpected end of input`
		    });
		}

		function errorOnAssignmentPattern(parser) {
		    if (parser.eat('=')) {
		        parser.error({
		            code: 'invalid-assignment-pattern',
		            message: 'Assignment patterns are not supported'
		        }, parser.index - 1);
		    }
		}
		function readContext(parser) {
		    const context = {
		        start: parser.index,
		        end: null,
		        type: null
		    };
		    if (parser.eat('[')) {
		        context.type = 'ArrayPattern';
		        context.elements = [];
		        do {
		            parser.allowWhitespace();
		            if (parser.template[parser.index] === ',') {
		                context.elements.push(null);
		            }
		            else {
		                context.elements.push(readContext(parser));
		                parser.allowWhitespace();
		            }
		        } while (parser.eat(','));
		        errorOnAssignmentPattern(parser);
		        parser.eat(']', true);
		        context.end = parser.index;
		    }
		    else if (parser.eat('{')) {
		        context.type = 'ObjectPattern';
		        context.properties = [];
		        do {
		            parser.allowWhitespace();
		            const start = parser.index;
		            const name = parser.readIdentifier();
		            const key = {
		                start,
		                end: parser.index,
		                type: 'Identifier',
		                name
		            };
		            parser.allowWhitespace();
		            const value = parser.eat(':')
		                ? (parser.allowWhitespace(), readContext(parser))
		                : key;
		            const property = {
		                start,
		                end: value.end,
		                type: 'Property',
		                kind: 'init',
		                shorthand: value.type === 'Identifier' && value.name === name,
		                key,
		                value
		            };
		            context.properties.push(property);
		            parser.allowWhitespace();
		        } while (parser.eat(','));
		        errorOnAssignmentPattern(parser);
		        parser.eat('}', true);
		        context.end = parser.index;
		    }
		    else {
		        const name = parser.readIdentifier();
		        if (name) {
		            context.type = 'Identifier';
		            context.end = parser.index;
		            context.name = name;
		        }
		        else {
		            parser.error({
		                code: 'invalid-context',
		                message: 'Expected a name, array pattern or object pattern'
		            });
		        }
		        errorOnAssignmentPattern(parser);
		    }
		    return context;
		}

		const whitespace = /[ \t\r\n]/;
		const dimensions = /^(?:offset|client)(?:Width|Height)$/;

		function trimStart(str) {
		    let i = 0;
		    while (whitespace.test(str[i]))
		        i += 1;
		    return str.slice(i);
		}
		function trimEnd(str) {
		    let i = str.length;
		    while (whitespace.test(str[i - 1]))
		        i -= 1;
		    return str.slice(0, i);
		}

		function trimWhitespace(block, trimBefore, trimAfter) {
		    if (!block.children || block.children.length === 0)
		        return; // AwaitBlock
		    const firstChild = block.children[0];
		    const lastChild = block.children[block.children.length - 1];
		    if (firstChild.type === 'Text' && trimBefore) {
		        firstChild.data = trimStart(firstChild.data);
		        if (!firstChild.data)
		            block.children.shift();
		    }
		    if (lastChild.type === 'Text' && trimAfter) {
		        lastChild.data = trimEnd(lastChild.data);
		        if (!lastChild.data)
		            block.children.pop();
		    }
		    if (block.else) {
		        trimWhitespace(block.else, trimBefore, trimAfter);
		    }
		    if (firstChild.elseif) {
		        trimWhitespace(firstChild, trimBefore, trimAfter);
		    }
		}
		function mustache(parser) {
		    const start = parser.index;
		    parser.index += 1;
		    parser.allowWhitespace();
		    // {/if} or {/each}
		    if (parser.eat('/')) {
		        let block = parser.current();
		        let expected;
		        if (block.type === 'ElseBlock' || block.type === 'PendingBlock' || block.type === 'ThenBlock' || block.type === 'CatchBlock') {
		            block.end = start;
		            parser.stack.pop();
		            block = parser.current();
		            expected = 'await';
		        }
		        if (block.type === 'IfBlock') {
		            expected = 'if';
		        }
		        else if (block.type === 'EachBlock') {
		            expected = 'each';
		        }
		        else if (block.type === 'AwaitBlock') {
		            expected = 'await';
		        }
		        else {
		            parser.error({
		                code: `unexpected-block-close`,
		                message: `Unexpected block closing tag`
		            });
		        }
		        parser.eat(expected, true);
		        parser.allowWhitespace();
		        parser.eat('}', true);
		        while (block.elseif) {
		            block.end = parser.index;
		            parser.stack.pop();
		            block = parser.current();
		            if (block.else) {
		                block.else.end = start;
		            }
		        }
		        // strip leading/trailing whitespace as necessary
		        const charBefore = parser.template[block.start - 1];
		        const charAfter = parser.template[parser.index];
		        const trimBefore = !charBefore || whitespace.test(charBefore);
		        const trimAfter = !charAfter || whitespace.test(charAfter);
		        trimWhitespace(block, trimBefore, trimAfter);
		        block.end = parser.index;
		        parser.stack.pop();
		    }
		    else if (parser.eat(':elseif')) {
		        const block = parser.current();
		        if (block.type !== 'IfBlock')
		            parser.error({
		                code: `invalid-elseif-placement`,
		                message: 'Cannot have an {:elseif ...} block outside an {#if ...} block'
		            });
		        parser.requireWhitespace();
		        const expression = readExpression(parser);
		        parser.allowWhitespace();
		        parser.eat('}', true);
		        block.else = {
		            start: parser.index,
		            end: null,
		            type: 'ElseBlock',
		            children: [
		                {
		                    start: parser.index,
		                    end: null,
		                    type: 'IfBlock',
		                    elseif: true,
		                    expression,
		                    children: [],
		                },
		            ],
		        };
		        parser.stack.push(block.else.children[0]);
		    }
		    else if (parser.eat(':else')) {
		        const block = parser.current();
		        if (block.type !== 'IfBlock' && block.type !== 'EachBlock') {
		            parser.error({
		                code: `invalid-else-placement`,
		                message: 'Cannot have an {:else} block outside an {#if ...} or {#each ...} block'
		            });
		        }
		        parser.allowWhitespace();
		        parser.eat('}', true);
		        block.else = {
		            start: parser.index,
		            end: null,
		            type: 'ElseBlock',
		            children: [],
		        };
		        parser.stack.push(block.else);
		    }
		    else if (parser.eat(':then')) {
		        // TODO DRY out this and the next section
		        const pendingBlock = parser.current();
		        if (pendingBlock.type === 'PendingBlock') {
		            pendingBlock.end = start;
		            parser.stack.pop();
		            const awaitBlock = parser.current();
		            if (!parser.eat('}')) {
		                parser.requireWhitespace();
		                awaitBlock.value = parser.readIdentifier();
		                parser.allowWhitespace();
		                parser.eat('}', true);
		            }
		            const thenBlock = {
		                start,
		                end: null,
		                type: 'ThenBlock',
		                children: []
		            };
		            awaitBlock.then = thenBlock;
		            parser.stack.push(thenBlock);
		        }
		    }
		    else if (parser.eat(':catch')) {
		        const thenBlock = parser.current();
		        if (thenBlock.type === 'ThenBlock') {
		            thenBlock.end = start;
		            parser.stack.pop();
		            const awaitBlock = parser.current();
		            if (!parser.eat('}')) {
		                parser.requireWhitespace();
		                awaitBlock.error = parser.readIdentifier();
		                parser.allowWhitespace();
		                parser.eat('}', true);
		            }
		            const catchBlock = {
		                start,
		                end: null,
		                type: 'CatchBlock',
		                children: []
		            };
		            awaitBlock.catch = catchBlock;
		            parser.stack.push(catchBlock);
		        }
		    }
		    else if (parser.eat('#')) {
		        // {#if foo}, {#each foo} or {#await foo}
		        let type;
		        if (parser.eat('if')) {
		            type = 'IfBlock';
		        }
		        else if (parser.eat('each')) {
		            type = 'EachBlock';
		        }
		        else if (parser.eat('await')) {
		            type = 'AwaitBlock';
		        }
		        else {
		            parser.error({
		                code: `expected-block-type`,
		                message: `Expected if, each or await`
		            });
		        }
		        parser.requireWhitespace();
		        const expression = readExpression(parser);
		        const block = type === 'AwaitBlock' ?
		            {
		                start,
		                end: null,
		                type,
		                expression,
		                value: null,
		                error: null,
		                pending: {
		                    start: null,
		                    end: null,
		                    type: 'PendingBlock',
		                    children: []
		                },
		                then: {
		                    start: null,
		                    end: null,
		                    type: 'ThenBlock',
		                    children: []
		                },
		                catch: {
		                    start: null,
		                    end: null,
		                    type: 'CatchBlock',
		                    children: []
		                },
		            } :
		            {
		                start,
		                end: null,
		                type,
		                expression,
		                children: [],
		            };
		        parser.allowWhitespace();
		        // {#each} blocks must declare a context – {#each list as item}
		        if (type === 'EachBlock') {
		            parser.eat('as', true);
		            parser.requireWhitespace();
		            block.context = readContext(parser);
		            parser.allowWhitespace();
		            if (parser.eat(',')) {
		                parser.allowWhitespace();
		                block.index = parser.readIdentifier();
		                if (!block.index)
		                    parser.error({
		                        code: `expected-name`,
		                        message: `Expected name`
		                    });
		                parser.allowWhitespace();
		            }
		            if (parser.eat('(')) {
		                parser.allowWhitespace();
		                block.key = readExpression(parser);
		                parser.allowWhitespace();
		                parser.eat(')', true);
		                parser.allowWhitespace();
		            }
		            else if (parser.eat('@')) {
		                block.key = parser.readIdentifier();
		                if (!block.key)
		                    parser.error({
		                        code: `expected-name`,
		                        message: `Expected name`
		                    });
		                parser.allowWhitespace();
		            }
		        }
		        let awaitBlockShorthand = type === 'AwaitBlock' && parser.eat('then');
		        if (awaitBlockShorthand) {
		            parser.requireWhitespace();
		            block.value = parser.readIdentifier();
		            parser.allowWhitespace();
		        }
		        parser.eat('}', true);
		        parser.current().children.push(block);
		        parser.stack.push(block);
		        if (type === 'AwaitBlock') {
		            const childBlock = awaitBlockShorthand ? block.then : block.pending;
		            childBlock.start = parser.index;
		            parser.stack.push(childBlock);
		        }
		    }
		    else if (parser.eat('@html')) {
		        // {@html content} tag
		        const expression = readExpression(parser);
		        parser.allowWhitespace();
		        parser.eat('}', true);
		        parser.current().children.push({
		            start,
		            end: parser.index,
		            type: 'RawMustacheTag',
		            expression,
		        });
		    }
		    else if (parser.eat('@debug')) {
		        let identifiers;
		        // Implies {@debug} which indicates "debug all"
		        if (parser.read(/\s*}/)) {
		            identifiers = [];
		        }
		        else {
		            const expression = readExpression(parser);
		            identifiers = expression.type === 'SequenceExpression'
		                ? expression.expressions
		                : [expression];
		            identifiers.forEach(node => {
		                if (node.type !== 'Identifier') {
		                    parser.error({
		                        code: 'invalid-debug-args',
		                        message: '{@debug ...} arguments must be identifiers, not arbitrary expressions'
		                    }, node.start);
		                }
		            });
		            parser.allowWhitespace();
		            parser.eat('}', true);
		        }
		        parser.current().children.push({
		            start,
		            end: parser.index,
		            type: 'DebugTag',
		            identifiers
		        });
		    }
		    else {
		        const expression = readExpression(parser);
		        parser.allowWhitespace();
		        parser.eat('}', true);
		        parser.current().children.push({
		            start,
		            end: parser.index,
		            type: 'MustacheTag',
		            expression,
		        });
		    }
		}

		function text(parser) {
		    const start = parser.index;
		    let data = '';
		    while (parser.index < parser.template.length &&
		        !parser.match('<') &&
		        !parser.match('{')) {
		        data += parser.template[parser.index++];
		    }
		    parser.current().children.push({
		        start,
		        end: parser.index,
		        type: 'Text',
		        data: decodeCharacterReferences(data),
		    });
		}

		function fragment(parser) {
		    if (parser.match('<')) {
		        return tag;
		    }
		    if (parser.match('{')) {
		        return mustache;
		    }
		    return text;
		}

		const reservedNames = new Set([
		    'arguments',
		    'await',
		    'break',
		    'case',
		    'catch',
		    'class',
		    'const',
		    'continue',
		    'debugger',
		    'default',
		    'delete',
		    'do',
		    'else',
		    'enum',
		    'eval',
		    'export',
		    'extends',
		    'false',
		    'finally',
		    'for',
		    'function',
		    'if',
		    'implements',
		    'import',
		    'in',
		    'instanceof',
		    'interface',
		    'let',
		    'new',
		    'null',
		    'package',
		    'private',
		    'protected',
		    'public',
		    'return',
		    'static',
		    'super',
		    'switch',
		    'this',
		    'throw',
		    'true',
		    'try',
		    'typeof',
		    'var',
		    'void',
		    'while',
		    'with',
		    'yield',
		]);

		// Adapted from https://github.com/acornjs/acorn/blob/6584815dca7440e00de841d1dad152302fdd7ca5/src/tokenize.js
		// Reproduced under MIT License https://github.com/acornjs/acorn/blob/master/LICENSE
		function fullCharCodeAt(str, i) {
		    let code = str.charCodeAt(i);
		    if (code <= 0xd7ff || code >= 0xe000)
		        return code;
		    let next = str.charCodeAt(i + 1);
		    return (code << 10) + next - 0x35fdc00;
		}

		function getLocator(source, options) {
		    if (options === void 0) { options = {}; }
		    var offsetLine = options.offsetLine || 0;
		    var offsetColumn = options.offsetColumn || 0;
		    var originalLines = source.split('\n');
		    var start = 0;
		    var lineRanges = originalLines.map(function (line, i) {
		        var end = start + line.length + 1;
		        var range = { start: start, end: end, line: i };
		        start = end;
		        return range;
		    });
		    var i = 0;
		    function rangeContains(range, index) {
		        return range.start <= index && index < range.end;
		    }
		    function getLocation(range, index) {
		        return { line: offsetLine + range.line, column: offsetColumn + index - range.start, character: index };
		    }
		    function locate(search, startIndex) {
		        if (typeof search === 'string') {
		            search = source.indexOf(search, startIndex || 0);
		        }
		        var range = lineRanges[i];
		        var d = search >= range.end ? 1 : -1;
		        while (range) {
		            if (rangeContains(range, search))
		                return getLocation(range, search);
		            i += d;
		            range = lineRanges[i];
		        }
		    }
		    return locate;
		}
		function locate(source, search, options) {
		    if (typeof options === 'number') {
		        throw new Error('locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument');
		    }
		    return getLocator(source, options)(search, options && options.startIndex);
		}

		function tabsToSpaces(str) {
		    return str.replace(/^\t+/, match => match.split('\t').join('  '));
		}
		function getCodeFrame(source, line, column) {
		    const lines = source.split('\n');
		    const frameStart = Math.max(0, line - 2);
		    const frameEnd = Math.min(line + 3, lines.length);
		    const digits = String(frameEnd + 1).length;
		    return lines
		        .slice(frameStart, frameEnd)
		        .map((str, i) => {
		        const isErrorLine = frameStart + i === line;
		        let lineNum = String(i + frameStart + 1);
		        while (lineNum.length < digits)
		            lineNum = ` ${lineNum}`;
		        if (isErrorLine) {
		            const indicator = repeat(' ', digits + 2 + tabsToSpaces(str.slice(0, column)).length) + '^';
		            return `${lineNum}: ${tabsToSpaces(str)}\n${indicator}`;
		        }
		        return `${lineNum}: ${tabsToSpaces(str)}`;
		    })
		        .join('\n');
		}

		class CompileError extends Error {
		    toString() {
		        return `${this.message} (${this.start.line}:${this.start.column})\n${this.frame}`;
		    }
		}
		function error$1(message, props) {
		    const error = new CompileError(message);
		    error.name = props.name;
		    const start = locate(props.source, props.start, { offsetLine: 1 });
		    const end = locate(props.source, props.end || props.start, { offsetLine: 1 });
		    error.code = props.code;
		    error.start = start;
		    error.end = end;
		    error.pos = props.start;
		    error.filename = props.filename;
		    error.frame = getCodeFrame(props.source, start.line - 1, start.column);
		    throw error;
		}

		class Parser$1 {
		    constructor(template, options) {
		        if (typeof template !== 'string') {
		            throw new TypeError('Template must be a string');
		        }
		        this.template = template.replace(/\s+$/, '');
		        this.filename = options.filename;
		        this.customElement = options.customElement;
		        this.allowBindings = options.bind !== false;
		        this.index = 0;
		        this.stack = [];
		        this.metaTags = {};
		        this.html = {
		            start: null,
		            end: null,
		            type: 'Fragment',
		            children: [],
		        };
		        this.css = null;
		        this.js = null;
		        this.stack.push(this.html);
		        let state = fragment;
		        while (this.index < this.template.length) {
		            state = state(this) || fragment;
		        }
		        if (this.stack.length > 1) {
		            const current = this.current();
		            const type = current.type === 'Element' ? `<${current.name}>` : 'Block';
		            const slug = current.type === 'Element' ? 'element' : 'block';
		            this.error({
		                code: `unclosed-${slug}`,
		                message: `${type} was left open`
		            }, current.start);
		        }
		        if (state !== fragment) {
		            this.error({
		                code: `unexpected-eof`,
		                message: 'Unexpected end of input'
		            });
		        }
		        if (this.html.children.length) {
		            let start = this.html.children[0] && this.html.children[0].start;
		            while (/\s/.test(template[start]))
		                start += 1;
		            let end = this.html.children[this.html.children.length - 1] && this.html.children[this.html.children.length - 1].end;
		            while (/\s/.test(template[end - 1]))
		                end -= 1;
		            this.html.start = start;
		            this.html.end = end;
		        }
		        else {
		            this.html.start = this.html.end = null;
		        }
		    }
		    current() {
		        return this.stack[this.stack.length - 1];
		    }
		    acornError(err) {
		        this.error({
		            code: `parse-error`,
		            message: err.message.replace(/ \(\d+:\d+\)$/, '')
		        }, err.pos);
		    }
		    error({ code, message }, index = this.index) {
		        error$1(message, {
		            name: 'ParseError',
		            code,
		            source: this.template,
		            start: index,
		            filename: this.filename
		        });
		    }
		    eat(str, required, message) {
		        if (this.match(str)) {
		            this.index += str.length;
		            return true;
		        }
		        if (required) {
		            this.error({
		                code: `unexpected-${this.index === this.template.length ? 'eof' : 'token'}`,
		                message: message || `Expected ${str}`
		            });
		        }
		        return false;
		    }
		    match(str) {
		        return this.template.slice(this.index, this.index + str.length) === str;
		    }
		    matchRegex(pattern) {
		        const match = pattern.exec(this.template.slice(this.index));
		        if (!match || match.index !== 0)
		            return null;
		        return match[0];
		    }
		    allowWhitespace() {
		        while (this.index < this.template.length &&
		            whitespace.test(this.template[this.index])) {
		            this.index++;
		        }
		    }
		    read(pattern) {
		        const result = this.matchRegex(pattern);
		        if (result)
		            this.index += result.length;
		        return result;
		    }
		    readIdentifier() {
		        const start = this.index;
		        let i = this.index;
		        const code = fullCharCodeAt(this.template, i);
		        if (!isIdentifierStart(code, true))
		            return null;
		        i += code <= 0xffff ? 1 : 2;
		        while (i < this.template.length) {
		            const code = fullCharCodeAt(this.template, i);
		            if (!isIdentifierChar(code, true))
		                break;
		            i += code <= 0xffff ? 1 : 2;
		        }
		        const identifier = this.template.slice(this.index, this.index = i);
		        if (reservedNames.has(identifier)) {
		            this.error({
		                code: `unexpected-reserved-word`,
		                message: `'${identifier}' is a reserved word in JavaScript and cannot be used here`
		            }, start);
		        }
		        return identifier;
		    }
		    readUntil(pattern) {
		        if (this.index >= this.template.length)
		            this.error({
		                code: `unexpected-eof`,
		                message: 'Unexpected end of input'
		            });
		        const start = this.index;
		        const match = pattern.exec(this.template.slice(start));
		        if (match) {
		            this.index = start + match.index;
		            return this.template.slice(start, this.index);
		        }
		        this.index = this.template.length;
		        return this.template.slice(start);
		    }
		    remaining() {
		        return this.template.slice(this.index);
		    }
		    requireWhitespace() {
		        if (!whitespace.test(this.template[this.index])) {
		            this.error({
		                code: `missing-whitespace`,
		                message: `Expected whitespace`
		            });
		        }
		        this.allowWhitespace();
		    }
		}
		function parse$1(template, options = {}) {
		    const parser = new Parser$1(template, options);
		    return {
		        html: parser.html,
		        css: parser.css,
		        js: parser.js,
		    };
		}

		const start = /\n(\t+)/;
		function deindent(strings, ...values) {
		    const indentation = start.exec(strings[0])[1];
		    const pattern = new RegExp(`^${indentation}`, 'gm');
		    let result = strings[0].replace(start, '').replace(pattern, '');
		    let trailingIndentation = getTrailingIndentation(result);
		    for (let i = 1; i < strings.length; i += 1) {
		        let expression = values[i - 1];
		        const string = strings[i].replace(pattern, '');
		        if (Array.isArray(expression)) {
		            expression = expression.length ? expression.join('\n') : null;
		        }
		        if (expression || expression === '') {
		            const value = String(expression).replace(/\n/g, `\n${trailingIndentation}`);
		            result += value + string;
		        }
		        else {
		            let c = result.length;
		            while (/\s/.test(result[c - 1]))
		                c -= 1;
		            result = result.slice(0, c) + string;
		        }
		        trailingIndentation = getTrailingIndentation(result);
		    }
		    return result.trim().replace(/\t+$/gm, '');
		}
		function getTrailingIndentation(str) {
		    let i = str.length;
		    while (str[i - 1] === ' ' || str[i - 1] === '\t')
		        i -= 1;
		    return str.slice(i, str.length);
		}

		function stringify(data, options = {}) {
		    return JSON.stringify(escape$1(data, options));
		}
		function escape$1(data, { onlyEscapeAtSymbol = false } = {}) {
		    return data.replace(onlyEscapeAtSymbol ? /(%+|@+)/g : /(%+|@+|#+)/g, (match) => {
		        return match + match[0];
		    });
		}
		const escaped$1 = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		};
		function escapeHTML(html) {
		    return String(html).replace(/[&<>]/g, match => escaped$1[match]);
		}
		function escapeTemplate(str) {
		    return str.replace(/(\${|`|\\)/g, '\\$1');
		}

		var ChunkType;
		(function (ChunkType) {
		    ChunkType[ChunkType["Line"] = 0] = "Line";
		    ChunkType[ChunkType["Block"] = 1] = "Block";
		})(ChunkType || (ChunkType = {}));
		class CodeBuilder {
		    constructor(str = '') {
		        this.result = str;
		        const initial = str
		            ? /\n/.test(str) ? ChunkType.Block : ChunkType.Line
		            : null;
		        this.first = initial;
		        this.last = initial;
		        this.lastCondition = null;
		        this.conditionStack = [];
		        this.indent = '';
		    }
		    addConditional(condition, body) {
		        this.reifyConditions();
		        body = body.replace(/^/gm, `${this.indent}\t`);
		        if (condition === this.lastCondition) {
		            this.result += `\n${body}`;
		        }
		        else {
		            if (this.lastCondition) {
		                this.result += `\n${this.indent}}`;
		            }
		            this.result += `${this.last === ChunkType.Block ? '\n\n' : '\n'}${this.indent}if (${condition}) {\n${body}`;
		            this.lastCondition = condition;
		        }
		        this.last = ChunkType.Block;
		    }
		    addLine(line) {
		        this.reifyConditions();
		        if (this.lastCondition) {
		            this.result += `\n${this.indent}}`;
		            this.lastCondition = null;
		        }
		        if (this.last === ChunkType.Block) {
		            this.result += `\n\n${this.indent}${line}`;
		        }
		        else if (this.last === ChunkType.Line) {
		            this.result += `\n${this.indent}${line}`;
		        }
		        else {
		            this.result += line;
		        }
		        this.last = ChunkType.Line;
		        if (!this.first)
		            this.first = ChunkType.Line;
		    }
		    addLineAtStart(line) {
		        this.reifyConditions();
		        if (this.first === ChunkType.Block) {
		            this.result = `${line}\n\n${this.indent}${this.result}`;
		        }
		        else if (this.first === ChunkType.Line) {
		            this.result = `${line}\n${this.indent}${this.result}`;
		        }
		        else {
		            this.result += line;
		        }
		        this.first = ChunkType.Line;
		        if (!this.last)
		            this.last = ChunkType.Line;
		    }
		    addBlock(block) {
		        this.reifyConditions();
		        if (this.indent)
		            block = block.replace(/^/gm, `${this.indent}`);
		        if (this.lastCondition) {
		            this.result += `\n${this.indent}}`;
		            this.lastCondition = null;
		        }
		        if (this.result) {
		            this.result += `\n\n${this.indent}${block}`;
		        }
		        else {
		            this.result += block;
		        }
		        this.last = ChunkType.Block;
		        if (!this.first)
		            this.first = ChunkType.Block;
		    }
		    addBlockAtStart(block) {
		        this.reifyConditions();
		        if (this.result) {
		            this.result = `${block}\n\n${this.indent}${this.result}`;
		        }
		        else {
		            this.result += block;
		        }
		        this.first = ChunkType.Block;
		        if (!this.last)
		            this.last = ChunkType.Block;
		    }
		    isEmpty() {
		        return this.result === '';
		    }
		    pushCondition(condition) {
		        this.conditionStack.push({ condition, used: false });
		    }
		    popCondition() {
		        const { used } = this.conditionStack.pop();
		        this.indent = repeat('\t', this.conditionStack.length);
		        if (used)
		            this.addLine('}');
		    }
		    reifyConditions() {
		        for (let i = 0; i < this.conditionStack.length; i += 1) {
		            const condition = this.conditionStack[i];
		            if (!condition.used) {
		                const line = `if (${condition.condition}) {`;
		                if (this.last === ChunkType.Block) {
		                    this.result += `\n\n${this.indent}${line}`;
		                }
		                else if (this.last === ChunkType.Line) {
		                    this.result += `\n${this.indent}${line}`;
		                }
		                else {
		                    this.result += line;
		                }
		                this.last = ChunkType.Line;
		                if (!this.first)
		                    this.first = ChunkType.Line;
		                this.indent = repeat('\t', this.conditionStack.length);
		                condition.used = true;
		            }
		        }
		    }
		    toString() {
		        return this.result.trim() + (this.lastCondition ? `\n}` : ``);
		    }
		}

		var globalWhitelist = new Set([
		    'Array',
		    'Boolean',
		    'console',
		    'Date',
		    'decodeURI',
		    'decodeURIComponent',
		    'encodeURI',
		    'encodeURIComponent',
		    'Infinity',
		    'Intl',
		    'isFinite',
		    'isNaN',
		    'JSON',
		    'Map',
		    'Math',
		    'NaN',
		    'Number',
		    'Object',
		    'parseFloat',
		    'parseInt',
		    'Promise',
		    'RegExp',
		    'Set',
		    'String',
		    'undefined',
		]);

		class Block$1 {
		    constructor(options) {
		        this.parent = options.parent;
		        this.renderer = options.renderer;
		        this.name = options.name;
		        this.comment = options.comment;
		        this.wrappers = [];
		        // for keyed each blocks
		        this.key = options.key;
		        this.first = null;
		        this.dependencies = new Set();
		        this.bindings = options.bindings;
		        this.contextOwners = options.contextOwners;
		        this.builders = {
		            init: new CodeBuilder(),
		            create: new CodeBuilder(),
		            claim: new CodeBuilder(),
		            hydrate: new CodeBuilder(),
		            mount: new CodeBuilder(),
		            measure: new CodeBuilder(),
		            fix: new CodeBuilder(),
		            animate: new CodeBuilder(),
		            intro: new CodeBuilder(),
		            update: new CodeBuilder(),
		            outro: new CodeBuilder(),
		            destroy: new CodeBuilder(),
		        };
		        this.hasAnimation = false;
		        this.hasIntroMethod = false; // a block could have an intro method but not intro transitions, e.g. if a sibling block has intros
		        this.hasOutroMethod = false;
		        this.outros = 0;
		        this.getUniqueName = this.renderer.component.getUniqueNameMaker();
		        this.variables = new Map();
		        this.aliases = new Map()
		            .set('component', this.getUniqueName('component'))
		            .set('ctx', this.getUniqueName('ctx'));
		        if (this.key)
		            this.aliases.set('key', this.getUniqueName('key'));
		        this.hasUpdateMethod = false; // determined later
		    }
		    assignVariableNames() {
		        const seen = new Set();
		        const dupes = new Set();
		        let i = this.wrappers.length;
		        while (i--) {
		            const wrapper = this.wrappers[i];
		            if (!wrapper.var)
		                continue;
		            if (wrapper.parent && wrapper.parent.canUseInnerHTML)
		                continue;
		            if (seen.has(wrapper.var)) {
		                dupes.add(wrapper.var);
		            }
		            seen.add(wrapper.var);
		        }
		        const counts = new Map();
		        i = this.wrappers.length;
		        while (i--) {
		            const wrapper = this.wrappers[i];
		            if (!wrapper.var)
		                continue;
		            if (dupes.has(wrapper.var)) {
		                const i = counts.get(wrapper.var) || 0;
		                counts.set(wrapper.var, i + 1);
		                wrapper.var = this.getUniqueName(wrapper.var + i);
		            }
		            else {
		                wrapper.var = this.getUniqueName(wrapper.var);
		            }
		        }
		    }
		    addDependencies(dependencies) {
		        dependencies.forEach(dependency => {
		            this.dependencies.add(dependency);
		        });
		    }
		    addElement(name, renderStatement, claimStatement, parentNode, noDetach) {
		        this.addVariable(name);
		        this.builders.create.addLine(`${name} = ${renderStatement};`);
		        this.builders.claim.addLine(`${name} = ${claimStatement || renderStatement};`);
		        if (parentNode) {
		            this.builders.mount.addLine(`@append(${parentNode}, ${name});`);
		            if (parentNode === 'document.head')
		                this.builders.destroy.addLine(`@detachNode(${name});`);
		        }
		        else {
		            this.builders.mount.addLine(`@insert(#target, ${name}, anchor);`);
		            if (!noDetach)
		                this.builders.destroy.addConditional('detach', `@detachNode(${name});`);
		        }
		    }
		    addIntro() {
		        this.hasIntros = this.hasIntroMethod = this.renderer.hasIntroTransitions = true;
		    }
		    addOutro() {
		        this.hasOutros = this.hasOutroMethod = this.renderer.hasOutroTransitions = true;
		        this.outros += 1;
		    }
		    addAnimation() {
		        this.hasAnimation = true;
		    }
		    addVariable(name, init) {
		        if (name[0] === '#') {
		            name = this.alias(name.slice(1));
		        }
		        if (this.variables.has(name) && this.variables.get(name) !== init) {
		            throw new Error(`Variable '${name}' already initialised with a different value`);
		        }
		        this.variables.set(name, init);
		    }
		    alias(name) {
		        if (!this.aliases.has(name)) {
		            this.aliases.set(name, this.getUniqueName(name));
		        }
		        return this.aliases.get(name);
		    }
		    child(options) {
		        return new Block$1(Object.assign({}, this, { key: null }, options, { parent: this }));
		    }
		    toString() {
		        const { dev } = this.renderer.options;
		        if (this.hasIntroMethod || this.hasOutroMethod) {
		            this.addVariable('#current');
		            if (!this.builders.mount.isEmpty()) {
		                this.builders.mount.addLine(`#current = true;`);
		            }
		            if (!this.builders.outro.isEmpty()) {
		                this.builders.outro.addLine(`#current = false;`);
		            }
		        }
		        if (this.autofocus) {
		            this.builders.mount.addLine(`${this.autofocus}.focus();`);
		        }
		        const properties = new CodeBuilder();
		        let localKey;
		        if (this.key) {
		            localKey = this.getUniqueName('key');
		            properties.addBlock(`key: ${localKey},`);
		        }
		        if (this.first) {
		            properties.addBlock(`first: null,`);
		            this.builders.hydrate.addLine(`this.first = ${this.first};`);
		        }
		        if (this.builders.create.isEmpty() && this.builders.hydrate.isEmpty()) {
		            properties.addBlock(`c: @noop,`);
		        }
		        else {
		            const hydrate = !this.builders.hydrate.isEmpty() && (this.renderer.options.hydratable
		                ? `this.h()`
		                : this.builders.hydrate);
		            properties.addBlock(deindent `
				${dev ? 'c: function create' : 'c'}() {
					${this.builders.create}
					${hydrate}
				},
			`);
		        }
		        if (this.renderer.options.hydratable) {
		            if (this.builders.claim.isEmpty() && this.builders.hydrate.isEmpty()) {
		                properties.addBlock(`l: @noop,`);
		            }
		            else {
		                properties.addBlock(deindent `
					${dev ? 'l: function claim' : 'l'}(nodes) {
						${this.builders.claim}
						${!this.builders.hydrate.isEmpty() && `this.h();`}
					},
				`);
		            }
		        }
		        if (this.renderer.options.hydratable && !this.builders.hydrate.isEmpty()) {
		            properties.addBlock(deindent `
				${dev ? 'h: function hydrate' : 'h'}() {
					${this.builders.hydrate}
				},
			`);
		        }
		        if (this.builders.mount.isEmpty()) {
		            properties.addBlock(`m: @noop,`);
		        }
		        else {
		            properties.addBlock(deindent `
				${dev ? 'm: function mount' : 'm'}(#target, anchor) {
					${this.builders.mount}
				},
			`);
		        }
		        if (this.hasUpdateMethod || this.maintainContext) {
		            if (this.builders.update.isEmpty() && !this.maintainContext) {
		                properties.addBlock(`p: @noop,`);
		            }
		            else {
		                properties.addBlock(deindent `
					${dev ? 'p: function update' : 'p'}(changed, ${this.maintainContext ? '_ctx' : 'ctx'}) {
						${this.maintainContext && `ctx = _ctx;`}
						${this.builders.update}
					},
				`);
		            }
		        }
		        if (this.hasAnimation) {
		            properties.addBlock(deindent `
				${dev ? `r: function measure` : `r`}() {
					${this.builders.measure}
				},

				${dev ? `f: function fix` : `f`}() {
					${this.builders.fix}
				},

				${dev ? `a: function animate` : `a`}() {
					${this.builders.animate}
				},
			`);
		        }
		        if (this.hasIntroMethod || this.hasOutroMethod) {
		            if (this.builders.mount.isEmpty()) {
		                properties.addBlock(`i: @noop,`);
		            }
		            else {
		                properties.addBlock(deindent `
					${dev ? 'i: function intro' : 'i'}(#target, anchor) {
						if (#current) return;
						${this.builders.intro}
						this.m(#target, anchor);
					},
				`);
		            }
		            if (this.builders.outro.isEmpty()) {
		                properties.addBlock(`o: @run,`);
		            }
		            else {
		                properties.addBlock(deindent `
					${dev ? 'o: function outro' : 'o'}(#outrocallback) {
						if (!#current) return;

						${this.outros > 1 && `#outrocallback = @callAfter(#outrocallback, ${this.outros});`}

						${this.builders.outro}
					},
				`);
		            }
		        }
		        if (this.builders.destroy.isEmpty()) {
		            properties.addBlock(`d: @noop`);
		        }
		        else {
		            properties.addBlock(deindent `
				${dev ? 'd: function destroy' : 'd'}(detach) {
					${this.builders.destroy}
				}
			`);
		        }
		        return deindent `
			${this.comment && `// ${escape$1(this.comment)}`}
			function ${this.name}(#component${this.key ? `, ${localKey}` : ''}, ctx) {
				${this.variables.size > 0 &&
            `var ${Array.from(this.variables.keys())
                .map(key => {
                const init = this.variables.get(key);
                return init !== undefined ? `${key} = ${init}` : key;
            })
                .join(', ')};`}

				${!this.builders.init.isEmpty() && this.builders.init}

				return {
					${properties}
				};
			}
		`.replace(/(#+)(\w*)/g, (match, sigil, name) => {
		            return sigil === '#' ? this.alias(name) : sigil.slice(1) + name;
		        });
		    }
		}

		class Wrapper {
		    constructor(renderer, block, parent, node) {
		        this.node = node;
		        // make these non-enumerable so that they can be logged sensibly
		        // (TODO in dev only?)
		        Object.defineProperties(this, {
		            renderer: {
		                value: renderer
		            },
		            parent: {
		                value: parent
		            }
		        });
		        this.canUseInnerHTML = !renderer.options.hydratable;
		        block.wrappers.push(this);
		    }
		    cannotUseInnerHTML() {
		        this.canUseInnerHTML = false;
		        if (this.parent)
		            this.parent.cannotUseInnerHTML();
		    }
		    // TODO do we still need equivalent method on Node?
		    findNearest(pattern) {
		        if (pattern.test(this.node.type))
		            return this;
		        return this.parent && this.parent.findNearest(pattern);
		    }
		    getOrCreateAnchor(block, parentNode, parentNodes) {
		        // TODO use this in EachBlock and IfBlock — tricky because
		        // children need to be created first
		        const needsAnchor = this.next ? !this.next.isDomNode() : !parentNode || !this.parent.isDomNode();
		        const anchor = needsAnchor
		            ? block.getUniqueName(`${this.var}_anchor`)
		            : (this.next && this.next.var) || 'null';
		        if (needsAnchor) {
		            block.addElement(anchor, `@createComment()`, parentNodes && `@createComment()`, parentNode);
		        }
		        return anchor;
		    }
		    getUpdateMountNode(anchor) {
		        return (this.parent && this.parent.isDomNode())
		            ? this.parent.var
		            : `${anchor}.parentNode`;
		    }
		    isDomNode() {
		        return (this.node.type === 'Element' ||
		            this.node.type === 'Text' ||
		            this.node.type === 'MustacheTag');
		    }
		    render(block, parentNode, parentNodes) {
		        throw new Error(`render method not implemented by subclass ${this.node.type}`);
		    }
		    remount(name) {
		        return `${this.var}.m(${name}._slotted.default, null);`;
		    }
		}

		function createDebuggingComment(node, component) {
		    const { locate, source } = component;
		    let c = node.start;
		    if (node.type === 'ElseBlock') {
		        while (source[c - 1] !== '{')
		            c -= 1;
		        while (source[c - 1] === '{')
		            c -= 1;
		    }
		    let d = node.expression ? node.expression.node.end : c;
		    while (source[d] !== '}')
		        d += 1;
		    while (source[d] === '}')
		        d += 1;
		    const start = locate(c);
		    const loc = `(${start.line + 1}:${start.column})`;
		    return `${loc} ${source.slice(c, d)}`.replace(/\s/g, ' ');
		}

		class AwaitBlockBranch extends Wrapper {
		    constructor(status, renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = null;
		        this.block = block.child({
		            comment: createDebuggingComment(node, this.renderer.component),
		            name: this.renderer.component.getUniqueName(`create_${status}_block`)
		        });
		        this.fragment = new FragmentWrapper(renderer, this.block, this.node.children, parent, stripWhitespace, nextSibling);
		        this.isDynamic = this.block.dependencies.size > 0;
		    }
		}
		class AwaitBlockWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = 'await_block';
		        this.cannotUseInnerHTML();
		        block.addDependencies(this.node.expression.dependencies);
		        let isDynamic = false;
		        let hasIntros = false;
		        let hasOutros = false;
		        ['pending', 'then', 'catch'].forEach(status => {
		            const child = this.node[status];
		            const branch = new AwaitBlockBranch(status, renderer, block, parent, child, stripWhitespace, nextSibling);
		            renderer.blocks.push(branch.block);
		            if (branch.isDynamic) {
		                isDynamic = true;
		                // TODO should blocks update their own parents?
		                block.addDependencies(branch.block.dependencies);
		            }
		            if (branch.block.hasIntros)
		                hasIntros = true;
		            if (branch.block.hasOutros)
		                hasOutros = true;
		            this[status] = branch;
		        });
		        this.pending.block.hasUpdateMethod = isDynamic;
		        this.then.block.hasUpdateMethod = isDynamic;
		        this.catch.block.hasUpdateMethod = isDynamic;
		        this.pending.block.hasIntroMethod = hasIntros;
		        this.then.block.hasIntroMethod = hasIntros;
		        this.catch.block.hasIntroMethod = hasIntros;
		        this.pending.block.hasOutroMethod = hasOutros;
		        this.then.block.hasOutroMethod = hasOutros;
		        this.catch.block.hasOutroMethod = hasOutros;
		        if (hasOutros && this.renderer.options.nestedTransitions) {
		            block.addOutro();
		        }
		    }
		    render(block, parentNode, parentNodes) {
		        const anchor = this.getOrCreateAnchor(block, parentNode, parentNodes);
		        const updateMountNode = this.getUpdateMountNode(anchor);
		        const { snippet } = this.node.expression;
		        const info = block.getUniqueName(`info`);
		        const promise = block.getUniqueName(`promise`);
		        block.addVariable(promise);
		        block.maintainContext = true;
		        const infoProps = [
		            block.alias('component') === 'component' ? 'component' : `component: #component`,
		            'ctx',
		            'current: null',
		            this.pending.block.name && `pending: ${this.pending.block.name}`,
		            this.then.block.name && `then: ${this.then.block.name}`,
		            this.catch.block.name && `catch: ${this.catch.block.name}`,
		            this.then.block.name && `value: '${this.node.value}'`,
		            this.catch.block.name && `error: '${this.node.error}'`,
		            this.pending.block.hasOutroMethod && `blocks: Array(3)`
		        ].filter(Boolean);
		        block.builders.init.addBlock(deindent `
			let ${info} = {
				${infoProps.join(',\n')}
			};
		`);
		        block.builders.init.addBlock(deindent `
			@handlePromise(${promise} = ${snippet}, ${info});
		`);
		        block.builders.create.addBlock(deindent `
			${info}.block.c();
		`);
		        if (parentNodes) {
		            block.builders.claim.addBlock(deindent `
				${info}.block.l(${parentNodes});
			`);
		        }
		        const initialMountNode = parentNode || '#target';
		        const anchorNode = parentNode ? 'null' : 'anchor';
		        const hasTransitions = this.pending.block.hasIntroMethod || this.pending.block.hasOutroMethod;
		        block.builders.mount.addBlock(deindent `
			${info}.block.${hasTransitions ? 'i' : 'm'}(${initialMountNode}, ${info}.anchor = ${anchorNode});
			${info}.mount = () => ${updateMountNode};
		`);
		        const conditions = [];
		        if (this.node.expression.dependencies.size > 0) {
		            conditions.push(`(${[...this.node.expression.dependencies].map(dep => `'${dep}' in changed`).join(' || ')})`);
		        }
		        conditions.push(`${promise} !== (${promise} = ${snippet})`, `@handlePromise(${promise}, ${info})`);
		        block.builders.update.addLine(`${info}.ctx = ctx;`);
		        if (this.pending.block.hasUpdateMethod) {
		            block.builders.update.addBlock(deindent `
				if (${conditions.join(' && ')}) {
					// nothing
				} else {
					${info}.block.p(changed, @assign(@assign({}, ctx), ${info}.resolved));
				}
			`);
		        }
		        else {
		            block.builders.update.addBlock(deindent `
				${conditions.join(' && ')}
			`);
		        }
		        if (this.pending.block.hasOutroMethod && this.renderer.options.nestedTransitions) {
		            const countdown = block.getUniqueName('countdown');
		            block.builders.outro.addBlock(deindent `
				const ${countdown} = @callAfter(#outrocallback, 3);
				for (let #i = 0; #i < 3; #i += 1) {
					const block = ${info}.blocks[#i];
					if (block) block.o(${countdown});
					else ${countdown}();
				}
			`);
		        }
		        block.builders.destroy.addBlock(deindent `
			${info}.block.d(${parentNode ? '' : 'detach'});
			${info} = null;
		`);
		        [this.pending, this.then, this.catch].forEach(branch => {
		            branch.fragment.render(branch.block, null, 'nodes');
		        });
		    }
		}

		function addToSet(a, b) {
		    b.forEach(item => {
		        a.add(item);
		    });
		}

		class DebugTagWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		    }
		    render(block, parentNode, parentNodes) {
		        const { renderer } = this;
		        const { component } = renderer;
		        if (!renderer.options.dev)
		            return;
		        const { code } = component;
		        if (this.node.expressions.length === 0) {
		            // Debug all
		            code.overwrite(this.node.start + 1, this.node.start + 7, 'debugger', {
		                storeName: true
		            });
		            const statement = `[✂${this.node.start + 1}-${this.node.start + 7}✂];`;
		            block.builders.create.addLine(statement);
		            block.builders.update.addLine(statement);
		        }
		        else {
		            const { code } = component;
		            code.overwrite(this.node.start + 1, this.node.start + 7, 'log', {
		                storeName: true
		            });
		            const log = `[✂${this.node.start + 1}-${this.node.start + 7}✂]`;
		            const dependencies = new Set();
		            this.node.expressions.forEach(expression => {
		                addToSet(dependencies, expression.dependencies);
		            });
		            const condition = [...dependencies].map(d => `changed.${d}`).join(' || ');
		            const identifiers = this.node.expressions.map(e => e.node.name).join(', ');
		            block.builders.update.addBlock(deindent `
				if (${condition}) {
					const { ${identifiers} } = ctx;
					console.${log}({ ${identifiers} });
					debugger;
				}
			`);
		            block.builders.create.addBlock(deindent `
				{
					const { ${identifiers} } = ctx;
					console.${log}({ ${identifiers} });
					debugger;
				}
			`);
		        }
		    }
		}

		class DocumentWrapper extends Wrapper {
		    constructor(renderer, block, parent, node) {
		        super(renderer, block, parent, node);
		    }
		    render(block, parentNode, parentNodes) {
		        const { renderer } = this;
		        const { component } = renderer;
		        this.node.handlers.forEach(handler => {
		            // TODO verify that it's a valid callee (i.e. built-in or declared method)
		            component.addSourcemapLocations(handler.expression);
		            const isCustomEvent = component.events.has(handler.name);
		            let usesState = handler.dependencies.size > 0;
		            handler.render(component, block, 'document', false); // TODO hoist?
		            const handlerName = block.getUniqueName(`onwindow${handler.name}`);
		            const handlerBody = deindent `
				${usesState && `var ctx = #component.get();`}
				${handler.snippet};
			`;
		            if (isCustomEvent) {
		                // TODO dry this out
		                block.addVariable(handlerName);
		                block.builders.hydrate.addBlock(deindent `
					${handlerName} = %events-${handler.name}.call(#component, document, function(event) {
						${handlerBody}
					});
				`);
		                block.builders.destroy.addLine(deindent `
					${handlerName}.destroy();
				`);
		            }
		            else {
		                block.builders.init.addBlock(deindent `
					function ${handlerName}(event) {
						${handlerBody}
					}
					document.addEventListener("${handler.name}", ${handlerName});
				`);
		                block.builders.destroy.addBlock(deindent `
					document.removeEventListener("${handler.name}", ${handlerName});
				`);
		            }
		        });
		    }
		}

		class ElseBlockWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = null;
		        this.block = block.child({
		            comment: createDebuggingComment(node, this.renderer.component),
		            name: this.renderer.component.getUniqueName(`create_else_block`)
		        });
		        this.fragment = new FragmentWrapper(renderer, this.block, this.node.children, parent, stripWhitespace, nextSibling);
		        this.isDynamic = this.block.dependencies.size > 0;
		        if (this.isDynamic) {
		            // TODO this can't be right
		            this.block.hasUpdateMethod = true;
		        }
		    }
		}
		class EachBlockWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = 'each';
		        this.hasBinding = false;
		        this.cannotUseInnerHTML();
		        const { dependencies } = node.expression;
		        block.addDependencies(dependencies);
		        this.block = block.child({
		            comment: createDebuggingComment(this.node, this.renderer.component),
		            name: renderer.component.getUniqueName('create_each_block'),
		            key: node.key,
		            bindings: new Map(block.bindings),
		            contextOwners: new Map(block.contextOwners)
		        });
		        // TODO this seems messy
		        this.block.hasAnimation = this.node.hasAnimation;
		        this.indexName = this.node.index || renderer.component.getUniqueName(`${this.node.context}_index`);
		        node.contexts.forEach(prop => {
		            this.block.contextOwners.set(prop.key.name, this);
		            // TODO this doesn't feel great
		            this.block.bindings.set(prop.key.name, () => `ctx.${this.vars.each_block_value}[ctx.${this.indexName}]${prop.tail}`);
		        });
		        if (this.node.index) {
		            this.block.getUniqueName(this.node.index); // this prevents name collisions (#1254)
		        }
		        renderer.blocks.push(this.block);
		        this.fragment = new FragmentWrapper(renderer, this.block, node.children, this, stripWhitespace, nextSibling);
		        if (this.node.else) {
		            this.else = new ElseBlockWrapper(renderer, block, this, this.node.else, stripWhitespace, nextSibling);
		            renderer.blocks.push(this.else.block);
		            if (this.else.isDynamic) {
		                this.block.addDependencies(this.else.block.dependencies);
		            }
		        }
		        block.addDependencies(this.block.dependencies);
		        this.block.hasUpdateMethod = this.block.dependencies.size > 0; // TODO should this logic be in Block?
		        if (this.block.hasOutros || (this.else && this.else.block.hasOutros)) {
		            block.addOutro();
		        }
		    }
		    render(block, parentNode, parentNodes) {
		        if (this.fragment.nodes.length === 0)
		            return;
		        const { renderer } = this;
		        const { component } = renderer;
		        // hack the sourcemap, so that if data is missing the bug
		        // is easy to find
		        let c = this.node.start + 2;
		        while (component.source[c] !== 'e')
		            c += 1;
		        component.code.overwrite(c, c + 4, 'length');
		        const length = `[✂${c}-${c + 4}✂]`;
		        const needsAnchor = this.next
		            ? !this.next.isDomNode() :
		            !parentNode || !this.parent.isDomNode();
		        this.vars = {
		            anchor: needsAnchor
		                ? block.getUniqueName(`${this.var}_anchor`)
		                : (this.next && this.next.var) || 'null',
		            create_each_block: this.block.name,
		            each_block_value: renderer.component.getUniqueName(`${this.var}_value`),
		            get_each_context: renderer.component.getUniqueName(`get_${this.var}_context`),
		            iterations: block.getUniqueName(`${this.var}_blocks`),
		            length: `[✂${c}-${c + 4}✂]`,
		            mountOrIntro: (this.block.hasIntroMethod || this.block.hasOutroMethod)
		                ? 'i'
		                : 'm'
		        };
		        this.contextProps = this.node.contexts.map(prop => `child_ctx.${prop.key.name} = list[i]${prop.tail};`);
		        if (this.hasBinding)
		            this.contextProps.push(`child_ctx.${this.vars.each_block_value} = list;`);
		        if (this.hasBinding || this.node.index)
		            this.contextProps.push(`child_ctx.${this.indexName} = i;`);
		        const { snippet } = this.node.expression;
		        block.builders.init.addLine(`var ${this.vars.each_block_value} = ${snippet};`);
		        renderer.blocks.push(deindent `
			function ${this.vars.get_each_context}(ctx, list, i) {
				const child_ctx = Object.create(ctx);
				${this.contextProps}
				return child_ctx;
			}
		`);
		        if (this.node.key) {
		            this.renderKeyed(block, parentNode, parentNodes, snippet);
		        }
		        else {
		            this.renderUnkeyed(block, parentNode, parentNodes, snippet);
		        }
		        if (needsAnchor) {
		            block.addElement(this.vars.anchor, `@createComment()`, parentNodes && `@createComment()`, parentNode);
		        }
		        if (this.else) {
		            const each_block_else = component.getUniqueName(`${this.var}_else`);
		            const mountOrIntro = (this.else.block.hasIntroMethod || this.else.block.hasOutroMethod) ? 'i' : 'm';
		            block.builders.init.addLine(`var ${each_block_else} = null;`);
		            // TODO neaten this up... will end up with an empty line in the block
		            block.builders.init.addBlock(deindent `
				if (!${this.vars.each_block_value}.${length}) {
					${each_block_else} = ${this.else.block.name}(#component, ctx);
					${each_block_else}.c();
				}
			`);
		            block.builders.mount.addBlock(deindent `
				if (${each_block_else}) {
					${each_block_else}.${mountOrIntro}(${parentNode || '#target'}, null);
				}
			`);
		            const initialMountNode = parentNode || `${this.vars.anchor}.parentNode`;
		            if (this.else.block.hasUpdateMethod) {
		                block.builders.update.addBlock(deindent `
					if (!${this.vars.each_block_value}.${length} && ${each_block_else}) {
						${each_block_else}.p(changed, ctx);
					} else if (!${this.vars.each_block_value}.${length}) {
						${each_block_else} = ${this.else.block.name}(#component, ctx);
						${each_block_else}.c();
						${each_block_else}.${mountOrIntro}(${initialMountNode}, ${this.vars.anchor});
					} else if (${each_block_else}) {
						${each_block_else}.d(1);
						${each_block_else} = null;
					}
				`);
		            }
		            else {
		                block.builders.update.addBlock(deindent `
					if (${this.vars.each_block_value}.${length}) {
						if (${each_block_else}) {
							${each_block_else}.d(1);
							${each_block_else} = null;
						}
					} else if (!${each_block_else}) {
						${each_block_else} = ${this.else.block.name}(#component, ctx);
						${each_block_else}.c();
						${each_block_else}.${mountOrIntro}(${initialMountNode}, ${this.vars.anchor});
					}
				`);
		            }
		            block.builders.destroy.addBlock(deindent `
				if (${each_block_else}) ${each_block_else}.d(${parentNode ? '' : 'detach'});
			`);
		        }
		        this.fragment.render(this.block, null, 'nodes');
		        if (this.else) {
		            this.else.fragment.render(this.else.block, null, 'nodes');
		        }
		    }
		    renderKeyed(block, parentNode, parentNodes, snippet) {
		        const { create_each_block, length, anchor, mountOrIntro, } = this.vars;
		        const get_key = block.getUniqueName('get_key');
		        const blocks = block.getUniqueName(`${this.var}_blocks`);
		        const lookup = block.getUniqueName(`${this.var}_lookup`);
		        block.addVariable(blocks, '[]');
		        block.addVariable(lookup, `@blankObject()`);
		        if (this.fragment.nodes[0].isDomNode()) {
		            this.block.first = this.fragment.nodes[0].var;
		        }
		        else {
		            this.block.first = this.block.getUniqueName('first');
		            this.block.addElement(this.block.first, `@createComment()`, parentNodes && `@createComment()`, null);
		        }
		        block.builders.init.addBlock(deindent `
			const ${get_key} = ctx => ${this.node.key.snippet};

			for (var #i = 0; #i < ${this.vars.each_block_value}.${length}; #i += 1) {
				let child_ctx = ${this.vars.get_each_context}(ctx, ${this.vars.each_block_value}, #i);
				let key = ${get_key}(child_ctx);
				${blocks}[#i] = ${lookup}[key] = ${create_each_block}(#component, key, child_ctx);
			}
		`);
		        const initialMountNode = parentNode || '#target';
		        const updateMountNode = this.getUpdateMountNode(anchor);
		        const anchorNode = parentNode ? 'null' : 'anchor';
		        block.builders.create.addBlock(deindent `
			for (#i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].c();
		`);
		        if (parentNodes) {
		            block.builders.claim.addBlock(deindent `
				for (#i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].l(${parentNodes});
			`);
		        }
		        block.builders.mount.addBlock(deindent `
			for (#i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].${mountOrIntro}(${initialMountNode}, ${anchorNode});
		`);
		        const dynamic = this.block.hasUpdateMethod;
		        const rects = block.getUniqueName('rects');
		        const destroy = this.node.hasAnimation
		            ? `@fixAndOutroAndDestroyBlock`
		            : this.block.hasOutros
		                ? `@outroAndDestroyBlock`
		                : `@destroyBlock`;
		        block.builders.update.addBlock(deindent `
			const ${this.vars.each_block_value} = ${snippet};

			${this.block.hasOutros && `@groupOutros();`}
			${this.node.hasAnimation && `for (let #i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].r();`}
			${blocks} = @updateKeyedEach(${blocks}, #component, changed, ${get_key}, ${dynamic ? '1' : '0'}, ctx, ${this.vars.each_block_value}, ${lookup}, ${updateMountNode}, ${destroy}, ${create_each_block}, "${mountOrIntro}", ${anchor}, ${this.vars.get_each_context});
			${this.node.hasAnimation && `for (let #i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].a();`}
		`);
		        if (this.block.hasOutros && this.renderer.component.options.nestedTransitions) {
		            const countdown = block.getUniqueName('countdown');
		            block.builders.outro.addBlock(deindent `
				const ${countdown} = @callAfter(#outrocallback, ${blocks}.length);
				for (#i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].o(${countdown});
			`);
		        }
		        block.builders.destroy.addBlock(deindent `
			for (#i = 0; #i < ${blocks}.length; #i += 1) ${blocks}[#i].d(${parentNode ? '' : 'detach'});
		`);
		    }
		    renderUnkeyed(block, parentNode, parentNodes, snippet) {
		        const { create_each_block, length, iterations, anchor, mountOrIntro, } = this.vars;
		        block.builders.init.addBlock(deindent `
			var ${iterations} = [];

			for (var #i = 0; #i < ${this.vars.each_block_value}.${length}; #i += 1) {
				${iterations}[#i] = ${create_each_block}(#component, ${this.vars.get_each_context}(ctx, ${this.vars.each_block_value}, #i));
			}
		`);
		        const initialMountNode = parentNode || '#target';
		        const updateMountNode = this.getUpdateMountNode(anchor);
		        const anchorNode = parentNode ? 'null' : 'anchor';
		        block.builders.create.addBlock(deindent `
			for (var #i = 0; #i < ${iterations}.length; #i += 1) {
				${iterations}[#i].c();
			}
		`);
		        if (parentNodes) {
		            block.builders.claim.addBlock(deindent `
				for (var #i = 0; #i < ${iterations}.length; #i += 1) {
					${iterations}[#i].l(${parentNodes});
				}
			`);
		        }
		        block.builders.mount.addBlock(deindent `
			for (var #i = 0; #i < ${iterations}.length; #i += 1) {
				${iterations}[#i].${mountOrIntro}(${initialMountNode}, ${anchorNode});
			}
		`);
		        const allDependencies = new Set(this.block.dependencies);
		        const { dependencies } = this.node.expression;
		        dependencies.forEach((dependency) => {
		            allDependencies.add(dependency);
		        });
		        const outroBlock = this.block.hasOutros && block.getUniqueName('outroBlock');
		        if (outroBlock) {
		            block.builders.init.addBlock(deindent `
				function ${outroBlock}(i, detach, fn) {
					if (${iterations}[i]) {
						${iterations}[i].o(() => {
							if (detach) {
								${iterations}[i].d(detach);
								${iterations}[i] = null;
							}
							if (fn) fn();
						});
					}
				}
			`);
		        }
		        // TODO do this for keyed blocks as well
		        const condition = Array.from(allDependencies)
		            .map(dependency => `changed.${dependency}`)
		            .join(' || ');
		        if (condition !== '') {
		            const forLoopBody = this.block.hasUpdateMethod
		                ? (this.block.hasIntros || this.block.hasOutros)
		                    ? deindent `
						if (${iterations}[#i]) {
							${iterations}[#i].p(changed, child_ctx);
						} else {
							${iterations}[#i] = ${create_each_block}(#component, child_ctx);
							${iterations}[#i].c();
						}
						${iterations}[#i].i(${updateMountNode}, ${anchor});
					`
		                    : deindent `
						if (${iterations}[#i]) {
							${iterations}[#i].p(changed, child_ctx);
						} else {
							${iterations}[#i] = ${create_each_block}(#component, child_ctx);
							${iterations}[#i].c();
							${iterations}[#i].m(${updateMountNode}, ${anchor});
						}
					`
		                : deindent `
					${iterations}[#i] = ${create_each_block}(#component, child_ctx);
					${iterations}[#i].c();
					${iterations}[#i].${mountOrIntro}(${updateMountNode}, ${anchor});
				`;
		            const start = this.block.hasUpdateMethod ? '0' : `${iterations}.length`;
		            let destroy;
		            if (this.block.hasOutros) {
		                destroy = deindent `
					@groupOutros();
					for (; #i < ${iterations}.length; #i += 1) ${outroBlock}(#i, 1);
				`;
		            }
		            else {
		                destroy = deindent `
					for (${this.block.hasUpdateMethod ? `` : `#i = ${this.vars.each_block_value}.${length}`}; #i < ${iterations}.length; #i += 1) {
						${iterations}[#i].d(1);
					}
					${iterations}.length = ${this.vars.each_block_value}.${length};
				`;
		            }
		            block.builders.update.addBlock(deindent `
				if (${condition}) {
					${this.vars.each_block_value} = ${snippet};

					for (var #i = ${start}; #i < ${this.vars.each_block_value}.${length}; #i += 1) {
						const child_ctx = ${this.vars.get_each_context}(ctx, ${this.vars.each_block_value}, #i);

						${forLoopBody}
					}

					${destroy}
				}
			`);
		        }
		        if (outroBlock && this.renderer.component.options.nestedTransitions) {
		            const countdown = block.getUniqueName('countdown');
		            block.builders.outro.addBlock(deindent `
				${iterations} = ${iterations}.filter(Boolean);
				const ${countdown} = @callAfter(#outrocallback, ${iterations}.length);
				for (let #i = 0; #i < ${iterations}.length; #i += 1) ${outroBlock}(#i, 0, ${countdown});`);
		        }
		        block.builders.destroy.addBlock(`@destroyEach(${iterations}, detach);`);
		    }
		    remount(name) {
		        // TODO consider keyed blocks
		        return `for (var #i = 0; #i < ${this.vars.iterations}.length; #i += 1) ${this.vars.iterations}[#i].m(${name}._slotted.default, null);`;
		    }
		}

		function isValidIdentifier(str) {
		    let i = 0;
		    while (i < str.length) {
		        const code = fullCharCodeAt(str, i);
		        if (!(i === 0 ? isIdentifierStart : isIdentifierChar)(code, true))
		            return false;
		        i += code <= 0xffff ? 1 : 2;
		    }
		    return true;
		}

		function quoteNameIfNecessary(name) {
		    if (!isValidIdentifier(name))
		        return `"${name}"`;
		    return name;
		}
		function quotePropIfNecessary(name) {
		    if (!isValidIdentifier(name))
		        return `["${name}"]`;
		    return `.${name}`;
		}

		const svgAttributes = 'accent-height accumulate additive alignment-baseline allowReorder alphabetic amplitude arabic-form ascent attributeName attributeType autoReverse azimuth baseFrequency baseline-shift baseProfile bbox begin bias by calcMode cap-height class clip clipPathUnits clip-path clip-rule color color-interpolation color-interpolation-filters color-profile color-rendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominant-baseline dur dx dy edgeMode elevation enable-background end exponent externalResourcesRequired fill fill-opacity fill-rule filter filterRes filterUnits flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight format from fr fx fy g1 g2 glyph-name glyph-orientation-horizontal glyph-orientation-vertical glyphRef gradientTransform gradientUnits hanging height href horiz-adv-x horiz-origin-x id ideographic image-rendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lang lengthAdjust letter-spacing lighting-color limitingConeAngle local marker-end marker-mid marker-start markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical max media method min mode name numOctaves offset onabort onactivate onbegin onclick onend onerror onfocusin onfocusout onload onmousedown onmousemove onmouseout onmouseover onmouseup onrepeat onresize onscroll onunload opacity operator order orient orientation origin overflow overline-position overline-thickness panose-1 paint-order pathLength patternContentUnits patternTransform patternUnits pointer-events points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY rendering-intent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shape-rendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stop-color stop-opacity strikethrough-position strikethrough-thickness string stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width style surfaceScale systemLanguage tabindex tableValues target targetX targetY text-anchor text-decoration text-rendering textLength to transform type u1 u2 underline-position underline-thickness unicode unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical values version vert-adv-y vert-origin-x vert-origin-y viewBox viewTarget visibility width widths word-spacing writing-mode x x-height x1 x2 xChannelSelector xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xml:lang xml:space y y1 y2 yChannelSelector z zoomAndPan'.split(' ');
		const svgAttributeLookup = new Map();
		svgAttributes.forEach(name => {
		    svgAttributeLookup.set(name.toLowerCase(), name);
		});
		function fixAttributeCasing(name) {
		    name = name.toLowerCase();
		    return svgAttributeLookup.get(name) || name;
		}

		const html = 'http://www.w3.org/1999/xhtml';
		const mathml = 'http://www.w3.org/1998/Math/MathML';
		const svg = 'http://www.w3.org/2000/svg';
		const xlink = 'http://www.w3.org/1999/xlink';
		const xml = 'http://www.w3.org/XML/1998/namespace';
		const xmlns = 'http://www.w3.org/2000/xmlns';
		const validNamespaces = [
		    'html',
		    'mathml',
		    'svg',
		    'xlink',
		    'xml',
		    'xmlns',
		    html,
		    mathml,
		    svg,
		    xlink,
		    xml,
		    xmlns,
		];
		const namespaces = { html, mathml, svg, xlink, xml, xmlns };

		class AttributeWrapper {
		    constructor(parent, block, node) {
		        this.node = node;
		        this.parent = parent;
		        if (node.dependencies.size > 0) {
		            parent.cannotUseInnerHTML();
		            block.addDependencies(node.dependencies);
		            // special case — <option value={foo}> — see below
		            if (this.parent.node.name === 'option' && node.name === 'value') {
		                let select = this.parent;
		                while (select && (select.node.type !== 'Element' || select.node.name !== 'select'))
		                    select = select.parent;
		                if (select && select.selectBindingDependencies) {
		                    select.selectBindingDependencies.forEach(prop => {
		                        this.node.dependencies.forEach((dependency) => {
		                            this.parent.renderer.component.indirectDependencies.get(prop).add(dependency);
		                        });
		                    });
		                }
		            }
		        }
		    }
		    render(block) {
		        const element = this.parent;
		        const name = fixAttributeCasing(this.node.name);
		        let metadata = element.node.namespace ? null : attributeLookup[name];
		        if (metadata && metadata.appliesTo && !~metadata.appliesTo.indexOf(element.node.name))
		            metadata = null;
		        const isIndirectlyBoundValue = name === 'value' &&
		            (element.node.name === 'option' || // TODO check it's actually bound
		                (element.node.name === 'input' &&
		                    element.node.bindings.find((binding) => /checked|group/.test(binding.name))));
		        const propertyName = isIndirectlyBoundValue
		            ? '__value'
		            : metadata && metadata.propertyName;
		        // xlink is a special case... we could maybe extend this to generic
		        // namespaced attributes but I'm not sure that's applicable in
		        // HTML5?
		        const method = /-/.test(element.node.name)
		            ? '@setCustomElementData'
		            : name.slice(0, 6) === 'xlink:'
		                ? '@setXlinkAttribute'
		                : '@setAttribute';
		        const isLegacyInputType = element.renderer.component.options.legacy && name === 'type' && this.parent.node.name === 'input';
		        const isDataSet = /^data-/.test(name) && !element.renderer.component.options.legacy && !element.node.namespace;
		        const camelCaseName = isDataSet ? name.replace('data-', '').replace(/(-\w)/g, function (m) {
		            return m[1].toUpperCase();
		        }) : name;
		        if (this.node.isDynamic) {
		            let value;
		            // TODO some of this code is repeated in Tag.ts — would be good to
		            // DRY it out if that's possible without introducing crazy indirection
		            if (this.node.chunks.length === 1) {
		                // single {tag} — may be a non-string
		                value = this.node.chunks[0].snippet;
		            }
		            else {
		                // '{foo} {bar}' — treat as string concatenation
		                value =
		                    (this.node.chunks[0].type === 'Text' ? '' : `"" + `) +
		                        this.node.chunks
		                            .map((chunk) => {
		                            if (chunk.type === 'Text') {
		                                return stringify(chunk.data);
		                            }
		                            else {
		                                return chunk.getPrecedence() <= 13
		                                    ? `(${chunk.snippet})`
		                                    : chunk.snippet;
		                            }
		                        })
		                            .join(' + ');
		            }
		            const isSelectValueAttribute = name === 'value' && element.node.name === 'select';
		            const shouldCache = this.node.shouldCache || isSelectValueAttribute;
		            const last = shouldCache && block.getUniqueName(`${element.var}_${name.replace(/[^a-zA-Z_$]/g, '_')}_value`);
		            if (shouldCache)
		                block.addVariable(last);
		            let updater;
		            const init = shouldCache ? `${last} = ${value}` : value;
		            if (isLegacyInputType) {
		                block.builders.hydrate.addLine(`@setInputType(${element.var}, ${init});`);
		                updater = `@setInputType(${element.var}, ${shouldCache ? last : value});`;
		            }
		            else if (isSelectValueAttribute) {
		                // annoying special case
		                const isMultipleSelect = element.getStaticAttributeValue('multiple');
		                const i = block.getUniqueName('i');
		                const option = block.getUniqueName('option');
		                const ifStatement = isMultipleSelect
		                    ? deindent `
						${option}.selected = ~${last}.indexOf(${option}.__value);`
		                    : deindent `
						if (${option}.__value === ${last}) {
							${option}.selected = true;
							break;
						}`;
		                updater = deindent `
					for (var ${i} = 0; ${i} < ${element.var}.options.length; ${i} += 1) {
						var ${option} = ${element.var}.options[${i}];

						${ifStatement}
					}
				`;
		                block.builders.mount.addBlock(deindent `
					${last} = ${value};
					${updater}
				`);
		            }
		            else if (propertyName) {
		                block.builders.hydrate.addLine(`${element.var}.${propertyName} = ${init};`);
		                updater = `${element.var}.${propertyName} = ${shouldCache ? last : value};`;
		            }
		            else if (isDataSet) {
		                block.builders.hydrate.addLine(`${element.var}.dataset.${camelCaseName} = ${init};`);
		                updater = `${element.var}.dataset.${camelCaseName} = ${shouldCache ? last : value};`;
		            }
		            else {
		                block.builders.hydrate.addLine(`${method}(${element.var}, "${name}", ${init});`);
		                updater = `${method}(${element.var}, "${name}", ${shouldCache ? last : value});`;
		            }
		            if (this.node.dependencies.size || isSelectValueAttribute) {
		                const dependencies = Array.from(this.node.dependencies);
		                const changedCheck = ((block.hasOutros ? `!#current || ` : '') +
		                    dependencies.map(dependency => `changed.${dependency}`).join(' || '));
		                const updateCachedValue = `${last} !== (${last} = ${value})`;
		                const condition = shouldCache ?
		                    (dependencies.length ? `(${changedCheck}) && ${updateCachedValue}` : updateCachedValue) :
		                    changedCheck;
		                block.builders.update.addConditional(condition, updater);
		            }
		        }
		        else {
		            const value = this.node.getValue();
		            const statement = (isLegacyInputType
		                ? `@setInputType(${element.var}, ${value});`
		                : propertyName
		                    ? `${element.var}.${propertyName} = ${value};`
		                    : isDataSet
		                        ? `${element.var}.dataset.${camelCaseName} = ${value};`
		                        : `${method}(${element.var}, "${name}", ${value});`);
		            block.builders.hydrate.addLine(statement);
		            // special case – autofocus. has to be handled in a bit of a weird way
		            if (this.node.isTrue && name === 'autofocus') {
		                block.autofocus = element.var;
		            }
		        }
		        if (isIndirectlyBoundValue) {
		            const updateValue = `${element.var}.value = ${element.var}.__value;`;
		            block.builders.hydrate.addLine(updateValue);
		            if (this.node.isDynamic)
		                block.builders.update.addLine(updateValue);
		        }
		    }
		    stringify() {
		        const value = this.node.chunks;
		        if (value === true)
		            return '';
		        if (value.length === 0)
		            return `=""`;
		        return `="${value.map(chunk => {
            return chunk.type === 'Text'
                ? chunk.data.replace(/"/g, '\\"')
                : `\${${chunk.snippet}}`;
        })}"`;
		    }
		}
		// source: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
		const attributeLookup = {
		    accept: { appliesTo: ['form', 'input'] },
		    'accept-charset': { propertyName: 'acceptCharset', appliesTo: ['form'] },
		    accesskey: { propertyName: 'accessKey' },
		    action: { appliesTo: ['form'] },
		    align: {
		        appliesTo: [
		            'applet',
		            'caption',
		            'col',
		            'colgroup',
		            'hr',
		            'iframe',
		            'img',
		            'table',
		            'tbody',
		            'td',
		            'tfoot',
		            'th',
		            'thead',
		            'tr',
		        ],
		    },
		    allowfullscreen: { propertyName: 'allowFullscreen', appliesTo: ['iframe'] },
		    alt: { appliesTo: ['applet', 'area', 'img', 'input'] },
		    async: { appliesTo: ['script'] },
		    autocomplete: { appliesTo: ['form', 'input'] },
		    autofocus: { appliesTo: ['button', 'input', 'keygen', 'select', 'textarea'] },
		    autoplay: { appliesTo: ['audio', 'video'] },
		    autosave: { appliesTo: ['input'] },
		    bgcolor: {
		        propertyName: 'bgColor',
		        appliesTo: [
		            'body',
		            'col',
		            'colgroup',
		            'marquee',
		            'table',
		            'tbody',
		            'tfoot',
		            'td',
		            'th',
		            'tr',
		        ],
		    },
		    border: { appliesTo: ['img', 'object', 'table'] },
		    buffered: { appliesTo: ['audio', 'video'] },
		    challenge: { appliesTo: ['keygen'] },
		    charset: { appliesTo: ['meta', 'script'] },
		    checked: { appliesTo: ['command', 'input'] },
		    cite: { appliesTo: ['blockquote', 'del', 'ins', 'q'] },
		    class: { propertyName: 'className' },
		    code: { appliesTo: ['applet'] },
		    codebase: { propertyName: 'codeBase', appliesTo: ['applet'] },
		    color: { appliesTo: ['basefont', 'font', 'hr'] },
		    cols: { appliesTo: ['textarea'] },
		    colspan: { propertyName: 'colSpan', appliesTo: ['td', 'th'] },
		    content: { appliesTo: ['meta'] },
		    contenteditable: { propertyName: 'contentEditable' },
		    contextmenu: {},
		    controls: { appliesTo: ['audio', 'video'] },
		    coords: { appliesTo: ['area'] },
		    data: { appliesTo: ['object'] },
		    datetime: { propertyName: 'dateTime', appliesTo: ['del', 'ins', 'time'] },
		    default: { appliesTo: ['track'] },
		    defer: { appliesTo: ['script'] },
		    dir: {},
		    dirname: { propertyName: 'dirName', appliesTo: ['input', 'textarea'] },
		    disabled: {
		        appliesTo: [
		            'button',
		            'command',
		            'fieldset',
		            'input',
		            'keygen',
		            'optgroup',
		            'option',
		            'select',
		            'textarea',
		        ],
		    },
		    download: { appliesTo: ['a', 'area'] },
		    draggable: {},
		    dropzone: {},
		    enctype: { appliesTo: ['form'] },
		    for: { propertyName: 'htmlFor', appliesTo: ['label', 'output'] },
		    form: {
		        appliesTo: [
		            'button',
		            'fieldset',
		            'input',
		            'keygen',
		            'label',
		            'meter',
		            'object',
		            'output',
		            'progress',
		            'select',
		            'textarea',
		        ],
		    },
		    formaction: { appliesTo: ['input', 'button'] },
		    headers: { appliesTo: ['td', 'th'] },
		    height: {
		        appliesTo: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'],
		    },
		    hidden: {},
		    high: { appliesTo: ['meter'] },
		    href: { appliesTo: ['a', 'area', 'base', 'link'] },
		    hreflang: { appliesTo: ['a', 'area', 'link'] },
		    'http-equiv': { propertyName: 'httpEquiv', appliesTo: ['meta'] },
		    icon: { appliesTo: ['command'] },
		    id: {},
		    indeterminate: { appliesTo: ['input'] },
		    ismap: { propertyName: 'isMap', appliesTo: ['img'] },
		    itemprop: {},
		    keytype: { appliesTo: ['keygen'] },
		    kind: { appliesTo: ['track'] },
		    label: { appliesTo: ['track'] },
		    lang: {},
		    language: { appliesTo: ['script'] },
		    loop: { appliesTo: ['audio', 'bgsound', 'marquee', 'video'] },
		    low: { appliesTo: ['meter'] },
		    manifest: { appliesTo: ['html'] },
		    max: { appliesTo: ['input', 'meter', 'progress'] },
		    maxlength: { propertyName: 'maxLength', appliesTo: ['input', 'textarea'] },
		    media: { appliesTo: ['a', 'area', 'link', 'source', 'style'] },
		    method: { appliesTo: ['form'] },
		    min: { appliesTo: ['input', 'meter'] },
		    multiple: { appliesTo: ['input', 'select'] },
		    muted: { appliesTo: ['audio', 'video'] },
		    name: {
		        appliesTo: [
		            'button',
		            'form',
		            'fieldset',
		            'iframe',
		            'input',
		            'keygen',
		            'object',
		            'output',
		            'select',
		            'textarea',
		            'map',
		            'meta',
		            'param',
		        ],
		    },
		    novalidate: { propertyName: 'noValidate', appliesTo: ['form'] },
		    open: { appliesTo: ['details'] },
		    optimum: { appliesTo: ['meter'] },
		    pattern: { appliesTo: ['input'] },
		    ping: { appliesTo: ['a', 'area'] },
		    placeholder: { appliesTo: ['input', 'textarea'] },
		    poster: { appliesTo: ['video'] },
		    preload: { appliesTo: ['audio', 'video'] },
		    radiogroup: { appliesTo: ['command'] },
		    readonly: { propertyName: 'readOnly', appliesTo: ['input', 'textarea'] },
		    rel: { appliesTo: ['a', 'area', 'link'] },
		    required: { appliesTo: ['input', 'select', 'textarea'] },
		    reversed: { appliesTo: ['ol'] },
		    rows: { appliesTo: ['textarea'] },
		    rowspan: { propertyName: 'rowSpan', appliesTo: ['td', 'th'] },
		    sandbox: { appliesTo: ['iframe'] },
		    scope: { appliesTo: ['th'] },
		    scoped: { appliesTo: ['style'] },
		    seamless: { appliesTo: ['iframe'] },
		    selected: { appliesTo: ['option'] },
		    shape: { appliesTo: ['a', 'area'] },
		    size: { appliesTo: ['input', 'select'] },
		    sizes: { appliesTo: ['link', 'img', 'source'] },
		    span: { appliesTo: ['col', 'colgroup'] },
		    spellcheck: {},
		    src: {
		        appliesTo: [
		            'audio',
		            'embed',
		            'iframe',
		            'img',
		            'input',
		            'script',
		            'source',
		            'track',
		            'video',
		        ],
		    },
		    srcdoc: { appliesTo: ['iframe'] },
		    srclang: { appliesTo: ['track'] },
		    srcset: { appliesTo: ['img'] },
		    start: { appliesTo: ['ol'] },
		    step: { appliesTo: ['input'] },
		    style: { propertyName: 'style.cssText' },
		    summary: { appliesTo: ['table'] },
		    tabindex: { propertyName: 'tabIndex' },
		    target: { appliesTo: ['a', 'area', 'base', 'form'] },
		    title: {},
		    type: {
		        appliesTo: [
		            'button',
		            'command',
		            'embed',
		            'object',
		            'script',
		            'source',
		            'style',
		            'menu',
		        ],
		    },
		    usemap: { propertyName: 'useMap', appliesTo: ['img', 'input', 'object'] },
		    value: {
		        appliesTo: [
		            'button',
		            'option',
		            'input',
		            'li',
		            'meter',
		            'progress',
		            'param',
		            'select',
		            'textarea',
		        ],
		    },
		    volume: { appliesTo: ['audio', 'video'] },
		    width: {
		        appliesTo: ['canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'],
		    },
		    wrap: { appliesTo: ['textarea'] },
		};
		Object.keys(attributeLookup).forEach(name => {
		    const metadata = attributeLookup[name];
		    if (!metadata.propertyName)
		        metadata.propertyName = name;
		});

		class StyleAttributeWrapper extends AttributeWrapper {
		    render(block) {
		        const styleProps = optimizeStyle(this.node.chunks);
		        if (!styleProps)
		            return super.render(block);
		        styleProps.forEach((prop) => {
		            let value;
		            if (isDynamic(prop.value)) {
		                const propDependencies = new Set();
		                value =
		                    ((prop.value.length === 1 || prop.value[0].type === 'Text') ? '' : `"" + `) +
		                        prop.value
		                            .map((chunk) => {
		                            if (chunk.type === 'Text') {
		                                return stringify(chunk.data);
		                            }
		                            else {
		                                const { dependencies, snippet } = chunk;
		                                dependencies.forEach(d => {
		                                    propDependencies.add(d);
		                                });
		                                return chunk.getPrecedence() <= 13 ? `(${snippet})` : snippet;
		                            }
		                        })
		                            .join(' + ');
		                if (propDependencies.size) {
		                    const dependencies = Array.from(propDependencies);
		                    const condition = ((block.hasOutros ? `!#current || ` : '') +
		                        dependencies.map(dependency => `changed.${dependency}`).join(' || '));
		                    block.builders.update.addConditional(condition, `@setStyle(${this.parent.var}, "${prop.key}", ${value});`);
		                }
		            }
		            else {
		                value = stringify(prop.value[0].data);
		            }
		            block.builders.hydrate.addLine(`@setStyle(${this.parent.var}, "${prop.key}", ${value});`);
		        });
		    }
		}
		function optimizeStyle(value) {
		    const props = [];
		    let chunks = value.slice();
		    while (chunks.length) {
		        const chunk = chunks[0];
		        if (chunk.type !== 'Text')
		            return null;
		        const keyMatch = /^\s*([\w-]+):\s*/.exec(chunk.data);
		        if (!keyMatch)
		            return null;
		        const key = keyMatch[1];
		        const offset = keyMatch.index + keyMatch[0].length;
		        const remainingData = chunk.data.slice(offset);
		        if (remainingData) {
		            chunks[0] = {
		                start: chunk.start + offset,
		                end: chunk.end,
		                type: 'Text',
		                data: remainingData
		            };
		        }
		        else {
		            chunks.shift();
		        }
		        const result = getStyleValue(chunks);
		        if (!result)
		            return null;
		        props.push({ key, value: result.value });
		        chunks = result.chunks;
		    }
		    return props;
		}
		function getStyleValue(chunks) {
		    const value = [];
		    let inUrl = false;
		    let quoteMark = null;
		    let escaped = false;
		    while (chunks.length) {
		        const chunk = chunks.shift();
		        if (chunk.type === 'Text') {
		            let c = 0;
		            while (c < chunk.data.length) {
		                const char = chunk.data[c];
		                if (escaped) {
		                    escaped = false;
		                }
		                else if (char === '\\') {
		                    escaped = true;
		                }
		                else if (char === quoteMark) ;
		                else if (char === '"' || char === "'") {
		                    quoteMark = char;
		                }
		                else if (char === ')' && inUrl) {
		                    inUrl = false;
		                }
		                else if (char === 'u' && chunk.data.slice(c, c + 4) === 'url(') {
		                    inUrl = true;
		                }
		                else if (char === ';' && !inUrl && !quoteMark) {
		                    break;
		                }
		                c += 1;
		            }
		            if (c > 0) {
		                value.push({
		                    type: 'Text',
		                    start: chunk.start,
		                    end: chunk.start + c,
		                    data: chunk.data.slice(0, c)
		                });
		            }
		            while (/[;\s]/.test(chunk.data[c]))
		                c += 1;
		            const remainingData = chunk.data.slice(c);
		            if (remainingData) {
		                chunks.unshift({
		                    start: chunk.start + c,
		                    end: chunk.end,
		                    type: 'Text',
		                    data: remainingData
		                });
		                break;
		            }
		        }
		        else {
		            value.push(chunk);
		        }
		    }
		    return {
		        chunks,
		        value
		    };
		}
		function isDynamic(value) {
		    return value.length > 1 || value[0].type !== 'Text';
		}

		function getObject(node) {
		    while (node.type === 'MemberExpression')
		        node = node.object;
		    return node;
		}

		function flattenReference(node) {
		    if (node.type === 'Expression')
		        throw new Error('bad');
		    const nodes = [];
		    const parts = [];
		    const propEnd = node.end;
		    while (node.type === 'MemberExpression') {
		        if (node.computed)
		            return null;
		        nodes.unshift(node.property);
		        parts.unshift(node.property.name);
		        node = node.object;
		    }
		    const propStart = node.end;
		    const name = node.type === 'Identifier'
		        ? node.name
		        : node.type === 'ThisExpression' ? 'this' : null;
		    if (!name)
		        return null;
		    parts.unshift(name);
		    nodes.unshift(node);
		    return { name, nodes, parts, keypath: `${name}[✂${propStart}-${propEnd}✂]` };
		}

		function getTailSnippet(node) {
		    const end = node.end;
		    while (node.type === 'MemberExpression')
		        node = node.object;
		    const start = node.end;
		    return `[✂${start}-${end}✂]`;
		}

		// TODO this should live in a specific binding
		const readOnlyMediaAttributes = new Set([
		    'duration',
		    'buffered',
		    'seekable',
		    'played'
		]);
		class BindingWrapper {
		    constructor(block, node, parent) {
		        this.node = node;
		        this.parent = parent;
		        const { dependencies } = this.node.value;
		        block.addDependencies(dependencies);
		        // TODO does this also apply to e.g. `<input type='checkbox' bind:group='foo'>`?
		        if (parent.node.name === 'select') {
		            parent.selectBindingDependencies = dependencies;
		            dependencies.forEach((prop) => {
		                parent.renderer.component.indirectDependencies.set(prop, new Set());
		            });
		        }
		        if (node.isContextual) {
		            // we need to ensure that the each block creates a context including
		            // the list and the index, if they're not otherwise referenced
		            const { name } = getObject(this.node.value.node);
		            const eachBlock = block.contextOwners.get(name);
		            eachBlock.hasBinding = true;
		        }
		    }
		    isReadOnlyMediaAttribute() {
		        return readOnlyMediaAttributes.has(this.node.name);
		    }
		    munge(block) {
		        const { parent } = this;
		        const { renderer } = parent;
		        const needsLock = (parent.node.name !== 'input' ||
		            !/radio|checkbox|range|color/.test(parent.node.getStaticAttributeValue('type')));
		        const isReadOnly = ((parent.node.isMediaNode() && readOnlyMediaAttributes.has(this.node.name)) ||
		            dimensions.test(this.node.name));
		        let updateConditions = [];
		        const { name } = getObject(this.node.value.node);
		        const { snippet } = this.node.value;
		        // special case: if you have e.g. `<input type=checkbox bind:checked=selected.done>`
		        // and `selected` is an object chosen with a <select>, then when `checked` changes,
		        // we need to tell the component to update all the values `selected` might be
		        // pointing to
		        // TODO should this happen in preprocess?
		        const dependencies = new Set(this.node.value.dependencies);
		        this.node.value.dependencies.forEach((prop) => {
		            const indirectDependencies = renderer.component.indirectDependencies.get(prop);
		            if (indirectDependencies) {
		                indirectDependencies.forEach(indirectDependency => {
		                    dependencies.add(indirectDependency);
		                });
		            }
		        });
		        // view to model
		        const valueFromDom = getValueFromDom(renderer, this.parent, this);
		        const handler = getEventHandler(this, renderer, block, name, snippet, dependencies, valueFromDom);
		        // model to view
		        let updateDom = getDomUpdater(parent, this, snippet);
		        let initialUpdate = updateDom;
		        // special cases
		        if (this.node.name === 'group') {
		            const bindingGroup = getBindingGroup(renderer, this.node.value.node);
		            block.builders.hydrate.addLine(`#component._bindingGroups[${bindingGroup}].push(${parent.var});`);
		            block.builders.destroy.addLine(`#component._bindingGroups[${bindingGroup}].splice(#component._bindingGroups[${bindingGroup}].indexOf(${parent.var}), 1);`);
		        }
		        if (this.node.name === 'currentTime' || this.node.name === 'volume') {
		            updateConditions.push(`!isNaN(${snippet})`);
		            if (this.node.name === 'currentTime')
		                initialUpdate = null;
		        }
		        if (this.node.name === 'paused') {
		            // this is necessary to prevent audio restarting by itself
		            const last = block.getUniqueName(`${parent.var}_is_paused`);
		            block.addVariable(last, 'true');
		            updateConditions.push(`${last} !== (${last} = ${snippet})`);
		            updateDom = `${parent.var}[${last} ? "pause" : "play"]();`;
		            initialUpdate = null;
		        }
		        // bind:offsetWidth and bind:offsetHeight
		        if (dimensions.test(this.node.name)) {
		            initialUpdate = null;
		            updateDom = null;
		        }
		        const dependencyArray = [...this.node.value.dependencies];
		        if (dependencyArray.length === 1) {
		            updateConditions.push(`changed.${dependencyArray[0]}`);
		        }
		        else if (dependencyArray.length > 1) {
		            updateConditions.push(`(${dependencyArray.map(prop => `changed.${prop}`).join(' || ')})`);
		        }
		        return {
		            name: this.node.name,
		            object: name,
		            handler: handler,
		            usesContext: handler.usesContext,
		            updateDom: updateDom,
		            initialUpdate: initialUpdate,
		            needsLock: !isReadOnly && needsLock,
		            updateCondition: updateConditions.length ? updateConditions.join(' && ') : undefined,
		            isReadOnlyMediaAttribute: this.isReadOnlyMediaAttribute()
		        };
		    }
		}
		function getDomUpdater(element, binding, snippet) {
		    const { node } = element;
		    if (binding.isReadOnlyMediaAttribute()) {
		        return null;
		    }
		    if (node.name === 'select') {
		        return node.getStaticAttributeValue('multiple') === true ?
		            `@selectOptions(${element.var}, ${snippet})` :
		            `@selectOption(${element.var}, ${snippet})`;
		    }
		    if (binding.node.name === 'group') {
		        const type = node.getStaticAttributeValue('type');
		        const condition = type === 'checkbox'
		            ? `~${snippet}.indexOf(${element.var}.__value)`
		            : `${element.var}.__value === ${snippet}`;
		        return `${element.var}.checked = ${condition};`;
		    }
		    return `${element.var}.${binding.node.name} = ${snippet};`;
		}
		function getBindingGroup(renderer, value) {
		    const { parts } = flattenReference(value); // TODO handle cases involving computed member expressions
		    const keypath = parts.join('.');
		    // TODO handle contextual bindings — `keypath` should include unique ID of
		    // each block that provides context
		    let index = renderer.bindingGroups.indexOf(keypath);
		    if (index === -1) {
		        index = renderer.bindingGroups.length;
		        renderer.bindingGroups.push(keypath);
		    }
		    return index;
		}
		function getEventHandler(binding, renderer, block, name, snippet, dependencies, value) {
		    const storeDependencies = [...dependencies].filter(prop => prop[0] === '$').map(prop => prop.slice(1));
		    let dependenciesArray = [...dependencies].filter(prop => prop[0] !== '$');
		    if (binding.node.isContextual) {
		        const tail = binding.node.value.node.type === 'MemberExpression'
		            ? getTailSnippet(binding.node.value.node)
		            : '';
		        const head = block.bindings.get(name);
		        return {
		            usesContext: true,
		            usesState: true,
		            usesStore: storeDependencies.length > 0,
		            mutation: `${head()}${tail} = ${value};`,
		            props: dependenciesArray.map(prop => `${prop}: ctx.${prop}`),
		            storeProps: storeDependencies.map(prop => `${prop}: $.${prop}`)
		        };
		    }
		    if (binding.node.value.node.type === 'MemberExpression') {
		        // This is a little confusing, and should probably be tidied up
		        // at some point. It addresses a tricky bug (#893), wherein
		        // Svelte tries to `set()` a computed property, which throws an
		        // error in dev mode. a) it's possible that we should be
		        // replacing computations with *their* dependencies, and b)
		        // we should probably populate `component.target.readonly` sooner so
		        // that we don't have to do the `.some()` here
		        dependenciesArray = dependenciesArray.filter(prop => !renderer.component.computations.some(computation => computation.key === prop));
		        return {
		            usesContext: false,
		            usesState: true,
		            usesStore: storeDependencies.length > 0,
		            mutation: `${snippet} = ${value}`,
		            props: dependenciesArray.map((prop) => `${prop}: ctx.${prop}`),
		            storeProps: storeDependencies.map(prop => `${prop}: $.${prop}`)
		        };
		    }
		    let props;
		    let storeProps;
		    if (name[0] === '$') {
		        props = [];
		        storeProps = [`${name.slice(1)}: ${value}`];
		    }
		    else {
		        props = [`${name}: ${value}`];
		        storeProps = [];
		    }
		    return {
		        usesContext: false,
		        usesState: false,
		        usesStore: false,
		        mutation: null,
		        props,
		        storeProps
		    };
		}
		function getValueFromDom(renderer, element, binding) {
		    const { node } = element;
		    const { name } = binding.node;
		    // <select bind:value='selected>
		    if (node.name === 'select') {
		        return node.getStaticAttributeValue('multiple') === true ?
		            `@selectMultipleValue(${element.var})` :
		            `@selectValue(${element.var})`;
		    }
		    const type = node.getStaticAttributeValue('type');
		    // <input type='checkbox' bind:group='foo'>
		    if (name === 'group') {
		        const bindingGroup = getBindingGroup(renderer, binding.node.value.node);
		        if (type === 'checkbox') {
		            return `@getBindingGroupValue(#component._bindingGroups[${bindingGroup}])`;
		        }
		        return `${element.var}.__value`;
		    }
		    // <input type='range|number' bind:value>
		    if (type === 'range' || type === 'number') {
		        return `@toNumber(${element.var}.${name})`;
		    }
		    if ((name === 'buffered' || name === 'seekable' || name === 'played')) {
		        return `@timeRangesToArray(${element.var}.${name})`;
		    }
		    // everything else
		    return `${element.var}.${name}`;
		}

		const events = [
		    {
		        eventNames: ['input'],
		        filter: (node, name) => node.name === 'textarea' ||
		            node.name === 'input' && !/radio|checkbox|range/.test(node.getStaticAttributeValue('type'))
		    },
		    {
		        eventNames: ['change'],
		        filter: (node, name) => node.name === 'select' ||
		            node.name === 'input' && /radio|checkbox/.test(node.getStaticAttributeValue('type'))
		    },
		    {
		        eventNames: ['change', 'input'],
		        filter: (node, name) => node.name === 'input' && node.getStaticAttributeValue('type') === 'range'
		    },
		    {
		        eventNames: ['resize'],
		        filter: (node, name) => dimensions.test(name)
		    },
		    // media events
		    {
		        eventNames: ['timeupdate'],
		        filter: (node, name) => node.isMediaNode() &&
		            (name === 'currentTime' || name === 'played')
		    },
		    {
		        eventNames: ['durationchange'],
		        filter: (node, name) => node.isMediaNode() &&
		            name === 'duration'
		    },
		    {
		        eventNames: ['play', 'pause'],
		        filter: (node, name) => node.isMediaNode() &&
		            name === 'paused'
		    },
		    {
		        eventNames: ['progress'],
		        filter: (node, name) => node.isMediaNode() &&
		            name === 'buffered'
		    },
		    {
		        eventNames: ['loadedmetadata'],
		        filter: (node, name) => node.isMediaNode() &&
		            (name === 'buffered' || name === 'seekable')
		    },
		    {
		        eventNames: ['volumechange'],
		        filter: (node, name) => node.isMediaNode() &&
		            name === 'volume'
		    }
		];
		class ElementWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = node.name.replace(/[^a-zA-Z0-9_$]/g, '_');
		        this.classDependencies = [];
		        this.attributes = this.node.attributes.map(attribute => {
		            if (attribute.name === 'slot') {
		                // TODO make separate subclass for this?
		                let owner = this.parent;
		                while (owner) {
		                    if (owner.node.type === 'InlineComponent') {
		                        break;
		                    }
		                    if (owner.node.type === 'Element' && /-/.test(owner.node.name)) {
		                        break;
		                    }
		                    owner = owner.parent;
		                }
		                if (owner && owner.node.type === 'InlineComponent') {
		                    this.slotOwner = owner;
		                    owner._slots.add(attribute.getStaticValue());
		                }
		            }
		            if (attribute.name === 'style') {
		                return new StyleAttributeWrapper(this, block, attribute);
		            }
		            return new AttributeWrapper(this, block, attribute);
		        });
		        let has_bindings;
		        const binding_lookup = {};
		        this.node.bindings.forEach(binding => {
		            binding_lookup[binding.name] = binding;
		            has_bindings = true;
		        });
		        const type = this.node.getStaticAttributeValue('type');
		        // ordinarily, there'll only be one... but we need to handle
		        // the rare case where an element can have multiple bindings,
		        // e.g. <audio bind:paused bind:currentTime>
		        this.bindings = this.node.bindings.map(binding => new BindingWrapper(block, binding, this));
		        // TODO remove this, it's just useful during refactoring
		        if (has_bindings && !this.bindings.length) {
		            throw new Error(`no binding was created`);
		        }
		        if (node.intro || node.outro) {
		            if (node.intro)
		                block.addIntro();
		            if (node.outro)
		                block.addOutro();
		        }
		        if (node.animation) {
		            block.addAnimation();
		        }
		        // add directive and handler dependencies
		        [node.animation, node.outro, ...node.actions, ...node.classes].forEach(directive => {
		            if (directive && directive.expression) {
		                block.addDependencies(directive.expression.dependencies);
		            }
		        });
		        node.handlers.forEach(handler => {
		            block.addDependencies(handler.dependencies);
		        });
		        if (this.parent) {
		            if (node.actions.length > 0)
		                this.parent.cannotUseInnerHTML();
		            if (node.animation)
		                this.parent.cannotUseInnerHTML();
		            if (node.bindings.length > 0)
		                this.parent.cannotUseInnerHTML();
		            if (node.classes.length > 0)
		                this.parent.cannotUseInnerHTML();
		            if (node.intro || node.outro)
		                this.parent.cannotUseInnerHTML();
		            if (node.handlers.length > 0)
		                this.parent.cannotUseInnerHTML();
		            if (node.ref)
		                this.parent.cannotUseInnerHTML();
		            if (this.node.name === 'option')
		                this.parent.cannotUseInnerHTML();
		            if (renderer.options.dev) {
		                this.parent.cannotUseInnerHTML(); // need to use addLoc
		            }
		        }
		        this.fragment = new FragmentWrapper(renderer, block, node.children, this, stripWhitespace, nextSibling);
		    }
		    render(block, parentNode, parentNodes) {
		        const { renderer } = this;
		        if (this.node.name === 'slot') {
		            const slotName = this.getStaticAttributeValue('name') || 'default';
		            renderer.slots.add(slotName);
		        }
		        if (this.node.name === 'noscript')
		            return;
		        const node = this.var;
		        const nodes = parentNodes && block.getUniqueName(`${this.var}_nodes`); // if we're in unclaimable territory, i.e. <head>, parentNodes is null
		        const slot = this.node.attributes.find((attribute) => attribute.name === 'slot');
		        const prop = slot && quotePropIfNecessary(slot.chunks[0].data);
		        let initialMountNode;
		        if (this.slotOwner) {
		            initialMountNode = `${this.slotOwner.var}._slotted${prop}`;
		        }
		        else {
		            initialMountNode = parentNode;
		        }
		        block.addVariable(node);
		        const renderStatement = this.getRenderStatement();
		        block.builders.create.addLine(`${node} = ${renderStatement};`);
		        if (renderer.options.hydratable) {
		            if (parentNodes) {
		                block.builders.claim.addBlock(deindent `
					${node} = ${this.getClaimStatement(parentNodes)};
					var ${nodes} = @children(${this.node.name === 'template' ? `${node}.content` : node});
				`);
		            }
		            else {
		                block.builders.claim.addLine(`${node} = ${renderStatement};`);
		            }
		        }
		        if (initialMountNode) {
		            block.builders.mount.addLine(`@append(${initialMountNode}, ${node});`);
		            if (initialMountNode === 'document.head') {
		                block.builders.destroy.addLine(`@detachNode(${node});`);
		            }
		        }
		        else {
		            block.builders.mount.addLine(`@insert(#target, ${node}, anchor);`);
		            // TODO we eventually need to consider what happens to elements
		            // that belong to the same outgroup as an outroing element...
		            block.builders.destroy.addConditional('detach', `@detachNode(${node});`);
		        }
		        // insert static children with textContent or innerHTML
		        if (!this.node.namespace && this.canUseInnerHTML && this.fragment.nodes.length > 0) {
		            if (this.fragment.nodes.length === 1 && this.fragment.nodes[0].node.type === 'Text') {
		                block.builders.create.addLine(`${node}.textContent = ${stringify(this.fragment.nodes[0].data)};`);
		            }
		            else {
		                const innerHTML = escape$1(this.fragment.nodes
		                    .map(toHTML)
		                    .join(''));
		                block.builders.create.addLine(`${node}.innerHTML = \`${innerHTML}\`;`);
		            }
		        }
		        else {
		            this.fragment.nodes.forEach((child) => {
		                child.render(block, this.node.name === 'template' ? `${node}.content` : node, nodes);
		            });
		        }
		        let hasHoistedEventHandlerOrBinding = (
		        //(this.hasAncestor('EachBlock') && this.bindings.length > 0) ||
		        this.node.handlers.some(handler => handler.shouldHoist));
		        const eventHandlerOrBindingUsesComponent = (this.bindings.length > 0 ||
		            this.node.handlers.some(handler => handler.usesComponent));
		        const eventHandlerOrBindingUsesContext = (this.bindings.some(binding => binding.node.usesContext) ||
		            this.node.handlers.some(handler => handler.usesContext));
		        if (hasHoistedEventHandlerOrBinding) {
		            const initialProps = [];
		            if (eventHandlerOrBindingUsesComponent) {
		                const component = block.alias('component');
		                initialProps.push(component === 'component' ? 'component' : `component: ${component}`);
		            }
		            if (eventHandlerOrBindingUsesContext) {
		                initialProps.push(`ctx`);
		                block.builders.update.addLine(`${node}._svelte.ctx = ctx;`);
		                block.maintainContext = true;
		            }
		            if (initialProps.length) {
		                block.builders.hydrate.addBlock(deindent `
					${node}._svelte = { ${initialProps.join(', ')} };
				`);
		            }
		        }
		        else {
		            if (eventHandlerOrBindingUsesContext) {
		                block.maintainContext = true;
		            }
		        }
		        this.addBindings(block);
		        this.addEventHandlers(block);
		        if (this.node.ref)
		            this.addRef(block);
		        this.addAttributes(block);
		        this.addTransitions(block);
		        this.addAnimation(block);
		        this.addActions(block);
		        this.addClasses(block);
		        if (this.initialUpdate) {
		            block.builders.mount.addBlock(this.initialUpdate);
		        }
		        if (nodes) {
		            block.builders.claim.addLine(`${nodes}.forEach(@detachNode);`);
		        }
		        function toHTML(wrapper) {
		            if (wrapper.node.type === 'Text') {
		                const { parent } = wrapper.node;
		                const raw = parent && (parent.name === 'script' ||
		                    parent.name === 'style');
		                return raw
		                    ? wrapper.node.data
		                    : escapeHTML(wrapper.node.data)
		                        .replace(/\\/g, '\\\\')
		                        .replace(/`/g, '\\`')
		                        .replace(/\$/g, '\\$');
		            }
		            if (wrapper.node.name === 'noscript')
		                return '';
		            let open = `<${wrapper.node.name}`;
		            wrapper.attributes.forEach((attr) => {
		                open += ` ${fixAttributeCasing(attr.node.name)}${attr.stringify()}`;
		            });
		            if (isVoidElementName(wrapper.node.name))
		                return open + '>';
		            return `${open}>${wrapper.fragment.nodes.map(toHTML).join('')}</${wrapper.node.name}>`;
		        }
		        if (renderer.options.dev) {
		            const loc = renderer.locate(this.node.start);
		            block.builders.hydrate.addLine(`@addLoc(${this.var}, ${renderer.fileVar}, ${loc.line}, ${loc.column}, ${this.node.start});`);
		        }
		    }
		    getRenderStatement() {
		        const { name, namespace } = this.node;
		        if (namespace === 'http://www.w3.org/2000/svg') {
		            return `@createSvgElement("${name}")`;
		        }
		        if (namespace) {
		            return `document.createElementNS("${namespace}", "${name}")`;
		        }
		        return `@createElement("${name}")`;
		    }
		    getClaimStatement(nodes) {
		        const attributes = this.node.attributes
		            .filter((attr) => attr.type === 'Attribute')
		            .map((attr) => `${quoteNameIfNecessary(attr.name)}: true`)
		            .join(', ');
		        const name = this.node.namespace
		            ? this.node.name
		            : this.node.name.toUpperCase();
		        return `@claimElement(${nodes}, "${name}", ${attributes
            ? `{ ${attributes} }`
            : `{}`}, ${this.node.namespace === namespaces.svg ? true : false})`;
		    }
		    addBindings(block) {
		        const { renderer } = this;
		        if (this.bindings.length === 0)
		            return;
		        if (this.node.name === 'select' || this.isMediaNode()) {
		            this.renderer.hasComplexBindings = true;
		        }
		        const needsLock = this.node.name !== 'input' || !/radio|checkbox|range|color/.test(this.getStaticAttributeValue('type'));
		        // TODO munge in constructor
		        const mungedBindings = this.bindings.map(binding => binding.munge(block));
		        const lock = mungedBindings.some(binding => binding.needsLock) ?
		            block.getUniqueName(`${this.var}_updating`) :
		            null;
		        if (lock)
		            block.addVariable(lock, 'false');
		        const groups = events
		            .map(event => {
		            return {
		                events: event.eventNames,
		                bindings: mungedBindings.filter(binding => event.filter(this.node, binding.name))
		            };
		        })
		            .filter(group => group.bindings.length);
		        groups.forEach(group => {
		            const handler = block.getUniqueName(`${this.var}_${group.events.join('_')}_handler`);
		            const needsLock = group.bindings.some(binding => binding.needsLock);
		            group.bindings.forEach(binding => {
		                if (!binding.updateDom)
		                    return;
		                const updateConditions = needsLock ? [`!${lock}`] : [];
		                if (binding.updateCondition)
		                    updateConditions.push(binding.updateCondition);
		                block.builders.update.addLine(updateConditions.length ? `if (${updateConditions.join(' && ')}) ${binding.updateDom}` : binding.updateDom);
		            });
		            const usesStore = group.bindings.some(binding => binding.handler.usesStore);
		            const mutations = group.bindings.map(binding => binding.handler.mutation).filter(Boolean).join('\n');
		            const props = new Set();
		            const storeProps = new Set();
		            group.bindings.forEach(binding => {
		                binding.handler.props.forEach(prop => {
		                    props.add(prop);
		                });
		                binding.handler.storeProps.forEach(prop => {
		                    storeProps.add(prop);
		                });
		            }); // TODO use stringifyProps here, once indenting is fixed
		            // media bindings — awkward special case. The native timeupdate events
		            // fire too infrequently, so we need to take matters into our
		            // own hands
		            let animation_frame;
		            if (group.events[0] === 'timeupdate') {
		                animation_frame = block.getUniqueName(`${this.var}_animationframe`);
		                block.addVariable(animation_frame);
		            }
		            block.builders.init.addBlock(deindent `
				function ${handler}() {
					${animation_frame && deindent `
							cancelAnimationFrame(${animation_frame});
							if (!${this.var}.paused) ${animation_frame} = requestAnimationFrame(${handler});`}
					${usesStore && `var $ = #component.store.get();`}
					${needsLock && `${lock} = true;`}
					${mutations.length > 0 && mutations}
					${props.size > 0 && `#component.set({ ${Array.from(props).join(', ')} });`}
					${storeProps.size > 0 && `#component.store.set({ ${Array.from(storeProps).join(', ')} });`}
					${needsLock && `${lock} = false;`}
				}
			`);
		            group.events.forEach(name => {
		                if (name === 'resize') {
		                    // special case
		                    const resize_listener = block.getUniqueName(`${this.var}_resize_listener`);
		                    block.addVariable(resize_listener);
		                    block.builders.mount.addLine(`${resize_listener} = @addResizeListener(${this.var}, ${handler});`);
		                    block.builders.destroy.addLine(`${resize_listener}.cancel();`);
		                }
		                else {
		                    block.builders.hydrate.addLine(`@addListener(${this.var}, "${name}", ${handler});`);
		                    block.builders.destroy.addLine(`@removeListener(${this.var}, "${name}", ${handler});`);
		                }
		            });
		            const allInitialStateIsDefined = group.bindings
		                .map(binding => `'${binding.object}' in ctx`)
		                .join(' && ');
		            if (this.node.name === 'select' || group.bindings.find(binding => binding.name === 'indeterminate' || binding.isReadOnlyMediaAttribute)) {
		                renderer.hasComplexBindings = true;
		                block.builders.hydrate.addLine(`if (!(${allInitialStateIsDefined})) #component.root._beforecreate.push(${handler});`);
		            }
		            if (group.events[0] === 'resize') {
		                renderer.hasComplexBindings = true;
		                block.builders.hydrate.addLine(`#component.root._beforecreate.push(${handler});`);
		            }
		        });
		        this.initialUpdate = mungedBindings.map(binding => binding.initialUpdate).filter(Boolean).join('\n');
		    }
		    addAttributes(block) {
		        if (this.node.attributes.find(attr => attr.type === 'Spread')) {
		            this.addSpreadAttributes(block);
		            return;
		        }
		        this.attributes.forEach((attribute) => {
		            if (attribute.node.name === 'class' && attribute.node.isDynamic) {
		                this.classDependencies.push(...attribute.node.dependencies);
		            }
		            attribute.render(block);
		        });
		    }
		    addSpreadAttributes(block) {
		        const levels = block.getUniqueName(`${this.var}_levels`);
		        const data = block.getUniqueName(`${this.var}_data`);
		        const initialProps = [];
		        const updates = [];
		        this.node.attributes
		            .filter(attr => attr.type === 'Attribute' || attr.type === 'Spread')
		            .forEach(attr => {
		            const condition = attr.dependencies.size > 0
		                ? `(${[...attr.dependencies].map(d => `changed.${d}`).join(' || ')})`
		                : null;
		            if (attr.isSpread) {
		                const { snippet, dependencies } = attr.expression;
		                initialProps.push(snippet);
		                updates.push(condition ? `${condition} && ${snippet}` : snippet);
		            }
		            else {
		                const snippet = `{ ${quoteNameIfNecessary(attr.name)}: ${attr.getValue()} }`;
		                initialProps.push(snippet);
		                updates.push(condition ? `${condition} && ${snippet}` : snippet);
		            }
		        });
		        block.builders.init.addBlock(deindent `
			var ${levels} = [
				${initialProps.join(',\n')}
			];

			var ${data} = {};
			for (var #i = 0; #i < ${levels}.length; #i += 1) {
				${data} = @assign(${data}, ${levels}[#i]);
			}
		`);
		        block.builders.hydrate.addLine(`@setAttributes(${this.var}, ${data});`);
		        block.builders.update.addBlock(deindent `
			@setAttributes(${this.var}, @getSpreadUpdate(${levels}, [
				${updates.join(',\n')}
			]));
		`);
		    }
		    addEventHandlers(block) {
		        const { renderer } = this;
		        const { component } = renderer;
		        this.node.handlers.forEach(handler => {
		            const isCustomEvent = component.events.has(handler.name);
		            if (handler.callee) {
		                // TODO move handler render method into a wrapper
		                handler.render(this.renderer.component, block, this.var, handler.shouldHoist);
		            }
		            const target = handler.shouldHoist ? 'this' : this.var;
		            // get a name for the event handler that is globally unique
		            // if hoisted, locally unique otherwise
		            const handlerName = (handler.shouldHoist ? component : block).getUniqueName(`${handler.name.replace(/[^a-zA-Z0-9_$]/g, '_')}_handler`);
		            const component_name = block.alias('component'); // can't use #component, might be hoisted
		            // create the handler body
		            const handlerBody = deindent `
				${handler.shouldHoist && (handler.usesComponent || handler.usesContext
                ? `const { ${[handler.usesComponent && 'component', handler.usesContext && 'ctx'].filter(Boolean).join(', ')} } = ${target}._svelte;`
                : null)}

				${handler.snippet ?
                handler.snippet :
                `${component_name}.fire("${handler.name}", event);`}
			`;
		            if (isCustomEvent) {
		                block.addVariable(handlerName);
		                block.builders.hydrate.addBlock(deindent `
					${handlerName} = %events-${handler.name}.call(${component_name}, ${this.var}, function(event) {
						${handlerBody}
					});
				`);
		                block.builders.destroy.addLine(deindent `
					${handlerName}.destroy();
				`);
		            }
		            else {
		                const modifiers = [];
		                if (handler.modifiers.has('preventDefault'))
		                    modifiers.push('event.preventDefault();');
		                if (handler.modifiers.has('stopPropagation'))
		                    modifiers.push('event.stopPropagation();');
		                const handlerFunction = deindent `
					function ${handlerName}(event) {
						${modifiers}
						${handlerBody}
					}
				`;
		                if (handler.shouldHoist) {
		                    renderer.blocks.push(handlerFunction);
		                }
		                else {
		                    block.builders.init.addBlock(handlerFunction);
		                }
		                const opts = ['passive', 'once', 'capture'].filter(mod => handler.modifiers.has(mod));
		                if (opts.length) {
		                    const optString = (opts.length === 1 && opts[0] === 'capture')
		                        ? 'true'
		                        : `{ ${opts.map(opt => `${opt}: true`).join(', ')} }`;
		                    block.builders.hydrate.addLine(`@addListener(${this.var}, "${handler.name}", ${handlerName}, ${optString});`);
		                    block.builders.destroy.addLine(`@removeListener(${this.var}, "${handler.name}", ${handlerName}, ${optString});`);
		                }
		                else {
		                    block.builders.hydrate.addLine(`@addListener(${this.var}, "${handler.name}", ${handlerName});`);
		                    block.builders.destroy.addLine(`@removeListener(${this.var}, "${handler.name}", ${handlerName});`);
		                }
		            }
		        });
		    }
		    addRef(block) {
		        const ref = `#component.refs.${this.node.ref.name}`;
		        block.builders.mount.addLine(`${ref} = ${this.var};`);
		        block.builders.destroy.addLine(`if (${ref} === ${this.var}) ${ref} = null;`);
		    }
		    addTransitions(block) {
		        const { intro, outro } = this.node;
		        if (!intro && !outro)
		            return;
		        if (intro === outro) {
		            const name = block.getUniqueName(`${this.var}_transition`);
		            const snippet = intro.expression
		                ? intro.expression.snippet
		                : '{}';
		            block.addVariable(name);
		            const fn = `%transitions-${intro.name}`;
		            block.builders.intro.addConditional(`#component.root._intro`, deindent `
				if (${name}) ${name}.invalidate();

				#component.root._aftercreate.push(() => {
					if (!${name}) ${name} = @wrapTransition(#component, ${this.var}, ${fn}, ${snippet}, true);
					${name}.run(1);
				});
			`);
		            block.builders.outro.addBlock(deindent `
				if (!${name}) ${name} = @wrapTransition(#component, ${this.var}, ${fn}, ${snippet}, false);
				${name}.run(0, () => {
					#outrocallback();
					${name} = null;
				});
			`);
		            block.builders.destroy.addConditional('detach', `if (${name}) ${name}.abort();`);
		        }
		        else {
		            const introName = intro && block.getUniqueName(`${this.var}_intro`);
		            const outroName = outro && block.getUniqueName(`${this.var}_outro`);
		            if (intro) {
		                block.addVariable(introName);
		                const snippet = intro.expression
		                    ? intro.expression.snippet
		                    : '{}';
		                const fn = `%transitions-${intro.name}`; // TODO add built-in transitions?
		                if (outro) {
		                    block.builders.intro.addBlock(deindent `
						if (${introName}) ${introName}.abort(1);
						if (${outroName}) ${outroName}.abort(1);
					`);
		                }
		                block.builders.intro.addConditional(`#component.root._intro`, deindent `
					#component.root._aftercreate.push(() => {
						${introName} = @wrapTransition(#component, ${this.var}, ${fn}, ${snippet}, true);
						${introName}.run(1);
					});
				`);
		            }
		            if (outro) {
		                block.addVariable(outroName);
		                const snippet = outro.expression
		                    ? outro.expression.snippet
		                    : '{}';
		                const fn = `%transitions-${outro.name}`;
		                block.builders.intro.addBlock(deindent `
					if (${outroName}) ${outroName}.abort(1);
				`);
		                // TODO hide elements that have outro'd (unless they belong to a still-outroing
		                // group) prior to their removal from the DOM
		                block.builders.outro.addBlock(deindent `
					${outroName} = @wrapTransition(#component, ${this.var}, ${fn}, ${snippet}, false);
					${outroName}.run(0, #outrocallback);
				`);
		                block.builders.destroy.addConditional('detach', `if (${outroName}) ${outroName}.abort();`);
		            }
		        }
		    }
		    addAnimation(block) {
		        if (!this.node.animation)
		            return;
		        const rect = block.getUniqueName('rect');
		        const animation = block.getUniqueName('animation');
		        block.addVariable(rect);
		        block.addVariable(animation);
		        block.builders.measure.addBlock(deindent `
			${rect} = ${this.var}.getBoundingClientRect();
		`);
		        block.builders.fix.addBlock(deindent `
			@fixPosition(${this.var});
			if (${animation}) ${animation}.stop();
		`);
		        const params = this.node.animation.expression ? this.node.animation.expression.snippet : '{}';
		        block.builders.animate.addBlock(deindent `
			if (${animation}) ${animation}.stop();
			${animation} = @wrapAnimation(${this.var}, ${rect}, %animations-${this.node.animation.name}, ${params});
		`);
		    }
		    addActions(block) {
		        this.node.actions.forEach(action => {
		            const { expression } = action;
		            let snippet, dependencies;
		            if (expression) {
		                snippet = expression.snippet;
		                dependencies = expression.dependencies;
		            }
		            const name = block.getUniqueName(`${action.name.replace(/[^a-zA-Z0-9_$]/g, '_')}_action`);
		            block.addVariable(name);
		            const fn = `%actions-${action.name}`;
		            block.builders.mount.addLine(`${name} = ${fn}.call(#component, ${this.var}${snippet ? `, ${snippet}` : ''}) || {};`);
		            if (dependencies && dependencies.size > 0) {
		                let conditional = `typeof ${name}.update === 'function' && `;
		                const deps = [...dependencies].map(dependency => `changed.${dependency}`).join(' || ');
		                conditional += dependencies.size > 1 ? `(${deps})` : deps;
		                block.builders.update.addConditional(conditional, `${name}.update.call(#component, ${snippet});`);
		            }
		            block.builders.destroy.addLine(`if (${name} && typeof ${name}.destroy === 'function') ${name}.destroy.call(#component);`);
		        });
		    }
		    addClasses(block) {
		        this.node.classes.forEach(classDir => {
		            const { expression, name } = classDir;
		            let snippet, dependencies;
		            if (expression) {
		                snippet = expression.snippet;
		                dependencies = expression.dependencies;
		            }
		            else {
		                snippet = `ctx${quotePropIfNecessary(name)}`;
		                dependencies = new Set([name]);
		            }
		            const updater = `@toggleClass(${this.var}, "${name}", ${snippet});`;
		            block.builders.hydrate.addLine(updater);
		            if ((dependencies && dependencies.size > 0) || this.classDependencies.length) {
		                const allDeps = this.classDependencies.concat(...dependencies);
		                const deps = allDeps.map(dependency => `changed${quotePropIfNecessary(dependency)}`).join(' || ');
		                const condition = allDeps.length > 1 ? `(${deps})` : deps;
		                block.builders.update.addConditional(condition, updater);
		            }
		        });
		    }
		    getStaticAttributeValue(name) {
		        const attribute = this.node.attributes.find((attr) => attr.type === 'Attribute' && attr.name.toLowerCase() === name);
		        if (!attribute)
		            return null;
		        if (attribute.isTrue)
		            return true;
		        if (attribute.chunks.length === 0)
		            return '';
		        if (attribute.chunks.length === 1 && attribute.chunks[0].type === 'Text') {
		            return attribute.chunks[0].data;
		        }
		        return null;
		    }
		    isMediaNode() {
		        return this.node.name === 'audio' || this.node.name === 'video';
		    }
		    remount(name) {
		        const slot = this.attributes.find(attribute => attribute.name === 'slot');
		        if (slot) {
		            const prop = quotePropIfNecessary(slot.chunks[0].data);
		            return `@append(${name}._slotted${prop}, ${this.var});`;
		        }
		        return `@append(${name}._slotted.default, ${this.var});`;
		    }
		    addCssClass(className = this.component.stylesheet.id) {
		        const classAttribute = this.attributes.find(a => a.name === 'class');
		        if (classAttribute && !classAttribute.isTrue) {
		            if (classAttribute.chunks.length === 1 && classAttribute.chunks[0].type === 'Text') {
		                classAttribute.chunks[0].data += ` ${className}`;
		            }
		            else {
		                classAttribute.chunks.push(new Text(this.component, this, this.scope, {
		                    type: 'Text',
		                    data: ` ${className}`
		                }));
		            }
		        }
		        else {
		            this.attributes.push(new Attribute(this.component, this, this.scope, {
		                type: 'Attribute',
		                name: 'class',
		                value: [{ type: 'Text', data: className }]
		            }));
		        }
		    }
		}

		class HeadWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.canUseInnerHTML = false;
		        this.fragment = new FragmentWrapper(renderer, block, node.children, this, stripWhitespace, nextSibling);
		    }
		    render(block, parentNode, parentNodes) {
		        this.fragment.render(block, 'document.head', null);
		    }
		}

		function isElseIf(node) {
		    return (node && node.children.length === 1 && node.children[0].type === 'IfBlock');
		}
		class IfBlockBranch extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = null;
		        this.condition = node.expression && node.expression.snippet;
		        this.block = block.child({
		            comment: createDebuggingComment(node, parent.renderer.component),
		            name: parent.renderer.component.getUniqueName(node.expression ? `create_if_block` : `create_else_block`)
		        });
		        this.fragment = new FragmentWrapper(renderer, this.block, node.children, parent, stripWhitespace, nextSibling);
		        this.isDynamic = this.block.dependencies.size > 0;
		    }
		}
		class IfBlockWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = 'if_block';
		        const { component } = renderer;
		        this.cannotUseInnerHTML();
		        this.branches = [];
		        const blocks = [];
		        let isDynamic = false;
		        let hasIntros = false;
		        let hasOutros = false;
		        const createBranches = (node) => {
		            const branch = new IfBlockBranch(renderer, block, this, node, stripWhitespace, nextSibling);
		            this.branches.push(branch);
		            blocks.push(branch.block);
		            block.addDependencies(node.expression.dependencies);
		            if (branch.block.dependencies.size > 0) {
		                isDynamic = true;
		                block.addDependencies(branch.block.dependencies);
		            }
		            if (branch.block.hasIntros)
		                hasIntros = true;
		            if (branch.block.hasOutros)
		                hasOutros = true;
		            if (isElseIf(node.else)) {
		                createBranches(node.else.children[0]);
		            }
		            else if (node.else) {
		                const branch = new IfBlockBranch(renderer, block, this, node.else, stripWhitespace, nextSibling);
		                this.branches.push(branch);
		                blocks.push(branch.block);
		                if (branch.block.dependencies.size > 0) {
		                    isDynamic = true;
		                    block.addDependencies(branch.block.dependencies);
		                }
		                if (branch.block.hasIntros)
		                    hasIntros = true;
		                if (branch.block.hasOutros)
		                    hasOutros = true;
		            }
		        };
		        createBranches(this.node);
		        if (component.options.nestedTransitions) {
		            if (hasIntros)
		                block.addIntro();
		            if (hasOutros)
		                block.addOutro();
		        }
		        blocks.forEach(block => {
		            block.hasUpdateMethod = isDynamic;
		            block.hasIntroMethod = hasIntros;
		            block.hasOutroMethod = hasOutros;
		        });
		        renderer.blocks.push(...blocks);
		    }
		    render(block, parentNode, parentNodes) {
		        const name = this.var;
		        const needsAnchor = this.next ? !this.next.isDomNode() : !parentNode || !this.parent.isDomNode();
		        const anchor = needsAnchor
		            ? block.getUniqueName(`${name}_anchor`)
		            : (this.next && this.next.var) || 'null';
		        const hasElse = !(this.branches[this.branches.length - 1].condition);
		        const if_name = hasElse ? '' : `if (${name}) `;
		        const dynamic = this.branches[0].block.hasUpdateMethod; // can use [0] as proxy for all, since they necessarily have the same value
		        const hasOutros = this.branches[0].block.hasOutroMethod;
		        const vars = { name, anchor, if_name, hasElse };
		        if (this.node.else) {
		            if (hasOutros) {
		                this.renderCompoundWithOutros(block, parentNode, parentNodes, dynamic, vars);
		                if (this.renderer.options.nestedTransitions) {
		                    block.builders.outro.addBlock(deindent `
						if (${name}) ${name}.o(#outrocallback);
						else #outrocallback();
					`);
		                }
		            }
		            else {
		                this.renderCompound(block, parentNode, parentNodes, dynamic, vars);
		            }
		        }
		        else {
		            this.renderSimple(block, parentNode, parentNodes, dynamic, vars);
		            if (hasOutros && this.renderer.options.nestedTransitions) {
		                block.builders.outro.addBlock(deindent `
					if (${name}) ${name}.o(#outrocallback);
					else #outrocallback();
				`);
		            }
		        }
		        block.builders.create.addLine(`${if_name}${name}.c();`);
		        if (parentNodes) {
		            block.builders.claim.addLine(`${if_name}${name}.l(${parentNodes});`);
		        }
		        if (needsAnchor) {
		            block.addElement(anchor, `@createComment()`, parentNodes && `@createComment()`, parentNode);
		        }
		        this.branches.forEach(branch => {
		            branch.fragment.render(branch.block, null, 'nodes');
		        });
		    }
		    renderCompound(block, parentNode, parentNodes, dynamic, { name, anchor, hasElse, if_name }) {
		        const select_block_type = this.renderer.component.getUniqueName(`select_block_type`);
		        const current_block_type = block.getUniqueName(`current_block_type`);
		        const current_block_type_and = hasElse ? '' : `${current_block_type} && `;
		        block.builders.init.addBlock(deindent `
			function ${select_block_type}(ctx) {
				${this.branches
            .map(({ condition, block }) => `${condition ? `if (${condition}) ` : ''}return ${block.name};`)
            .join('\n')}
			}
		`);
		        block.builders.init.addBlock(deindent `
			var ${current_block_type} = ${select_block_type}(ctx);
			var ${name} = ${current_block_type_and}${current_block_type}(#component, ctx);
		`);
		        const mountOrIntro = this.branches[0].block.hasIntroMethod ? 'i' : 'm';
		        const initialMountNode = parentNode || '#target';
		        const anchorNode = parentNode ? 'null' : 'anchor';
		        block.builders.mount.addLine(`${if_name}${name}.${mountOrIntro}(${initialMountNode}, ${anchorNode});`);
		        const updateMountNode = this.getUpdateMountNode(anchor);
		        const changeBlock = deindent `
			${if_name}${name}.d(1);
			${name} = ${current_block_type_and}${current_block_type}(#component, ctx);
			${if_name}${name}.c();
			${if_name}${name}.${mountOrIntro}(${updateMountNode}, ${anchor});
		`;
		        if (dynamic) {
		            block.builders.update.addBlock(deindent `
				if (${current_block_type} === (${current_block_type} = ${select_block_type}(ctx)) && ${name}) {
					${name}.p(changed, ctx);
				} else {
					${changeBlock}
				}
			`);
		        }
		        else {
		            block.builders.update.addBlock(deindent `
				if (${current_block_type} !== (${current_block_type} = ${select_block_type}(ctx))) {
					${changeBlock}
				}
			`);
		        }
		        block.builders.destroy.addLine(`${if_name}${name}.d(${parentNode ? '' : 'detach'});`);
		    }
		    // if any of the siblings have outros, we need to keep references to the blocks
		    // (TODO does this only apply to bidi transitions?)
		    renderCompoundWithOutros(block, parentNode, parentNodes, dynamic, { name, anchor, hasElse }) {
		        const select_block_type = this.renderer.component.getUniqueName(`select_block_type`);
		        const current_block_type_index = block.getUniqueName(`current_block_type_index`);
		        const previous_block_index = block.getUniqueName(`previous_block_index`);
		        const if_block_creators = block.getUniqueName(`if_block_creators`);
		        const if_blocks = block.getUniqueName(`if_blocks`);
		        const if_current_block_type_index = hasElse
		            ? ''
		            : `if (~${current_block_type_index}) `;
		        block.addVariable(current_block_type_index);
		        block.addVariable(name);
		        block.builders.init.addBlock(deindent `
			var ${if_block_creators} = [
				${this.branches.map(branch => branch.block.name).join(',\n')}
			];

			var ${if_blocks} = [];

			function ${select_block_type}(ctx) {
				${this.branches
            .map(({ condition }, i) => `${condition ? `if (${condition}) ` : ''}return ${i};`)
            .join('\n')}
				${!hasElse && `return -1;`}
			}
		`);
		        if (hasElse) {
		            block.builders.init.addBlock(deindent `
				${current_block_type_index} = ${select_block_type}(ctx);
				${name} = ${if_blocks}[${current_block_type_index}] = ${if_block_creators}[${current_block_type_index}](#component, ctx);
			`);
		        }
		        else {
		            block.builders.init.addBlock(deindent `
				if (~(${current_block_type_index} = ${select_block_type}(ctx))) {
					${name} = ${if_blocks}[${current_block_type_index}] = ${if_block_creators}[${current_block_type_index}](#component, ctx);
				}
			`);
		        }
		        const mountOrIntro = this.branches[0].block.hasIntroMethod ? 'i' : 'm';
		        const initialMountNode = parentNode || '#target';
		        const anchorNode = parentNode ? 'null' : 'anchor';
		        block.builders.mount.addLine(`${if_current_block_type_index}${if_blocks}[${current_block_type_index}].${mountOrIntro}(${initialMountNode}, ${anchorNode});`);
		        const updateMountNode = this.getUpdateMountNode(anchor);
		        const destroyOldBlock = deindent `
			@groupOutros();
			${name}.o(function() {
				${if_blocks}[${previous_block_index}].d(1);
				${if_blocks}[${previous_block_index}] = null;
			});
		`;
		        const createNewBlock = deindent `
			${name} = ${if_blocks}[${current_block_type_index}];
			if (!${name}) {
				${name} = ${if_blocks}[${current_block_type_index}] = ${if_block_creators}[${current_block_type_index}](#component, ctx);
				${name}.c();
			}
			${name}.${mountOrIntro}(${updateMountNode}, ${anchor});
		`;
		        const changeBlock = hasElse
		            ? deindent `
				${destroyOldBlock}

				${createNewBlock}
			`
		            : deindent `
				if (${name}) {
					${destroyOldBlock}
				}

				if (~${current_block_type_index}) {
					${createNewBlock}
				} else {
					${name} = null;
				}
			`;
		        if (dynamic) {
		            block.builders.update.addBlock(deindent `
				var ${previous_block_index} = ${current_block_type_index};
				${current_block_type_index} = ${select_block_type}(ctx);
				if (${current_block_type_index} === ${previous_block_index}) {
					${if_current_block_type_index}${if_blocks}[${current_block_type_index}].p(changed, ctx);
				} else {
					${changeBlock}
				}
			`);
		        }
		        else {
		            block.builders.update.addBlock(deindent `
				var ${previous_block_index} = ${current_block_type_index};
				${current_block_type_index} = ${select_block_type}(ctx);
				if (${current_block_type_index} !== ${previous_block_index}) {
					${changeBlock}
				}
			`);
		        }
		        block.builders.destroy.addLine(deindent `
			${if_current_block_type_index}${if_blocks}[${current_block_type_index}].d(${parentNode ? '' : 'detach'});
		`);
		    }
		    renderSimple(block, parentNode, parentNodes, dynamic, { name, anchor, if_name }) {
		        const branch = this.branches[0];
		        block.builders.init.addBlock(deindent `
			var ${name} = (${branch.condition}) && ${branch.block.name}(#component, ctx);
		`);
		        const mountOrIntro = branch.block.hasIntroMethod ? 'i' : 'm';
		        const initialMountNode = parentNode || '#target';
		        const anchorNode = parentNode ? 'null' : 'anchor';
		        block.builders.mount.addLine(`if (${name}) ${name}.${mountOrIntro}(${initialMountNode}, ${anchorNode});`);
		        const updateMountNode = this.getUpdateMountNode(anchor);
		        const enter = dynamic
		            ? (branch.block.hasIntroMethod || branch.block.hasOutroMethod)
		                ? deindent `
					if (${name}) {
						${name}.p(changed, ctx);
					} else {
						${name} = ${branch.block.name}(#component, ctx);
						if (${name}) ${name}.c();
					}

					${name}.i(${updateMountNode}, ${anchor});
				`
		                : deindent `
					if (${name}) {
						${name}.p(changed, ctx);
					} else {
						${name} = ${branch.block.name}(#component, ctx);
						${name}.c();
						${name}.m(${updateMountNode}, ${anchor});
					}
				`
		            : (branch.block.hasIntroMethod || branch.block.hasOutroMethod)
		                ? deindent `
					if (!${name}) {
						${name} = ${branch.block.name}(#component, ctx);
						${name}.c();
					}
					${name}.i(${updateMountNode}, ${anchor});
				`
		                : deindent `
					if (!${name}) {
						${name} = ${branch.block.name}(#component, ctx);
						${name}.c();
						${name}.m(${updateMountNode}, ${anchor});
					}
				`;
		        // no `p()` here — we don't want to update outroing nodes,
		        // as that will typically result in glitching
		        const exit = branch.block.hasOutroMethod
		            ? deindent `
				@groupOutros();
				${name}.o(function() {
					${name}.d(1);
					${name} = null;
				});
			`
		            : deindent `
				${name}.d(1);
				${name} = null;
			`;
		        block.builders.update.addBlock(deindent `
			if (${branch.condition}) {
				${enter}
			} else if (${name}) {
				${exit}
			}
		`);
		        block.builders.destroy.addLine(`${if_name}${name}.d(${parentNode ? '' : 'detach'});`);
		    }
		}

		function stringifyProps(props) {
		    if (!props.length)
		        return '{}';
		    const joined = props.join(', ');
		    if (joined.length > 40) {
		        // make larger data objects readable
		        return `{\n\t${props.join(',\n\t')}\n}`;
		    }
		    return `{ ${joined} }`;
		}

		class InlineComponentWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.cannotUseInnerHTML();
		        if (this.node.expression) {
		            block.addDependencies(this.node.expression.dependencies);
		        }
		        this.node.attributes.forEach(attr => {
		            block.addDependencies(attr.dependencies);
		        });
		        this.node.bindings.forEach(binding => {
		            if (binding.isContextual) {
		                // we need to ensure that the each block creates a context including
		                // the list and the index, if they're not otherwise referenced
		                const { name } = getObject(binding.value.node);
		                const eachBlock = block.contextOwners.get(name);
		                eachBlock.hasBinding = true;
		            }
		            block.addDependencies(binding.value.dependencies);
		        });
		        this.node.handlers.forEach(handler => {
		            block.addDependencies(handler.dependencies);
		        });
		        this.var = (this.node.name === 'svelte:self' ? renderer.component.name :
		            this.node.name === 'svelte:component' ? 'switch_instance' :
		                this.node.name).toLowerCase();
		        if (this.node.children.length) {
		            this._slots = new Set(['default']);
		            this.fragment = new FragmentWrapper(renderer, block, node.children, this, stripWhitespace, nextSibling);
		        }
		        if (renderer.component.options.nestedTransitions) {
		            block.addOutro();
		        }
		    }
		    render(block, parentNode, parentNodes) {
		        const { renderer } = this;
		        const { component } = renderer;
		        const name = this.var;
		        const componentInitProperties = [
		            `root: #component.root`,
		            `store: #component.store`
		        ];
		        if (this.fragment) {
		            const slots = Array.from(this._slots).map(name => `${quoteNameIfNecessary(name)}: @createFragment()`);
		            componentInitProperties.push(`slots: { ${slots.join(', ')} }`);
		            this.fragment.nodes.forEach((child) => {
		                child.render(block, `${this.var}._slotted.default`, 'nodes');
		            });
		        }
		        const statements = [];
		        const name_initial_data = block.getUniqueName(`${name}_initial_data`);
		        const name_changes = block.getUniqueName(`${name}_changes`);
		        let name_updating;
		        let beforecreate = null;
		        const updates = [];
		        const usesSpread = !!this.node.attributes.find(a => a.isSpread);
		        const attributeObject = usesSpread
		            ? '{}'
		            : stringifyProps(this.node.attributes.map(attr => `${quoteNameIfNecessary(attr.name)}: ${attr.getValue()}`));
		        if (this.node.attributes.length || this.node.bindings.length) {
		            componentInitProperties.push(`data: ${name_initial_data}`);
		        }
		        if (!usesSpread && (this.node.attributes.filter(a => a.isDynamic).length || this.node.bindings.length)) {
		            updates.push(`var ${name_changes} = {};`);
		        }
		        if (this.node.attributes.length) {
		            if (usesSpread) {
		                const levels = block.getUniqueName(`${this.var}_spread_levels`);
		                const initialProps = [];
		                const changes = [];
		                const allDependencies = new Set();
		                this.node.attributes.forEach(attr => {
		                    addToSet(allDependencies, attr.dependencies);
		                });
		                this.node.attributes.forEach(attr => {
		                    const { name, dependencies } = attr;
		                    const condition = dependencies.size > 0 && (dependencies.size !== allDependencies.size)
		                        ? `(${[...dependencies].map(d => `changed.${d}`).join(' || ')})`
		                        : null;
		                    if (attr.isSpread) {
		                        const value = attr.expression.snippet;
		                        initialProps.push(value);
		                        changes.push(condition ? `${condition} && ${value}` : value);
		                    }
		                    else {
		                        const obj = `{ ${quoteNameIfNecessary(name)}: ${attr.getValue()} }`;
		                        initialProps.push(obj);
		                        changes.push(condition ? `${condition} && ${obj}` : obj);
		                    }
		                });
		                block.builders.init.addBlock(deindent `
					var ${levels} = [
						${initialProps.join(',\n')}
					];
				`);
		                statements.push(deindent `
					for (var #i = 0; #i < ${levels}.length; #i += 1) {
						${name_initial_data} = @assign(${name_initial_data}, ${levels}[#i]);
					}
				`);
		                const conditions = [...allDependencies].map(dep => `changed.${dep}`).join(' || ');
		                updates.push(deindent `
					var ${name_changes} = ${allDependencies.size === 1 ? `${conditions}` : `(${conditions})`} ? @getSpreadUpdate(${levels}, [
						${changes.join(',\n')}
					]) : {};
				`);
		            }
		            else {
		                this.node.attributes
		                    .filter((attribute) => attribute.isDynamic)
		                    .forEach((attribute) => {
		                    if (attribute.dependencies.size > 0) {
		                        updates.push(deindent `
								if (${[...attribute.dependencies]
                            .map(dependency => `changed.${dependency}`)
                            .join(' || ')}) ${name_changes}${quotePropIfNecessary(attribute.name)} = ${attribute.getValue()};
							`);
		                    }
		                });
		            }
		        }
		        if (this.node.bindings.length) {
		            renderer.hasComplexBindings = true;
		            name_updating = block.alias(`${name}_updating`);
		            block.addVariable(name_updating, '{}');
		            let hasLocalBindings = false;
		            let hasStoreBindings = false;
		            const builder = new CodeBuilder();
		            this.node.bindings.forEach((binding) => {
		                let { name: key } = getObject(binding.value.node);
		                let setFromChild;
		                if (binding.isContextual) {
		                    const computed = isComputed(binding.value.node);
		                    const tail = binding.value.node.type === 'MemberExpression' ? getTailSnippet(binding.value.node) : '';
		                    const head = block.bindings.get(key);
		                    const lhs = binding.value.node.type === 'MemberExpression'
		                        ? binding.value.snippet
		                        : `${head()}${tail} = childState${quotePropIfNecessary(binding.name)}`;
		                    setFromChild = deindent `
						${lhs} = childState${quotePropIfNecessary(binding.name)};

						${[...binding.value.dependencies]
                        .map((name) => {
                        const isStoreProp = name[0] === '$';
                        const prop = isStoreProp ? name.slice(1) : name;
                        const newState = isStoreProp ? 'newStoreState' : 'newState';
                        if (isStoreProp)
                            hasStoreBindings = true;
                        else
                            hasLocalBindings = true;
                        return `${newState}${quotePropIfNecessary(prop)} = ctx${quotePropIfNecessary(name)};`;
                    })}
					`;
		                }
		                else {
		                    const isStoreProp = key[0] === '$';
		                    const prop = isStoreProp ? key.slice(1) : key;
		                    const newState = isStoreProp ? 'newStoreState' : 'newState';
		                    if (isStoreProp)
		                        hasStoreBindings = true;
		                    else
		                        hasLocalBindings = true;
		                    if (binding.value.node.type === 'MemberExpression') {
		                        setFromChild = deindent `
							${binding.value.snippet} = childState${quotePropIfNecessary(binding.name)};
							${newState}${quotePropIfNecessary(prop)} = ctx${quotePropIfNecessary(key)};
						`;
		                    }
		                    else {
		                        setFromChild = `${newState}${quotePropIfNecessary(prop)} = childState${quotePropIfNecessary(binding.name)};`;
		                    }
		                }
		                statements.push(deindent `
					if (${binding.value.snippet} !== void 0) {
						${name_initial_data}${quotePropIfNecessary(binding.name)} = ${binding.value.snippet};
						${name_updating}${quotePropIfNecessary(binding.name)} = true;
					}`);
		                builder.addConditional(`!${name_updating}${quotePropIfNecessary(binding.name)} && changed${quotePropIfNecessary(binding.name)}`, setFromChild);
		                updates.push(deindent `
					if (!${name_updating}${quotePropIfNecessary(binding.name)} && ${[...binding.value.dependencies].map((dependency) => `changed.${dependency}`).join(' || ')}) {
						${name_changes}${quotePropIfNecessary(binding.name)} = ${binding.value.snippet};
						${name_updating}${quotePropIfNecessary(binding.name)} = ${binding.value.snippet} !== void 0;
					}
				`);
		            });
		            block.maintainContext = true; // TODO put this somewhere more logical
		            const initialisers = [
		                hasLocalBindings && 'newState = {}',
		                hasStoreBindings && 'newStoreState = {}',
		            ].filter(Boolean).join(', ');
		            // TODO use component.on('state', ...) instead of _bind
		            componentInitProperties.push(deindent `
				_bind(changed, childState) {
					var ${initialisers};
					${builder}
					${hasStoreBindings && `#component.store.set(newStoreState);`}
					${hasLocalBindings && `#component._set(newState);`}
					${name_updating} = {};
				}
			`);
		            beforecreate = deindent `
				#component.root._beforecreate.push(() => {
					${name}._bind({ ${this.node.bindings.map(b => `${quoteNameIfNecessary(b.name)}: 1`).join(', ')} }, ${name}.get());
				});
			`;
		        }
		        this.node.handlers.forEach(handler => {
		            handler.var = block.getUniqueName(`${this.var}_${handler.name}`); // TODO this is hacky
		            handler.render(component, block, this.var, false); // TODO hoist when possible
		            if (handler.usesContext)
		                block.maintainContext = true; // TODO is there a better place to put this?
		        });
		        if (this.node.name === 'svelte:component') {
		            const switch_value = block.getUniqueName('switch_value');
		            const switch_props = block.getUniqueName('switch_props');
		            const { snippet } = this.node.expression;
		            block.builders.init.addBlock(deindent `
				var ${switch_value} = ${snippet};

				function ${switch_props}(ctx) {
					${(this.node.attributes.length || this.node.bindings.length) && deindent `
					var ${name_initial_data} = ${attributeObject};`}
					${statements}
					return {
						${componentInitProperties.join(',\n')}
					};
				}

				if (${switch_value}) {
					var ${name} = new ${switch_value}(${switch_props}(ctx));

					${beforecreate}
				}

				${this.node.handlers.map(handler => deindent `
					function ${handler.var}(event) {
						${handler.snippet || `#component.fire("${handler.name}", event);`}
					}

					if (${name}) ${name}.on("${handler.name}", ${handler.var});
				`)}
			`);
		            block.builders.create.addLine(`if (${name}) ${name}._fragment.c();`);
		            if (parentNodes) {
		                block.builders.claim.addLine(`if (${name}) ${name}._fragment.l(${parentNodes});`);
		            }
		            block.builders.mount.addBlock(deindent `
				if (${name}) {
					${name}._mount(${parentNode || '#target'}, ${parentNode ? 'null' : 'anchor'});
					${this.node.ref && `#component.refs.${this.node.ref.name} = ${name};`}
				}
			`);
		            const anchor = this.getOrCreateAnchor(block, parentNode, parentNodes);
		            const updateMountNode = this.getUpdateMountNode(anchor);
		            if (updates.length) {
		                block.builders.update.addBlock(deindent `
					${updates}
				`);
		            }
		            block.builders.update.addBlock(deindent `
				if (${switch_value} !== (${switch_value} = ${snippet})) {
					if (${name}) {
						${component.options.nestedTransitions
                ? deindent `
						@groupOutros();
						const old_component = ${name};
						old_component._fragment.o(() => {
							old_component.destroy();
						});`
                : `${name}.destroy();`}
					}

					if (${switch_value}) {
						${name} = new ${switch_value}(${switch_props}(ctx));

						${this.node.bindings.length > 0 && deindent `
						#component.root._beforecreate.push(() => {
							const changed = {};
							${this.node.bindings.map(binding => deindent `
							if (${binding.value.snippet} === void 0) changed.${binding.name} = 1;`)}
							${name}._bind(changed, ${name}.get());
						});`}
						${name}._fragment.c();

						${this.fragment && this.fragment.nodes.map(child => child.remount(name))}
						${name}._mount(${updateMountNode}, ${anchor});

						${this.node.handlers.map(handler => deindent `
							${name}.on("${handler.name}", ${handler.var});
						`)}

						${this.node.ref && `#component.refs.${this.node.ref.name} = ${name};`}
					} else {
						${name} = null;
						${this.node.ref && deindent `
						if (#component.refs.${this.node.ref.name} === ${name}) {
							#component.refs.${this.node.ref.name} = null;
						}`}
					}
				}
			`);
		            if (updates.length) {
		                block.builders.update.addBlock(deindent `
					else if (${switch_value}) {
						${name}._set(${name_changes});
						${this.node.bindings.length && `${name_updating} = {};`}
					}
				`);
		            }
		            block.builders.destroy.addLine(`if (${name}) ${name}.destroy(${parentNode ? '' : 'detach'});`);
		        }
		        else {
		            const expression = this.node.name === 'svelte:self'
		                ? component.name
		                : `%components-${this.node.name}`;
		            block.builders.init.addBlock(deindent `
				${(this.node.attributes.length || this.node.bindings.length) && deindent `
				var ${name_initial_data} = ${attributeObject};`}
				${statements}
				var ${name} = new ${expression}({
					${componentInitProperties.join(',\n')}
				});

				${beforecreate}

				${this.node.handlers.map(handler => deindent `
					${name}.on("${handler.name}", function(event) {
						${handler.snippet || `#component.fire("${handler.name}", event);`}
					});
				`)}

				${this.node.ref && `#component.refs.${this.node.ref.name} = ${name};`}
			`);
		            block.builders.create.addLine(`${name}._fragment.c();`);
		            if (parentNodes) {
		                block.builders.claim.addLine(`${name}._fragment.l(${parentNodes});`);
		            }
		            block.builders.mount.addLine(`${name}._mount(${parentNode || '#target'}, ${parentNode ? 'null' : 'anchor'});`);
		            if (updates.length) {
		                block.builders.update.addBlock(deindent `
					${updates}
					${name}._set(${name_changes});
					${this.node.bindings.length && `${name_updating} = {};`}
				`);
		            }
		            block.builders.destroy.addLine(deindent `
				${name}.destroy(${parentNode ? '' : 'detach'});
				${this.node.ref && `if (#component.refs.${this.node.ref.name} === ${name}) #component.refs.${this.node.ref.name} = null;`}
			`);
		        }
		        if (component.options.nestedTransitions) {
		            block.builders.outro.addLine(`if (${name}) ${name}._fragment.o(#outrocallback);`);
		        }
		    }
		    remount(name) {
		        return `${this.var}._mount(${name}._slotted.default, null);`;
		    }
		}
		function isComputed(node) {
		    while (node.type === 'MemberExpression') {
		        if (node.computed)
		            return true;
		        node = node.object;
		    }
		    return false;
		}

		class Tag extends Wrapper {
		    constructor(renderer, block, parent, node) {
		        super(renderer, block, parent, node);
		        this.cannotUseInnerHTML();
		        block.addDependencies(node.expression.dependencies);
		    }
		    render(block, parentNode, parentNodes) {
		        const { init } = this.renameThisMethod(block, value => `@setData(${this.var}, ${value});`);
		        block.addElement(this.var, `@createText(${init})`, parentNodes && `@claimText(${parentNodes}, ${init})`, parentNode);
		    }
		    renameThisMethod(block, update) {
		        const { snippet, dependencies } = this.node.expression;
		        const value = this.node.shouldCache && block.getUniqueName(`${this.var}_value`);
		        const content = this.node.shouldCache ? value : snippet;
		        if (this.node.shouldCache)
		            block.addVariable(value, snippet);
		        if (dependencies.size) {
		            const changedCheck = ((block.hasOutros ? `!#current || ` : '') +
		                [...dependencies].map((dependency) => `changed.${dependency}`).join(' || '));
		            const updateCachedValue = `${value} !== (${value} = ${snippet})`;
		            const condition = this.node.shouldCache ?
		                (dependencies.size ? `(${changedCheck}) && ${updateCachedValue}` : updateCachedValue) :
		                changedCheck;
		            block.builders.update.addConditional(condition, update(content));
		        }
		        return { init: content };
		    }
		    remount(name) {
		        return `@append(${name}._slotted.default, ${this.var});`;
		    }
		}

		class MustacheTagWrapper extends Tag {
		    constructor(renderer, block, parent, node) {
		        super(renderer, block, parent, node);
		        this.var = 'text';
		        this.cannotUseInnerHTML();
		    }
		    render(block, parentNode, parentNodes) {
		        const { init } = this.renameThisMethod(block, value => `@setData(${this.var}, ${value});`);
		        block.addElement(this.var, `@createText(${init})`, parentNodes && `@claimText(${parentNodes}, ${init})`, parentNode);
		    }
		}

		class RawMustacheTagWrapper extends Tag {
		    constructor(renderer, block, parent, node) {
		        super(renderer, block, parent, node);
		        this.var = 'raw';
		        this.cannotUseInnerHTML();
		    }
		    render(block, parentNode, parentNodes) {
		        const name = this.var;
		        // TODO use isDomNode instead of type === 'Element'?
		        const needsAnchorBefore = this.prev ? this.prev.node.type !== 'Element' : !parentNode;
		        const needsAnchorAfter = this.next ? this.next.node.type !== 'Element' : !parentNode;
		        const anchorBefore = needsAnchorBefore
		            ? block.getUniqueName(`${name}_before`)
		            : (this.prev && this.prev.var) || 'null';
		        const anchorAfter = needsAnchorAfter
		            ? block.getUniqueName(`${name}_after`)
		            : (this.next && this.next.var) || 'null';
		        let detach;
		        let insert;
		        let useInnerHTML = false;
		        if (anchorBefore === 'null' && anchorAfter === 'null') {
		            useInnerHTML = true;
		            detach = `${parentNode}.innerHTML = '';`;
		            insert = content => `${parentNode}.innerHTML = ${content};`;
		        }
		        else if (anchorBefore === 'null') {
		            detach = `@detachBefore(${anchorAfter});`;
		            insert = content => `${anchorAfter}.insertAdjacentHTML("beforebegin", ${content});`;
		        }
		        else if (anchorAfter === 'null') {
		            detach = `@detachAfter(${anchorBefore});`;
		            insert = content => `${anchorBefore}.insertAdjacentHTML("afterend", ${content});`;
		        }
		        else {
		            detach = `@detachBetween(${anchorBefore}, ${anchorAfter});`;
		            insert = content => `${anchorBefore}.insertAdjacentHTML("afterend", ${content});`;
		        }
		        const { init } = this.renameThisMethod(block, content => deindent `
				${!useInnerHTML && detach}
				${insert(content)}
			`);
		        // we would have used comments here, but the `insertAdjacentHTML` api only
		        // exists for `Element`s.
		        if (needsAnchorBefore) {
		            block.addElement(anchorBefore, `@createElement('noscript')`, parentNodes && `@createElement('noscript')`, parentNode, true);
		        }
		        function addAnchorAfter() {
		            block.addElement(anchorAfter, `@createElement('noscript')`, parentNodes && `@createElement('noscript')`, parentNode);
		        }
		        if (needsAnchorAfter && anchorBefore === 'null') {
		            // anchorAfter needs to be in the DOM before we
		            // insert the HTML...
		            addAnchorAfter();
		        }
		        block.builders.mount.addLine(insert(init));
		        if (!parentNode) {
		            block.builders.destroy.addConditional('detach', needsAnchorBefore
		                ? `${detach}\n@detachNode(${anchorBefore});`
		                : detach);
		        }
		        if (needsAnchorAfter && anchorBefore !== 'null') {
		            // ...otherwise it should go afterwards
		            addAnchorAfter();
		        }
		    }
		}

		function sanitize(name) {
		    return name.replace(/[^a-zA-Z]+/g, '_').replace(/^_/, '').replace(/_$/, '');
		}
		class SlotWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		        this.var = 'slot';
		        this.cannotUseInnerHTML();
		        this.fragment = new FragmentWrapper(renderer, block, node.children, parent, stripWhitespace, nextSibling);
		    }
		    render(block, parentNode, parentNodes) {
		        const { renderer } = this;
		        const slotName = this.node.getStaticAttributeValue('name') || 'default';
		        renderer.slots.add(slotName);
		        const content_name = block.getUniqueName(`slot_content_${sanitize(slotName)}`);
		        const prop = quotePropIfNecessary(slotName);
		        block.addVariable(content_name, `#component._slotted${prop}`);
		        // TODO can we use isDomNode instead of type === 'Element'?
		        const needsAnchorBefore = this.prev ? this.prev.node.type !== 'Element' : !parentNode;
		        const needsAnchorAfter = this.next ? this.next.node.type !== 'Element' : !parentNode;
		        const anchorBefore = needsAnchorBefore
		            ? block.getUniqueName(`${content_name}_before`)
		            : (this.prev && this.prev.var) || 'null';
		        const anchorAfter = needsAnchorAfter
		            ? block.getUniqueName(`${content_name}_after`)
		            : (this.next && this.next.var) || 'null';
		        if (needsAnchorBefore)
		            block.addVariable(anchorBefore);
		        if (needsAnchorAfter)
		            block.addVariable(anchorAfter);
		        let mountBefore = block.builders.mount.toString();
		        let destroyBefore = block.builders.destroy.toString();
		        block.builders.create.pushCondition(`!${content_name}`);
		        block.builders.hydrate.pushCondition(`!${content_name}`);
		        block.builders.mount.pushCondition(`!${content_name}`);
		        block.builders.update.pushCondition(`!${content_name}`);
		        block.builders.destroy.pushCondition(`!${content_name}`);
		        this.fragment.render(block, parentNode, parentNodes);
		        block.builders.create.popCondition();
		        block.builders.hydrate.popCondition();
		        block.builders.mount.popCondition();
		        block.builders.update.popCondition();
		        block.builders.destroy.popCondition();
		        const mountLeadin = block.builders.mount.toString() !== mountBefore
		            ? `else`
		            : `if (${content_name})`;
		        if (parentNode) {
		            block.builders.mount.addBlock(deindent `
				${mountLeadin} {
					${needsAnchorBefore && `@append(${parentNode}, ${anchorBefore} || (${anchorBefore} = @createComment()));`}
					@append(${parentNode}, ${content_name});
					${needsAnchorAfter && `@append(${parentNode}, ${anchorAfter} || (${anchorAfter} = @createComment()));`}
				}
			`);
		        }
		        else {
		            block.builders.mount.addBlock(deindent `
				${mountLeadin} {
					${needsAnchorBefore && `@insert(#target, ${anchorBefore} || (${anchorBefore} = @createComment()), anchor);`}
					@insert(#target, ${content_name}, anchor);
					${needsAnchorAfter && `@insert(#target, ${anchorAfter} || (${anchorAfter} = @createComment()), anchor);`}
				}
			`);
		        }
		        // if the slot is unmounted, move nodes back into the document fragment,
		        // so that it can be reinserted later
		        // TODO so that this can work with public API, component._slotted should
		        // be all fragments, derived from options.slots. Not === options.slots
		        const unmountLeadin = block.builders.destroy.toString() !== destroyBefore
		            ? `else`
		            : `if (${content_name})`;
		        if (anchorBefore === 'null' && anchorAfter === 'null') {
		            block.builders.destroy.addBlock(deindent `
				${unmountLeadin} {
					@reinsertChildren(${parentNode}, ${content_name});
				}
			`);
		        }
		        else if (anchorBefore === 'null') {
		            block.builders.destroy.addBlock(deindent `
				${unmountLeadin} {
					@reinsertBefore(${anchorAfter}, ${content_name});
				}
			`);
		        }
		        else if (anchorAfter === 'null') {
		            block.builders.destroy.addBlock(deindent `
				${unmountLeadin} {
					@reinsertAfter(${anchorBefore}, ${content_name});
				}
			`);
		        }
		        else {
		            block.builders.destroy.addBlock(deindent `
				${unmountLeadin} {
					@reinsertBetween(${anchorBefore}, ${anchorAfter}, ${content_name});
					@detachNode(${anchorBefore});
					@detachNode(${anchorAfter});
				}
			`);
		        }
		    }
		}

		// Whitespace inside one of these elements will not result in
		// a whitespace node being created in any circumstances. (This
		// list is almost certainly very incomplete)
		const elementsWithoutText = new Set([
		    'audio',
		    'datalist',
		    'dl',
		    'optgroup',
		    'select',
		    'video',
		]);
		// TODO this should probably be in Fragment
		function shouldSkip$1(node) {
		    if (/\S/.test(node.data))
		        return false;
		    const parentElement = node.findNearest(/(?:Element|InlineComponent|Head)/);
		    if (!parentElement)
		        return false;
		    if (parentElement.type === 'Head')
		        return true;
		    if (parentElement.type === 'InlineComponent')
		        return parentElement.children.length === 1 && node === parentElement.children[0];
		    return parentElement.namespace || elementsWithoutText.has(parentElement.name);
		}
		class TextWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, data) {
		        super(renderer, block, parent, node);
		        this.skip = shouldSkip$1(this.node);
		        this.data = data;
		        this.var = this.skip ? null : 'text';
		    }
		    render(block, parentNode, parentNodes) {
		        if (this.skip)
		            return;
		        block.addElement(this.var, `@createText(${stringify(this.data)})`, parentNodes && `@claimText(${parentNodes}, ${stringify(this.data)})`, parentNode);
		    }
		    remount(name) {
		        return `@append(${name}._slotted.default, ${this.var});`;
		    }
		}

		class TitleWrapper extends Wrapper {
		    constructor(renderer, block, parent, node, stripWhitespace, nextSibling) {
		        super(renderer, block, parent, node);
		    }
		    render(block, parentNode, parentNodes) {
		        const isDynamic = !!this.node.children.find(node => node.type !== 'Text');
		        if (isDynamic) {
		            let value;
		            const allDependencies = new Set();
		            // TODO some of this code is repeated in Tag.ts — would be good to
		            // DRY it out if that's possible without introducing crazy indirection
		            if (this.node.children.length === 1) {
		                // single {tag} — may be a non-string
		                const { expression } = this.node.children[0];
		                const { dependencies, snippet } = this.node.children[0].expression;
		                value = snippet;
		                dependencies.forEach(d => {
		                    allDependencies.add(d);
		                });
		            }
		            else {
		                // '{foo} {bar}' — treat as string concatenation
		                value =
		                    (this.node.children[0].type === 'Text' ? '' : `"" + `) +
		                        this.node.children
		                            .map((chunk) => {
		                            if (chunk.type === 'Text') {
		                                return stringify(chunk.data);
		                            }
		                            else {
		                                const { dependencies, snippet } = chunk.expression;
		                                dependencies.forEach(d => {
		                                    allDependencies.add(d);
		                                });
		                                return chunk.expression.getPrecedence() <= 13 ? `(${snippet})` : snippet;
		                            }
		                        })
		                            .join(' + ');
		            }
		            const last = this.node.shouldCache && block.getUniqueName(`title_value`);
		            if (this.node.shouldCache)
		                block.addVariable(last);
		            let updater;
		            const init = this.node.shouldCache ? `${last} = ${value}` : value;
		            block.builders.init.addLine(`document.title = ${init};`);
		            updater = `document.title = ${this.node.shouldCache ? last : value};`;
		            if (allDependencies.size) {
		                const dependencies = Array.from(allDependencies);
		                const changedCheck = ((block.hasOutros ? `!#current || ` : '') +
		                    dependencies.map(dependency => `changed.${dependency}`).join(' || '));
		                const updateCachedValue = `${last} !== (${last} = ${value})`;
		                const condition = this.node.shouldCache ?
		                    (dependencies.length ? `(${changedCheck}) && ${updateCachedValue}` : updateCachedValue) :
		                    changedCheck;
		                block.builders.update.addConditional(condition, updater);
		            }
		        }
		        else {
		            const value = stringify(this.node.children[0].data);
		            block.builders.hydrate.addLine(`document.title = ${value};`);
		        }
		    }
		}

		const associatedEvents = {
		    innerWidth: 'resize',
		    innerHeight: 'resize',
		    outerWidth: 'resize',
		    outerHeight: 'resize',
		    scrollX: 'scroll',
		    scrollY: 'scroll',
		};
		const properties = {
		    scrollX: 'pageXOffset',
		    scrollY: 'pageYOffset'
		};
		const readonly = new Set([
		    'innerWidth',
		    'innerHeight',
		    'outerWidth',
		    'outerHeight',
		    'online',
		]);
		class WindowWrapper extends Wrapper {
		    constructor(renderer, block, parent, node) {
		        super(renderer, block, parent, node);
		    }
		    render(block, parentNode, parentNodes) {
		        const { renderer } = this;
		        const { component } = renderer;
		        const events = {};
		        const bindings = {};
		        this.node.handlers.forEach(handler => {
		            // TODO verify that it's a valid callee (i.e. built-in or declared method)
		            component.addSourcemapLocations(handler.expression);
		            const isCustomEvent = component.events.has(handler.name);
		            let usesState = handler.dependencies.size > 0;
		            handler.render(component, block, 'window', false); // TODO hoist?
		            const handlerName = block.getUniqueName(`onwindow${handler.name}`);
		            const handlerBody = deindent `
				${usesState && `var ctx = #component.get();`}
				${handler.snippet};
			`;
		            if (isCustomEvent) {
		                // TODO dry this out
		                block.addVariable(handlerName);
		                block.builders.hydrate.addBlock(deindent `
					${handlerName} = %events-${handler.name}.call(#component, window, function(event) {
						${handlerBody}
					});
				`);
		                block.builders.destroy.addLine(deindent `
					${handlerName}.destroy();
				`);
		            }
		            else {
		                block.builders.init.addBlock(deindent `
					function ${handlerName}(event) {
						${handlerBody}
					}
					window.addEventListener("${handler.name}", ${handlerName});
				`);
		                block.builders.destroy.addBlock(deindent `
					window.removeEventListener("${handler.name}", ${handlerName});
				`);
		            }
		        });
		        this.node.bindings.forEach(binding => {
		            // in dev mode, throw if read-only values are written to
		            if (readonly.has(binding.name)) {
		                renderer.readonly.add(binding.value.node.name);
		            }
		            bindings[binding.name] = binding.value.node.name;
		            // bind:online is a special case, we need to listen for two separate events
		            if (binding.name === 'online')
		                return;
		            const associatedEvent = associatedEvents[binding.name];
		            const property = properties[binding.name] || binding.name;
		            if (!events[associatedEvent])
		                events[associatedEvent] = [];
		            events[associatedEvent].push({
		                name: binding.value.node.name,
		                value: property
		            });
		        });
		        const lock = block.getUniqueName(`window_updating`);
		        const clear = block.getUniqueName(`clear_window_updating`);
		        const timeout = block.getUniqueName(`window_updating_timeout`);
		        Object.keys(events).forEach(event => {
		            const handlerName = block.getUniqueName(`onwindow${event}`);
		            const props = events[event];
		            if (event === 'scroll') {
		                // TODO other bidirectional bindings...
		                block.addVariable(lock, 'false');
		                block.addVariable(clear, `function() { ${lock} = false; }`);
		                block.addVariable(timeout);
		                const condition = [
		                    bindings.scrollX && `"${bindings.scrollX}" in this._state`,
		                    bindings.scrollY && `"${bindings.scrollY}" in this._state`
		                ].filter(Boolean).join(' || ');
		                const x = bindings.scrollX && `this._state.${bindings.scrollX}`;
		                const y = bindings.scrollY && `this._state.${bindings.scrollY}`;
		                renderer.metaBindings.addBlock(deindent `
					if (${condition}) {
						window.scrollTo(${x || 'window.pageXOffset'}, ${y || 'window.pageYOffset'});
					}
					${x && `${x} = window.pageXOffset;`}
					${y && `${y} = window.pageYOffset;`}
				`);
		            }
		            else {
		                props.forEach(prop => {
		                    renderer.metaBindings.addLine(`this._state.${prop.name} = window.${prop.value};`);
		                });
		            }
		            const handlerBody = deindent `
				${event === 'scroll' && deindent `
					if (${lock}) return;
					${lock} = true;
				`}
				${component.options.dev && `component._updatingReadonlyProperty = true;`}

				#component.set({
					${props.map(prop => `${prop.name}: this.${prop.value}`)}
				});

				${component.options.dev && `component._updatingReadonlyProperty = false;`}
				${event === 'scroll' && `${lock} = false;`}
			`;
		            block.builders.init.addBlock(deindent `
				function ${handlerName}(event) {
					${handlerBody}
				}
				window.addEventListener("${event}", ${handlerName});
			`);
		            block.builders.destroy.addBlock(deindent `
				window.removeEventListener("${event}", ${handlerName});
			`);
		        });
		        // special case... might need to abstract this out if we add more special cases
		        if (bindings.scrollX || bindings.scrollY) {
		            block.builders.init.addBlock(deindent `
				#component.on("state", ({ changed, current }) => {
					if (${[bindings.scrollX, bindings.scrollY].map(binding => binding && `changed["${binding}"]`).filter(Boolean).join(' || ')} && !${lock}) {
						${lock} = true;
						clearTimeout(${timeout});
						window.scrollTo(${bindings.scrollX ? `current["${bindings.scrollX}"]` : `window.pageXOffset`}, ${bindings.scrollY ? `current["${bindings.scrollY}"]` : `window.pageYOffset`});
						${timeout} = setTimeout(${clear}, 100);
					}
				});
			`);
		        }
		        // another special case. (I'm starting to think these are all special cases.)
		        if (bindings.online) {
		            const handlerName = block.getUniqueName(`onlinestatuschanged`);
		            block.builders.init.addBlock(deindent `
				function ${handlerName}(event) {
					${component.options.dev && `component._updatingReadonlyProperty = true;`}
					#component.set({ ${bindings.online}: navigator.onLine });
					${component.options.dev && `component._updatingReadonlyProperty = false;`}
				}
				window.addEventListener("online", ${handlerName});
				window.addEventListener("offline", ${handlerName});
			`);
		            // add initial value
		            renderer.metaBindings.addLine(`this._state.${bindings.online} = navigator.onLine;`);
		            block.builders.destroy.addBlock(deindent `
				window.removeEventListener("online", ${handlerName});
				window.removeEventListener("offline", ${handlerName});
			`);
		        }
		    }
		}

		const wrappers = {
		    AwaitBlock: AwaitBlockWrapper,
		    Comment: null,
		    Document: DocumentWrapper,
		    DebugTag: DebugTagWrapper,
		    EachBlock: EachBlockWrapper,
		    Element: ElementWrapper,
		    Head: HeadWrapper,
		    IfBlock: IfBlockWrapper,
		    InlineComponent: InlineComponentWrapper,
		    MustacheTag: MustacheTagWrapper,
		    RawMustacheTag: RawMustacheTagWrapper,
		    Slot: SlotWrapper,
		    Text: TextWrapper,
		    Title: TitleWrapper,
		    Window: WindowWrapper
		};
		function link(next, prev) {
		    prev.next = next;
		    if (next)
		        next.prev = prev;
		}
		class FragmentWrapper {
		    constructor(renderer, block, nodes, parent, stripWhitespace, nextSibling) {
		        this.nodes = [];
		        let lastChild;
		        let windowWrapper;
		        let i = nodes.length;
		        while (i--) {
		            const child = nodes[i];
		            if (!(child.type in wrappers)) {
		                throw new Error(`TODO implement ${child.type}`);
		            }
		            // special case — this is an easy way to remove whitespace surrounding
		            // <svelte:window/>. lil hacky but it works
		            if (child.type === 'Window') {
		                windowWrapper = new WindowWrapper(renderer, block, parent, child);
		                continue;
		            }
		            if (child.type === 'Text') {
		                let { data } = child;
		                // We want to remove trailing whitespace inside an element/component/block,
		                // *unless* there is no whitespace between this node and its next sibling
		                if (this.nodes.length === 0) {
		                    const shouldTrim = (nextSibling ? (nextSibling.node.type === 'Text' && /^\s/.test(nextSibling.data)) : !child.hasAncestor('EachBlock'));
		                    if (shouldTrim) {
		                        data = trimEnd(data);
		                        if (!data)
		                            continue;
		                    }
		                }
		                // glue text nodes (which could e.g. be separated by comments) together
		                if (lastChild && lastChild.node.type === 'Text') {
		                    lastChild.data = data + lastChild.data;
		                    continue;
		                }
		                const wrapper = new TextWrapper(renderer, block, parent, child, data);
		                if (wrapper.skip)
		                    continue;
		                this.nodes.unshift(wrapper);
		                link(lastChild, lastChild = wrapper);
		            }
		            else {
		                const Wrapper = wrappers[child.type];
		                if (!Wrapper)
		                    continue;
		                const wrapper = new Wrapper(renderer, block, parent, child, stripWhitespace, lastChild || nextSibling);
		                this.nodes.unshift(wrapper);
		                link(lastChild, lastChild = wrapper);
		            }
		        }
		        if (stripWhitespace) {
		            const first = this.nodes[0];
		            if (first && first.node.type === 'Text') {
		                first.data = trimStart(first.data);
		                if (!first.data) {
		                    first.var = null;
		                    this.nodes.shift();
		                    if (this.nodes[0]) {
		                        this.nodes[0].prev = null;
		                    }
		                }
		            }
		        }
		        if (windowWrapper) {
		            this.nodes.unshift(windowWrapper);
		            link(lastChild, windowWrapper);
		        }
		    }
		    render(block, parentNode, parentNodes) {
		        for (let i = 0; i < this.nodes.length; i += 1) {
		            this.nodes[i].render(block, parentNode, parentNodes);
		        }
		    }
		}

		class Renderer {
		    constructor(component, options) {
		        this.component = component;
		        this.options = options;
		        this.locate = component.locate; // TODO messy
		        this.readonly = new Set();
		        this.slots = new Set();
		        this.usedNames = new Set();
		        this.fileVar = options.dev && this.component.getUniqueName('file');
		        // initial values for e.g. window.innerWidth, if there's a <svelte:window> meta tag
		        this.metaBindings = new CodeBuilder();
		        this.bindingGroups = [];
		        // main block
		        this.block = new Block$1({
		            renderer: this,
		            name: '@create_main_fragment',
		            key: null,
		            bindings: new Map(),
		            contextOwners: new Map(),
		            dependencies: new Set(),
		        });
		        this.block.hasUpdateMethod = true;
		        this.blocks = [];
		        this.fragment = new FragmentWrapper(this, this.block, component.fragment.children, null, true, null);
		        this.blocks.push(this.block);
		        this.blocks.forEach(block => {
		            if (typeof block !== 'string') {
		                block.assignVariableNames();
		            }
		        });
		        this.fragment.render(this.block, null, 'nodes');
		    }
		}

		function dom(component, options) {
		    const format = options.format || 'es';
		    const { computations, name, templateProperties } = component;
		    const renderer = new Renderer(component, options);
		    const { block } = renderer;
		    if (component.options.nestedTransitions) {
		        block.hasOutroMethod = true;
		    }
		    // prevent fragment being created twice (#1063)
		    if (options.customElement)
		        block.builders.create.addLine(`this.c = @noop;`);
		    const builder = new CodeBuilder();
		    const computationBuilder = new CodeBuilder();
		    const computationDeps = new Set();
		    if (computations.length) {
		        computations.forEach(({ key, deps, hasRestParam }) => {
		            if (renderer.readonly.has(key)) {
		                // <svelte:window> bindings
		                throw new Error(`Cannot have a computed value '${key}' that clashes with a read-only property`);
		            }
		            renderer.readonly.add(key);
		            if (deps) {
		                deps.forEach(dep => {
		                    computationDeps.add(dep);
		                });
		                const condition = `${deps.map(dep => `changed.${dep}`).join(' || ')}`;
		                const statement = `if (this._differs(state.${key}, (state.${key} = %computed-${key}(state)))) changed.${key} = true;`;
		                computationBuilder.addConditional(condition, statement);
		            }
		            else {
		                // computed property depends on entire state object —
		                // these must go at the end
		                computationBuilder.addLine(`if (this._differs(state.${key}, (state.${key} = %computed-${key}(@exclude(state, "${key}"))))) changed.${key} = true;`);
		            }
		        });
		    }
		    if (component.javascript) {
		        const componentDefinition = new CodeBuilder();
		        component.declarations.forEach(declaration => {
		            componentDefinition.addBlock(declaration.block);
		        });
		        const js = (component.javascript[0] +
		            componentDefinition +
		            component.javascript[1]);
		        builder.addBlock(js);
		    }
		    if (component.options.dev) {
		        builder.addLine(`const ${renderer.fileVar} = ${JSON.stringify(component.file)};`);
		    }
		    const css = component.stylesheet.render(options.filename, !component.customElement);
		    const styles = component.stylesheet.hasStyles && stringify(options.dev ?
		        `${css.code}\n/*# sourceMappingURL=${css.map.toUrl()} */` :
		        css.code, { onlyEscapeAtSymbol: true });
		    if (styles && component.options.css !== false && !component.customElement) {
		        builder.addBlock(deindent `
			function @add_css() {
				var style = @createElement("style");
				style.id = '${component.stylesheet.id}-style';
				style.textContent = ${styles};
				@append(document.head, style);
			}
		`);
		    }
		    // fix order
		    // TODO the deconflicted names of blocks are reversed... should set them here
		    const blocks = renderer.blocks.slice().reverse();
		    blocks.forEach(block => {
		        builder.addBlock(block.toString());
		    });
		    const sharedPath = options.shared === true
		        ? 'svelte/shared.js'
		        : options.shared || '';
		    const proto = sharedPath
		        ? `@proto`
		        : deindent `
		{
			${['destroy', 'get', 'fire', 'on', 'set', '_set', '_stage', '_mount', '_differs']
            .map(n => `${n}: @${n}`)
            .join(',\n')}
		}`;
		    const debugName = `<${component.customElement ? component.tag : name}>`;
		    // generate initial state object
		    const expectedProperties = Array.from(component.expectedProperties);
		    const globals = expectedProperties.filter(prop => globalWhitelist.has(prop));
		    const storeProps = expectedProperties.filter(prop => prop[0] === '$');
		    const initialState = [];
		    if (globals.length > 0) {
		        initialState.push(`{ ${globals.map(prop => `${prop} : ${prop}`).join(', ')} }`);
		    }
		    if (storeProps.length > 0) {
		        initialState.push(`this.store._init([${storeProps.map(prop => `"${prop.slice(1)}"`)}])`);
		    }
		    if (templateProperties.data) {
		        initialState.push(`%data()`);
		    }
		    else if (globals.length === 0 && storeProps.length === 0) {
		        initialState.push('{}');
		    }
		    initialState.push(`options.data`);
		    const hasInitHooks = !!(templateProperties.oncreate || templateProperties.onstate || templateProperties.onupdate);
		    const constructorBody = deindent `
		${options.dev && deindent `
			this._debugName = '${debugName}';
			${!component.customElement && deindent `
			if (!options || (!options.target && !options.root)) {
				throw new Error("'target' is a required option");
			}`}
			${storeProps.length > 0 && !templateProperties.store && deindent `
			if (!options.store) {
				throw new Error("${debugName} references store properties, but no store was provided");
			}`}
		`}

		@init(this, options);
		${templateProperties.store && `this.store = %store();`}
		${component.refs.size > 0 && `this.refs = {};`}
		this._state = ${initialState.reduce((state, piece) => `@assign(${state}, ${piece})`)};
		${storeProps.length > 0 && `this.store._add(this, [${storeProps.map(prop => `"${prop.slice(1)}"`)}]);`}
		${renderer.metaBindings}
		${computations.length && `this._recompute({ ${Array.from(computationDeps).map(dep => `${dep}: 1`).join(', ')} }, this._state);`}
		${options.dev &&
        Array.from(component.expectedProperties).map(prop => {
            if (globalWhitelist.has(prop))
                return;
            if (computations.find(c => c.key === prop))
                return;
            const message = component.components.has(prop) ?
                `${debugName} expected to find '${prop}' in \`data\`, but found it in \`components\` instead` :
                `${debugName} was created without expected data property '${prop}'`;
            const conditions = [`!('${prop}' in this._state)`];
            if (component.customElement)
                conditions.push(`!('${prop}' in this.attributes)`);
            return `if (${conditions.join(' && ')}) console.warn("${message}");`;
        })}
		${renderer.bindingGroups.length &&
        `this._bindingGroups = [${Array(renderer.bindingGroups.length).fill('[]').join(', ')}];`}
		this._intro = ${component.options.skipIntroByDefault ? '!!options.intro' : 'true'};

		${templateProperties.onstate && `this._handlers.state = [%onstate];`}
		${templateProperties.onupdate && `this._handlers.update = [%onupdate];`}

		${(templateProperties.ondestroy || storeProps.length) && (`this._handlers.destroy = [${[templateProperties.ondestroy && `%ondestroy`, storeProps.length && `@removeFromStore`].filter(Boolean).join(', ')}];`)}

		${renderer.slots.size && `this._slotted = options.slots || {};`}

		${component.customElement ?
        deindent `
				this.attachShadow({ mode: 'open' });
				${css.code && `this.shadowRoot.innerHTML = \`<style>${escape$1(css.code, { onlyEscapeAtSymbol: true }).replace(/\\/g, '\\\\')}${options.dev ? `\n/*# sourceMappingURL=${css.map.toUrl()} */` : ''}</style>\`;`}
			` :
        (component.stylesheet.hasStyles && options.css !== false &&
            `if (!document.getElementById("${component.stylesheet.id}-style")) @add_css();`)}

		${templateProperties.onstate && `%onstate.call(this, { changed: @assignTrue({}, this._state), current: this._state });`}

		this._fragment = @create_main_fragment(this, this._state);

		${hasInitHooks && deindent `
			this.root._oncreate.push(() => {
				${templateProperties.oncreate && `%oncreate.call(this);`}
				this.fire("update", { changed: @assignTrue({}, this._state), current: this._state });
			});
		`}

		${component.customElement ? deindent `
			this._fragment.c();
			this._fragment.${block.hasIntroMethod ? 'i' : 'm'}(this.shadowRoot, null);

			if (options.target) this._mount(options.target, options.anchor);
		` : deindent `
			if (options.target) {
				${component.options.hydratable
        ? deindent `
				var nodes = @children(options.target);
				options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
				nodes.forEach(@detachNode);` :
        deindent `
				${options.dev &&
            `if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the \`hydratable: true\` option");`}
				this._fragment.c();`}
				this._mount(options.target, options.anchor);

				${(component.hasComponents || renderer.hasComplexBindings || hasInitHooks || renderer.hasIntroTransitions) &&
        `@flush(this);`}
			}
		`}

		${component.options.skipIntroByDefault && `this._intro = true;`}
	`;
		    if (component.customElement) {
		        const props = component.props || Array.from(component.expectedProperties);
		        builder.addBlock(deindent `
			class ${name} extends HTMLElement {
				constructor(options = {}) {
					super();
					${constructorBody}
				}

				static get observedAttributes() {
					return ${JSON.stringify(props)};
				}

				${props.map(prop => deindent `
					get ${prop}() {
						return this.get().${prop};
					}

					set ${prop}(value) {
						this.set({ ${prop}: value });
					}
				`).join('\n\n')}

				${renderer.slots.size && deindent `
					connectedCallback() {
						Object.keys(this._slotted).forEach(key => {
							this.appendChild(this._slotted[key]);
						});
					}`}

				attributeChangedCallback(attr, oldValue, newValue) {
					this.set({ [attr]: newValue });
				}

				${(component.hasComponents || renderer.hasComplexBindings || templateProperties.oncreate || renderer.hasIntroTransitions) && deindent `
					connectedCallback() {
						@flush(this);
					}
				`}
			}

			@assign(${name}.prototype, ${proto});
			${templateProperties.methods && `@assign(${name}.prototype, %methods);`}
			@assign(${name}.prototype, {
				_mount(target, anchor) {
					target.insertBefore(this, anchor);
				}
			});

			customElements.define("${component.tag}", ${name});
		`);
		    }
		    else {
		        builder.addBlock(deindent `
			function ${name}(options) {
				${constructorBody}
			}

			@assign(${name}.prototype, ${proto});
			${templateProperties.methods && `@assign(${name}.prototype, %methods);`}
		`);
		    }
		    const immutable = templateProperties.immutable ? templateProperties.immutable.value.value : options.immutable;
		    builder.addBlock(deindent `
		${options.dev && deindent `
			${name}.prototype._checkReadOnly = function _checkReadOnly(newState) {
				${Array.from(renderer.readonly).map(prop => `if ('${prop}' in newState && !this._updatingReadonlyProperty) throw new Error("${debugName}: Cannot set read-only property '${prop}'");`)}
			};
		`}

		${computations.length ? deindent `
			${name}.prototype._recompute = function _recompute(changed, state) {
				${computationBuilder}
			}
		` : (!sharedPath && `${name}.prototype._recompute = @noop;`)}

		${templateProperties.setup && `%setup(${name});`}

		${templateProperties.preload && `${name}.preload = %preload;`}

		${immutable && `${name}.prototype._differs = @_differsImmutable;`}
	`);
		    let result = builder.toString();
		    return component.generate(result, options, {
		        banner: `/* ${component.file ? `${component.file} ` : ``}generated by Svelte v${"2.15.3"} */`,
		        sharedPath,
		        name,
		        format,
		    });
		}

		function AwaitBlock (node, renderer, options) {
		    const { snippet } = node.expression;
		    renderer.append('${(function(__value) { if(@isPromise(__value)) return `');
		    renderer.render(node.pending.children, options);
		    renderer.append('`; return function(ctx) { return `');
		    renderer.render(node.then.children, options);
		    renderer.append(`\`;}(Object.assign({}, ctx, { ${node.value}: __value }));}(${snippet})) }`);
		}

		function Comment$1 (node, renderer, options) {
		    if (options.preserveComments) {
		        renderer.append(`<!--${node.data}-->`);
		    }
		}

		function DebugTag (node, renderer, options) {
		    if (!options.dev)
		        return;
		    const filename = options.file || null;
		    const { line, column } = options.locate(node.start + 1);
		    const obj = node.expressions.length === 0
		        ? `ctx`
		        : `{ ${node.expressions
            .map(e => e.node.name)
            .map(name => `${name}: ctx.${name}`)
            .join(', ')} }`;
		    const str = '${@debug(' + `${filename && stringify(filename)}, ${line}, ${column}, ${obj})}`;
		    renderer.append(str);
		}

		function EachBlock (node, renderer, options) {
		    const { snippet } = node.expression;
		    const props = node.contexts.map(prop => `${prop.key.name}: item${prop.tail}`);
		    const getContext = node.index
		        ? `(item, i) => Object.assign({}, ctx, { ${props.join(', ')}, ${node.index}: i })`
		        : `item => Object.assign({}, ctx, { ${props.join(', ')} })`;
		    const open = `\${ ${node.else ? `${snippet}.length ? ` : ''}@each(${snippet}, ${getContext}, ctx => \``;
		    renderer.append(open);
		    renderer.render(node.children, options);
		    const close = `\`)`;
		    renderer.append(close);
		    if (node.else) {
		        renderer.append(` : \``);
		        renderer.render(node.else.children, options);
		        renderer.append(`\``);
		    }
		    renderer.append('}');
		}

		// source: https://gist.github.com/ArjanSchouten/0b8574a6ad7f5065a5e7
		const boolean_attributes = new Set([
		    'async',
		    'autocomplete',
		    'autofocus',
		    'autoplay',
		    'border',
		    'challenge',
		    'checked',
		    'compact',
		    'contenteditable',
		    'controls',
		    'default',
		    'defer',
		    'disabled',
		    'formnovalidate',
		    'frameborder',
		    'hidden',
		    'indeterminate',
		    'ismap',
		    'loop',
		    'multiple',
		    'muted',
		    'nohref',
		    'noresize',
		    'noshade',
		    'novalidate',
		    'nowrap',
		    'open',
		    'readonly',
		    'required',
		    'reversed',
		    'scoped',
		    'scrolling',
		    'seamless',
		    'selected',
		    'sortable',
		    'spellcheck',
		    'translate'
		]);
		function Element (node, renderer, options) {
		    let openingTag = `<${node.name}`;
		    let textareaContents; // awkward special case
		    const slot = node.getStaticAttributeValue('slot');
		    if (slot && node.hasAncestor('InlineComponent')) {
		        const slot = node.attributes.find((attribute) => attribute.name === 'slot');
		        const slotName = slot.chunks[0].data;
		        const target = renderer.targets[renderer.targets.length - 1];
		        target.slotStack.push(slotName);
		        target.slots[slotName] = '';
		    }
		    const classExpr = node.classes.map((classDir) => {
		        const { expression, name } = classDir;
		        const snippet = expression ? expression.snippet : `ctx${quotePropIfNecessary(name)}`;
		        return `${snippet} ? "${name}" : ""`;
		    }).join(', ');
		    let addClassAttribute = classExpr ? true : false;
		    if (node.attributes.find(attr => attr.isSpread)) {
		        // TODO dry this out
		        const args = [];
		        node.attributes.forEach(attribute => {
		            if (attribute.isSpread) {
		                args.push(attribute.expression.snippet);
		            }
		            else {
		                if (attribute.name === 'value' && node.name === 'textarea') {
		                    textareaContents = stringifyAttribute(attribute);
		                }
		                else if (attribute.isTrue) {
		                    args.push(`{ ${quoteNameIfNecessary(attribute.name)}: true }`);
		                }
		                else if (boolean_attributes.has(attribute.name) &&
		                    attribute.chunks.length === 1 &&
		                    attribute.chunks[0].type !== 'Text') {
		                    // a boolean attribute with one non-Text chunk
		                    args.push(`{ ${quoteNameIfNecessary(attribute.name)}: ${attribute.chunks[0].snippet} }`);
		                }
		                else {
		                    args.push(`{ ${quoteNameIfNecessary(attribute.name)}: \`${stringifyAttribute(attribute)}\` }`);
		                }
		            }
		        });
		        openingTag += "${@spread([" + args.join(', ') + "])}";
		    }
		    else {
		        node.attributes.forEach((attribute) => {
		            if (attribute.type !== 'Attribute')
		                return;
		            if (attribute.name === 'value' && node.name === 'textarea') {
		                textareaContents = stringifyAttribute(attribute);
		            }
		            else if (attribute.isTrue) {
		                openingTag += ` ${attribute.name}`;
		            }
		            else if (boolean_attributes.has(attribute.name) &&
		                attribute.chunks.length === 1 &&
		                attribute.chunks[0].type !== 'Text') {
		                // a boolean attribute with one non-Text chunk
		                openingTag += '${' + attribute.chunks[0].snippet + ' ? " ' + attribute.name + '" : "" }';
		            }
		            else if (attribute.name === 'class' && classExpr) {
		                addClassAttribute = false;
		                openingTag += ` class="\${[\`${stringifyAttribute(attribute)}\`, ${classExpr}].join(' ').trim() }"`;
		            }
		            else if (attribute.chunks.length === 1 && attribute.chunks[0].type !== 'Text') {
		                const { name } = attribute;
		                const { snippet } = attribute.chunks[0];
		                openingTag += '${(v => v == null ? "" : ` ' + name + '="${@escape(' + snippet + ')}"`)(' + snippet + ')}';
		            }
		            else {
		                openingTag += ` ${attribute.name}="${stringifyAttribute(attribute)}"`;
		            }
		        });
		    }
		    node.bindings.forEach(binding => {
		        const { name, value: { snippet } } = binding;
		        if (name === 'group') ;
		        else {
		            openingTag += ' ${(v => v ? ("' + name + '" + (v === true ? "" : "=" + JSON.stringify(v))) : "")(' + snippet + ')}';
		        }
		    });
		    if (addClassAttribute) {
		        openingTag += `\${((v) => v ? ' class="' + v + '"' : '')([${classExpr}].join(' ').trim())}`;
		    }
		    openingTag += '>';
		    renderer.append(openingTag);
		    if (node.name === 'textarea' && textareaContents !== undefined) {
		        renderer.append(textareaContents);
		    }
		    else {
		        renderer.render(node.children, options);
		    }
		    if (!isVoidElementName(node.name)) {
		        renderer.append(`</${node.name}>`);
		    }
		}
		function stringifyAttribute(attribute) {
		    return attribute.chunks
		        .map((chunk) => {
		        if (chunk.type === 'Text') {
		            return escapeTemplate(escape$1(chunk.data).replace(/"/g, '&quot;'));
		        }
		        return '${@escape(' + chunk.snippet + ')}';
		    })
		        .join('');
		}

		function Head (node, renderer, options) {
		    renderer.append('${(__result.head += `');
		    renderer.render(node.children, options);
		    renderer.append('`, "")}');
		}

		function HtmlTag (node, renderer, options) {
		    renderer.append('${' + node.expression.snippet + '}');
		}

		function IfBlock (node, renderer, options) {
		    const { snippet } = node.expression;
		    renderer.append('${ ' + snippet + ' ? `');
		    renderer.render(node.children, options);
		    renderer.append('` : `');
		    if (node.else) {
		        renderer.render(node.else.children, options);
		    }
		    renderer.append('` }');
		}

		function InlineComponent (node, renderer, options) {
		    function stringifyAttribute(chunk) {
		        if (chunk.type === 'Text') {
		            return escapeTemplate(escape$1(chunk.data));
		        }
		        return '${@escape( ' + chunk.snippet + ')}';
		    }
		    const bindingProps = node.bindings.map(binding => {
		        const { name } = getObject(binding.value.node);
		        const tail = binding.value.node.type === 'MemberExpression'
		            ? getTailSnippet(binding.value.node)
		            : '';
		        return `${quoteNameIfNecessary(binding.name)}: ctx${quotePropIfNecessary(name)}${tail}`;
		    });
		    function getAttributeValue(attribute) {
		        if (attribute.isTrue)
		            return `true`;
		        if (attribute.chunks.length === 0)
		            return `''`;
		        if (attribute.chunks.length === 1) {
		            const chunk = attribute.chunks[0];
		            if (chunk.type === 'Text') {
		                return stringify(chunk.data);
		            }
		            return chunk.snippet;
		        }
		        return '`' + attribute.chunks.map(stringifyAttribute).join('') + '`';
		    }
		    const usesSpread = node.attributes.find(attr => attr.isSpread);
		    const props = usesSpread
		        ? `Object.assign(${node.attributes
            .map(attribute => {
            if (attribute.isSpread) {
                return attribute.expression.snippet;
            }
            else {
                return `{ ${quoteNameIfNecessary(attribute.name)}: ${getAttributeValue(attribute)} }`;
            }
        })
            .concat(bindingProps.map(p => `{ ${p} }`))
            .join(', ')})`
		        : `{ ${node.attributes
            .map(attribute => `${quoteNameIfNecessary(attribute.name)}: ${getAttributeValue(attribute)}`)
            .concat(bindingProps)
            .join(', ')} }`;
		    const expression = (node.name === 'svelte:self'
		        ? node.component.name
		        : node.name === 'svelte:component'
		            ? `((${node.expression.snippet}) || @missingComponent)`
		            : `%components-${node.name}`);
		    node.bindings.forEach(binding => {
		        const conditions = [];
		        let parent = node;
		        while (parent = parent.parent) {
		            if (parent.type === 'IfBlock') {
		                // TODO handle contextual bindings...
		                conditions.push(`(${parent.expression.snippet})`);
		            }
		        }
		        conditions.push(`!('${binding.name}' in ctx)`, `${expression}.data`);
		        const { name } = getObject(binding.value.node);
		        renderer.bindings.push(deindent `
			if (${conditions.reverse().join('&&')}) {
				tmp = ${expression}.data();
				if ('${name}' in tmp) {
					ctx${quotePropIfNecessary(binding.name)} = tmp.${name};
					settled = false;
				}
			}
		`);
		    });
		    let open = `\${@validateSsrComponent(${expression}, '${node.name}')._render(__result, ${props}`;
		    const component_options = [];
		    component_options.push(`store: options.store`);
		    if (node.children.length) {
		        const target = {
		            slots: { default: '' },
		            slotStack: ['default']
		        };
		        renderer.targets.push(target);
		        renderer.render(node.children, options);
		        const slotted = Object.keys(target.slots)
		            .map(name => `${quoteNameIfNecessary(name)}: () => \`${target.slots[name]}\``)
		            .join(', ');
		        component_options.push(`slotted: { ${slotted} }`);
		        renderer.targets.pop();
		    }
		    if (component_options.length) {
		        open += `, { ${component_options.join(', ')} }`;
		    }
		    renderer.append(open);
		    renderer.append(')}');
		}

		function Slot (node, renderer, options) {
		    const name = node.attributes.find(attribute => attribute.name === 'name');
		    const slotName = name && name.chunks[0].data || 'default';
		    const prop = quotePropIfNecessary(slotName);
		    renderer.append(`\${options && options.slotted && options.slotted${prop} ? options.slotted${prop}() : \``);
		    renderer.render(node.children, options);
		    renderer.append(`\`}`);
		}

		function Tag$1 (node, renderer, options) {
		    renderer.append(node.parent &&
		        node.parent.type === 'Element' &&
		        node.parent.name === 'style'
		        ? '${' + node.expression.snippet + '}'
		        : '${@escape(' + node.expression.snippet + ')}');
		}

		function Text$1 (node, renderer, options) {
		    let text = node.data;
		    if (!node.parent ||
		        node.parent.type !== 'Element' ||
		        (node.parent.name !== 'script' && node.parent.name !== 'style')) {
		        // unless this Text node is inside a <script> or <style> element, escape &,<,>
		        text = escapeHTML(text);
		    }
		    renderer.append(escape$1(escapeTemplate(text)));
		}

		function Title (node, renderer, options) {
		    renderer.append(`<title>`);
		    renderer.render(node.children, options);
		    renderer.append(`</title>`);
		}

		function noop$2() { }
		const handlers = {
		    AwaitBlock,
		    Comment: Comment$1,
		    DebugTag,
		    Document: noop$2,
		    EachBlock,
		    Element,
		    Head,
		    IfBlock,
		    InlineComponent,
		    MustacheTag: Tag$1,
		    RawMustacheTag: HtmlTag,
		    Slot,
		    Text: Text$1,
		    Title,
		    Window: noop$2
		};
		class Renderer$1 {
		    constructor() {
		        this.bindings = [];
		        this.code = '';
		        this.targets = [];
		    }
		    append(code) {
		        if (this.targets.length) {
		            const target = this.targets[this.targets.length - 1];
		            const slotName = target.slotStack[target.slotStack.length - 1];
		            target.slots[slotName] += code;
		        }
		        else {
		            this.code += code;
		        }
		    }
		    render(nodes, options) {
		        nodes.forEach(node => {
		            const handler = handlers[node.type];
		            if (!handler) {
		                throw new Error(`No handler for '${node.type}' nodes`);
		            }
		            handler(node, this, options);
		        });
		    }
		}

		function ssr(component, options) {
		    const renderer = new Renderer$1();
		    const format = options.format || 'cjs';
		    const { computations, name, templateProperties } = component;
		    // create main render() function
		    renderer.render(trim(component.fragment.children), Object.assign({
		        locate: component.locate
		    }, options));
		    const css = component.customElement ?
		        { code: null, map: null } :
		        component.stylesheet.render(options.filename, true);
		    // generate initial state object
		    const expectedProperties = Array.from(component.expectedProperties);
		    const globals = expectedProperties.filter(prop => globalWhitelist.has(prop));
		    const storeProps = expectedProperties.filter(prop => prop[0] === '$');
		    const initialState = [];
		    if (globals.length > 0) {
		        initialState.push(`{ ${globals.map(prop => `${prop} : ${prop}`).join(', ')} }`);
		    }
		    if (storeProps.length > 0) {
		        const initialize = `_init([${storeProps.map(prop => `"${prop.slice(1)}"`)}])`;
		        initialState.push(`options.store.${initialize}`);
		    }
		    if (templateProperties.data) {
		        initialState.push(`%data()`);
		    }
		    else if (globals.length === 0 && storeProps.length === 0) {
		        initialState.push('{}');
		    }
		    initialState.push('ctx');
		    let js = null;
		    if (component.javascript) {
		        const componentDefinition = new CodeBuilder();
		        // not all properties are relevant to SSR (e.g. lifecycle hooks)
		        const relevant = new Set([
		            'data',
		            'components',
		            'computed',
		            'helpers',
		            'preload',
		            'store'
		        ]);
		        component.declarations.forEach(declaration => {
		            if (relevant.has(declaration.type)) {
		                componentDefinition.addBlock(declaration.block);
		            }
		        });
		        js = (component.javascript[0] +
		            componentDefinition +
		            component.javascript[1]);
		    }
		    const debugName = `<${component.customElement ? component.tag : name}>`;
		    // TODO concatenate CSS maps
		    const result = (deindent `
		${js}

		var ${name} = {};

		${options.filename && `${name}.filename = ${stringify(options.filename)}`};

		${name}.data = function() {
			return ${templateProperties.data ? `%data()` : `{}`};
		};

		${name}.render = function(state, options = {}) {
			var components = new Set();

			function addComponent(component) {
				components.add(component);
			}

			var result = { head: '', addComponent };
			var html = ${name}._render(result, state, options);

			var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\\n');

			return {
				html,
				head: result.head,
				css: { code: cssCode, map: null },
				toString() {
					return html;
				}
			};
		}

		${name}._render = function(__result, ctx, options) {
			${templateProperties.store && `options.store = %store();`}
			__result.addComponent(${name});

			${options.dev && storeProps.length > 0 && !templateProperties.store && deindent `
				if (!options.store) {
					throw new Error("${debugName} references store properties, but no store was provided");
				}
			`}

			ctx = Object.assign(${initialState.join(', ')});

			${computations.map(({ key }) => `ctx.${key} = %computed-${key}(ctx);`)}

			${renderer.bindings.length &&
        deindent `
				var settled = false;
				var tmp;

				while (!settled) {
					settled = true;

					${renderer.bindings.join('\n\n')}
				}
			`}

			return \`${renderer.code}\`;
		};

		${name}.css = {
			code: ${css.code ? stringify(css.code) : `''`},
			map: ${css.map ? stringify(css.map.toString()) : 'null'}
		};

		var warned = false;

		${templateProperties.preload && `${name}.preload = %preload;`}
	`).trim();
		    return component.generate(result, options, { name, format });
		}
		function trim(nodes) {
		    let start = 0;
		    for (; start < nodes.length; start += 1) {
		        const node = nodes[start];
		        if (node.type !== 'Text')
		            break;
		        node.data = node.data.replace(/^\s+/, '');
		        if (node.data)
		            break;
		    }
		    let end = nodes.length;
		    for (; end > start; end -= 1) {
		        const node = nodes[end - 1];
		        if (node.type !== 'Text')
		            break;
		        node.data = node.data.replace(/\s+$/, '');
		        if (node.data)
		            break;
		    }
		    return nodes.slice(start, end);
		}

		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		function encode(decoded) {
		    var sourceFileIndex = 0; // second field
		    var sourceCodeLine = 0; // third field
		    var sourceCodeColumn = 0; // fourth field
		    var nameIndex = 0; // fifth field
		    var mappings = '';
		    for (var i = 0; i < decoded.length; i++) {
		        var line = decoded[i];
		        if (i > 0)
		            mappings += ';';
		        if (line.length === 0)
		            continue;
		        var generatedCodeColumn = 0; // first field
		        var lineMappings = [];
		        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
		            var segment = line_1[_i];
		            var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
		            generatedCodeColumn = segment[0];
		            if (segment.length > 1) {
		                segmentMappings +=
		                    encodeInteger(segment[1] - sourceFileIndex) +
		                        encodeInteger(segment[2] - sourceCodeLine) +
		                        encodeInteger(segment[3] - sourceCodeColumn);
		                sourceFileIndex = segment[1];
		                sourceCodeLine = segment[2];
		                sourceCodeColumn = segment[3];
		            }
		            if (segment.length === 5) {
		                segmentMappings += encodeInteger(segment[4] - nameIndex);
		                nameIndex = segment[4];
		            }
		            lineMappings.push(segmentMappings);
		        }
		        mappings += lineMappings.join(',');
		    }
		    return mappings;
		}
		function encodeInteger(num) {
		    var result = '';
		    num = num < 0 ? (-num << 1) | 1 : num << 1;
		    do {
		        var clamped = num & 31;
		        num >>= 5;
		        if (num > 0) {
		            clamped |= 32;
		        }
		        result += chars[clamped];
		    } while (num > 0);
		    return result;
		}

		var Chunk = function Chunk(start, end, content) {
			this.start = start;
			this.end = end;
			this.original = content;

			this.intro = '';
			this.outro = '';

			this.content = content;
			this.storeName = false;
			this.edited = false;

			// we make these non-enumerable, for sanity while debugging
			Object.defineProperties(this, {
				previous: { writable: true, value: null },
				next:     { writable: true, value: null }
			});
		};

		Chunk.prototype.appendLeft = function appendLeft (content) {
			this.outro += content;
		};

		Chunk.prototype.appendRight = function appendRight (content) {
			this.intro = this.intro + content;
		};

		Chunk.prototype.clone = function clone () {
			var chunk = new Chunk(this.start, this.end, this.original);

			chunk.intro = this.intro;
			chunk.outro = this.outro;
			chunk.content = this.content;
			chunk.storeName = this.storeName;
			chunk.edited = this.edited;

			return chunk;
		};

		Chunk.prototype.contains = function contains (index) {
			return this.start < index && index < this.end;
		};

		Chunk.prototype.eachNext = function eachNext (fn) {
			var chunk = this;
			while (chunk) {
				fn(chunk);
				chunk = chunk.next;
			}
		};

		Chunk.prototype.eachPrevious = function eachPrevious (fn) {
			var chunk = this;
			while (chunk) {
				fn(chunk);
				chunk = chunk.previous;
			}
		};

		Chunk.prototype.edit = function edit (content, storeName, contentOnly) {
			this.content = content;
			if (!contentOnly) {
				this.intro = '';
				this.outro = '';
			}
			this.storeName = storeName;

			this.edited = true;

			return this;
		};

		Chunk.prototype.prependLeft = function prependLeft (content) {
			this.outro = content + this.outro;
		};

		Chunk.prototype.prependRight = function prependRight (content) {
			this.intro = content + this.intro;
		};

		Chunk.prototype.split = function split (index) {
			var sliceIndex = index - this.start;

			var originalBefore = this.original.slice(0, sliceIndex);
			var originalAfter = this.original.slice(sliceIndex);

			this.original = originalBefore;

			var newChunk = new Chunk(index, this.end, originalAfter);
			newChunk.outro = this.outro;
			this.outro = '';

			this.end = index;

			if (this.edited) {
				// TODO is this block necessary?...
				newChunk.edit('', false);
				this.content = '';
			} else {
				this.content = originalBefore;
			}

			newChunk.next = this.next;
			if (newChunk.next) { newChunk.next.previous = newChunk; }
			newChunk.previous = this;
			this.next = newChunk;

			return newChunk;
		};

		Chunk.prototype.toString = function toString () {
			return this.intro + this.content + this.outro;
		};

		Chunk.prototype.trimEnd = function trimEnd (rx) {
			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) { return true; }

			var trimmed = this.content.replace(rx, '');

			if (trimmed.length) {
				if (trimmed !== this.content) {
					this.split(this.start + trimmed.length).edit('', undefined, true);
				}
				return true;

			} else {
				this.edit('', undefined, true);

				this.intro = this.intro.replace(rx, '');
				if (this.intro.length) { return true; }
			}
		};

		Chunk.prototype.trimStart = function trimStart (rx) {
			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) { return true; }

			var trimmed = this.content.replace(rx, '');

			if (trimmed.length) {
				if (trimmed !== this.content) {
					this.split(this.end - trimmed.length);
					this.edit('', undefined, true);
				}
				return true;

			} else {
				this.edit('', undefined, true);

				this.outro = this.outro.replace(rx, '');
				if (this.outro.length) { return true; }
			}
		};

		var btoa = function () {
			throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
		};
		if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
			btoa = window.btoa;
		} else if (typeof Buffer === 'function') {
			btoa = function (str) { return new Buffer(str).toString('base64'); };
		}

		var SourceMap = function SourceMap(properties) {
			this.version = 3;
			this.file = properties.file;
			this.sources = properties.sources;
			this.sourcesContent = properties.sourcesContent;
			this.names = properties.names;
			this.mappings = encode(properties.mappings);
		};

		SourceMap.prototype.toString = function toString () {
			return JSON.stringify(this);
		};

		SourceMap.prototype.toUrl = function toUrl () {
			return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
		};

		function guessIndent(code) {
			var lines = code.split('\n');

			var tabbed = lines.filter(function (line) { return /^\t+/.test(line); });
			var spaced = lines.filter(function (line) { return /^ {2,}/.test(line); });

			if (tabbed.length === 0 && spaced.length === 0) {
				return null;
			}

			// More lines tabbed than spaced? Assume tabs, and
			// default to tabs in the case of a tie (or nothing
			// to go on)
			if (tabbed.length >= spaced.length) {
				return '\t';
			}

			// Otherwise, we need to guess the multiple
			var min = spaced.reduce(function (previous, current) {
				var numSpaces = /^ +/.exec(current)[0].length;
				return Math.min(numSpaces, previous);
			}, Infinity);

			return new Array(min + 1).join(' ');
		}

		function getRelativePath(from, to) {
			var fromParts = from.split(/[/\\]/);
			var toParts = to.split(/[/\\]/);

			fromParts.pop(); // get dirname

			while (fromParts[0] === toParts[0]) {
				fromParts.shift();
				toParts.shift();
			}

			if (fromParts.length) {
				var i = fromParts.length;
				while (i--) { fromParts[i] = '..'; }
			}

			return fromParts.concat(toParts).join('/');
		}

		var toString$2 = Object.prototype.toString;

		function isObject(thing) {
			return toString$2.call(thing) === '[object Object]';
		}

		function getLocator$1(source) {
			var originalLines = source.split('\n');
			var lineOffsets = [];

			for (var i = 0, pos = 0; i < originalLines.length; i++) {
				lineOffsets.push(pos);
				pos += originalLines[i].length + 1;
			}

			return function locate(index) {
				var i = 0;
				var j = lineOffsets.length;
				while (i < j) {
					var m = (i + j) >> 1;
					if (index < lineOffsets[m]) {
						j = m;
					} else {
						i = m + 1;
					}
				}
				var line = i - 1;
				var column = index - lineOffsets[line];
				return { line: line, column: column };
			};
		}

		var Mappings = function Mappings(hires) {
			this.hires = hires;
			this.generatedCodeLine = 0;
			this.generatedCodeColumn = 0;
			this.raw = [];
			this.rawSegments = this.raw[this.generatedCodeLine] = [];
			this.pending = null;
		};

		Mappings.prototype.addEdit = function addEdit (sourceIndex, content, loc, nameIndex) {
			if (content.length) {
				var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
				if (nameIndex >= 0) {
					segment.push(nameIndex);
				}
				this.rawSegments.push(segment);
			} else if (this.pending) {
				this.rawSegments.push(this.pending);
			}

			this.advance(content);
			this.pending = null;
		};

		Mappings.prototype.addUneditedChunk = function addUneditedChunk (sourceIndex, chunk, original, loc, sourcemapLocations) {
				var this$1 = this;

			var originalCharIndex = chunk.start;
			var first = true;

			while (originalCharIndex < chunk.end) {
				if (this$1.hires || first || sourcemapLocations[originalCharIndex]) {
					this$1.rawSegments.push([this$1.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
				}

				if (original[originalCharIndex] === '\n') {
					loc.line += 1;
					loc.column = 0;
					this$1.generatedCodeLine += 1;
					this$1.raw[this$1.generatedCodeLine] = this$1.rawSegments = [];
					this$1.generatedCodeColumn = 0;
				} else {
					loc.column += 1;
					this$1.generatedCodeColumn += 1;
				}

				originalCharIndex += 1;
				first = false;
			}

			this.pending = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
		};

		Mappings.prototype.advance = function advance (str) {
				var this$1 = this;

			if (!str) { return; }

			var lines = str.split('\n');

			if (lines.length > 1) {
				for (var i = 0; i < lines.length - 1; i++) {
					this$1.generatedCodeLine++;
					this$1.raw[this$1.generatedCodeLine] = this$1.rawSegments = [];
				}
				this.generatedCodeColumn = 0;
			}

			this.generatedCodeColumn += lines[lines.length - 1].length;
		};

		var n = '\n';

		var warned = {
			insertLeft: false,
			insertRight: false,
			storeName: false
		};

		var MagicString = function MagicString(string, options) {
			if ( options === void 0 ) options = {};

			var chunk = new Chunk(0, string.length, string);

			Object.defineProperties(this, {
				original:              { writable: true, value: string },
				outro:                 { writable: true, value: '' },
				intro:                 { writable: true, value: '' },
				firstChunk:            { writable: true, value: chunk },
				lastChunk:             { writable: true, value: chunk },
				lastSearchedChunk:     { writable: true, value: chunk },
				byStart:               { writable: true, value: {} },
				byEnd:                 { writable: true, value: {} },
				filename:              { writable: true, value: options.filename },
				indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
				sourcemapLocations:    { writable: true, value: {} },
				storedNames:           { writable: true, value: {} },
				indentStr:             { writable: true, value: guessIndent(string) }
			});

			this.byStart[0] = chunk;
			this.byEnd[string.length] = chunk;
		};

		MagicString.prototype.addSourcemapLocation = function addSourcemapLocation (char) {
			this.sourcemapLocations[char] = true;
		};

		MagicString.prototype.append = function append (content) {
			if (typeof content !== 'string') { throw new TypeError('outro content must be a string'); }

			this.outro += content;
			return this;
		};

		MagicString.prototype.appendLeft = function appendLeft (index, content) {
			if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

			this._split(index);

			var chunk = this.byEnd[index];

			if (chunk) {
				chunk.appendLeft(content);
			} else {
				this.intro += content;
			}
			return this;
		};

		MagicString.prototype.appendRight = function appendRight (index, content) {
			if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

			this._split(index);

			var chunk = this.byStart[index];

			if (chunk) {
				chunk.appendRight(content);
			} else {
				this.outro += content;
			}
			return this;
		};

		MagicString.prototype.clone = function clone () {
			var cloned = new MagicString(this.original, { filename: this.filename });

			var originalChunk = this.firstChunk;
			var clonedChunk = (cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone());

			while (originalChunk) {
				cloned.byStart[clonedChunk.start] = clonedChunk;
				cloned.byEnd[clonedChunk.end] = clonedChunk;

				var nextOriginalChunk = originalChunk.next;
				var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

				if (nextClonedChunk) {
					clonedChunk.next = nextClonedChunk;
					nextClonedChunk.previous = clonedChunk;

					clonedChunk = nextClonedChunk;
				}

				originalChunk = nextOriginalChunk;
			}

			cloned.lastChunk = clonedChunk;

			if (this.indentExclusionRanges) {
				cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
			}

			Object.keys(this.sourcemapLocations).forEach(function (loc) {
				cloned.sourcemapLocations[loc] = true;
			});

			return cloned;
		};

		MagicString.prototype.generateDecodedMap = function generateDecodedMap (options) {
				var this$1 = this;

			options = options || {};

			var sourceIndex = 0;
			var names = Object.keys(this.storedNames);
			var mappings = new Mappings(options.hires);

			var locate = getLocator$1(this.original);

			if (this.intro) {
				mappings.advance(this.intro);
			}

			this.firstChunk.eachNext(function (chunk) {
				var loc = locate(chunk.start);

				if (chunk.intro.length) { mappings.advance(chunk.intro); }

				if (chunk.edited) {
					mappings.addEdit(
						sourceIndex,
						chunk.content,
						loc,
						chunk.storeName ? names.indexOf(chunk.original) : -1
					);
				} else {
					mappings.addUneditedChunk(sourceIndex, chunk, this$1.original, loc, this$1.sourcemapLocations);
				}

				if (chunk.outro.length) { mappings.advance(chunk.outro); }
			});

			return {
				file: options.file ? options.file.split(/[/\\]/).pop() : null,
				sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
				sourcesContent: options.includeContent ? [this.original] : [null],
				names: names,
				mappings: mappings.raw
			};
		};

		MagicString.prototype.generateMap = function generateMap (options) {
			return new SourceMap(this.generateDecodedMap(options));
		};

		MagicString.prototype.getIndentString = function getIndentString () {
			return this.indentStr === null ? '\t' : this.indentStr;
		};

		MagicString.prototype.indent = function indent (indentStr, options) {
				var this$1 = this;

			var pattern = /^[^\r\n]/gm;

			if (isObject(indentStr)) {
				options = indentStr;
				indentStr = undefined;
			}

			indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';

			if (indentStr === '') { return this; } // noop

			options = options || {};

			// Process exclusion ranges
			var isExcluded = {};

			if (options.exclude) {
				var exclusions =
					typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
				exclusions.forEach(function (exclusion) {
					for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
						isExcluded[i] = true;
					}
				});
			}

			var shouldIndentNextCharacter = options.indentStart !== false;
			var replacer = function (match) {
				if (shouldIndentNextCharacter) { return ("" + indentStr + match); }
				shouldIndentNextCharacter = true;
				return match;
			};

			this.intro = this.intro.replace(pattern, replacer);

			var charIndex = 0;
			var chunk = this.firstChunk;

			while (chunk) {
				var end = chunk.end;

				if (chunk.edited) {
					if (!isExcluded[charIndex]) {
						chunk.content = chunk.content.replace(pattern, replacer);

						if (chunk.content.length) {
							shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
						}
					}
				} else {
					charIndex = chunk.start;

					while (charIndex < end) {
						if (!isExcluded[charIndex]) {
							var char = this$1.original[charIndex];

							if (char === '\n') {
								shouldIndentNextCharacter = true;
							} else if (char !== '\r' && shouldIndentNextCharacter) {
								shouldIndentNextCharacter = false;

								if (charIndex === chunk.start) {
									chunk.prependRight(indentStr);
								} else {
									this$1._splitChunk(chunk, charIndex);
									chunk = chunk.next;
									chunk.prependRight(indentStr);
								}
							}
						}

						charIndex += 1;
					}
				}

				charIndex = chunk.end;
				chunk = chunk.next;
			}

			this.outro = this.outro.replace(pattern, replacer);

			return this;
		};

		MagicString.prototype.insert = function insert () {
			throw new Error('magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)');
		};

		MagicString.prototype.insertLeft = function insertLeft (index, content) {
			if (!warned.insertLeft) {
				console.warn('magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'); // eslint-disable-line no-console
				warned.insertLeft = true;
			}

			return this.appendLeft(index, content);
		};

		MagicString.prototype.insertRight = function insertRight (index, content) {
			if (!warned.insertRight) {
				console.warn('magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'); // eslint-disable-line no-console
				warned.insertRight = true;
			}

			return this.prependRight(index, content);
		};

		MagicString.prototype.move = function move (start, end, index) {
			if (index >= start && index <= end) { throw new Error('Cannot move a selection inside itself'); }

			this._split(start);
			this._split(end);
			this._split(index);

			var first = this.byStart[start];
			var last = this.byEnd[end];

			var oldLeft = first.previous;
			var oldRight = last.next;

			var newRight = this.byStart[index];
			if (!newRight && last === this.lastChunk) { return this; }
			var newLeft = newRight ? newRight.previous : this.lastChunk;

			if (oldLeft) { oldLeft.next = oldRight; }
			if (oldRight) { oldRight.previous = oldLeft; }

			if (newLeft) { newLeft.next = first; }
			if (newRight) { newRight.previous = last; }

			if (!first.previous) { this.firstChunk = last.next; }
			if (!last.next) {
				this.lastChunk = first.previous;
				this.lastChunk.next = null;
			}

			first.previous = newLeft;
			last.next = newRight || null;

			if (!newLeft) { this.firstChunk = first; }
			if (!newRight) { this.lastChunk = last; }
			return this;
		};

		MagicString.prototype.overwrite = function overwrite (start, end, content, options) {
				var this$1 = this;

			if (typeof content !== 'string') { throw new TypeError('replacement content must be a string'); }

			while (start < 0) { start += this$1.original.length; }
			while (end < 0) { end += this$1.original.length; }

			if (end > this.original.length) { throw new Error('end is out of bounds'); }
			if (start === end)
				{ throw new Error('Cannot overwrite a zero-length range – use appendLeft or prependRight instead'); }

			this._split(start);
			this._split(end);

			if (options === true) {
				if (!warned.storeName) {
					console.warn('The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'); // eslint-disable-line no-console
					warned.storeName = true;
				}

				options = { storeName: true };
			}
			var storeName = options !== undefined ? options.storeName : false;
			var contentOnly = options !== undefined ? options.contentOnly : false;

			if (storeName) {
				var original = this.original.slice(start, end);
				this.storedNames[original] = true;
			}

			var first = this.byStart[start];
			var last = this.byEnd[end];

			if (first) {
				if (end > first.end && first.next !== this.byStart[first.end]) {
					throw new Error('Cannot overwrite across a split point');
				}

				first.edit(content, storeName, contentOnly);

				if (first !== last) {
					var chunk = first.next;
					while (chunk !== last) {
						chunk.edit('', false);
						chunk = chunk.next;
					}

					chunk.edit('', false);
				}
			} else {
				// must be inserting at the end
				var newChunk = new Chunk(start, end, '').edit(content, storeName);

				// TODO last chunk in the array may not be the last chunk, if it's moved...
				last.next = newChunk;
				newChunk.previous = last;
			}
			return this;
		};

		MagicString.prototype.prepend = function prepend (content) {
			if (typeof content !== 'string') { throw new TypeError('outro content must be a string'); }

			this.intro = content + this.intro;
			return this;
		};

		MagicString.prototype.prependLeft = function prependLeft (index, content) {
			if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

			this._split(index);

			var chunk = this.byEnd[index];

			if (chunk) {
				chunk.prependLeft(content);
			} else {
				this.intro = content + this.intro;
			}
			return this;
		};

		MagicString.prototype.prependRight = function prependRight (index, content) {
			if (typeof content !== 'string') { throw new TypeError('inserted content must be a string'); }

			this._split(index);

			var chunk = this.byStart[index];

			if (chunk) {
				chunk.prependRight(content);
			} else {
				this.outro = content + this.outro;
			}
			return this;
		};

		MagicString.prototype.remove = function remove (start, end) {
				var this$1 = this;

			while (start < 0) { start += this$1.original.length; }
			while (end < 0) { end += this$1.original.length; }

			if (start === end) { return this; }

			if (start < 0 || end > this.original.length) { throw new Error('Character is out of bounds'); }
			if (start > end) { throw new Error('end must be greater than start'); }

			this._split(start);
			this._split(end);

			var chunk = this.byStart[start];

			while (chunk) {
				chunk.intro = '';
				chunk.outro = '';
				chunk.edit('');

				chunk = end > chunk.end ? this$1.byStart[chunk.end] : null;
			}
			return this;
		};

		MagicString.prototype.lastChar = function lastChar () {
			if (this.outro.length)
				{ return this.outro[this.outro.length - 1]; }
			var chunk = this.lastChunk;
			do {
				if (chunk.outro.length)
					{ return chunk.outro[chunk.outro.length - 1]; }
				if (chunk.content.length)
					{ return chunk.content[chunk.content.length - 1]; }
				if (chunk.intro.length)
					{ return chunk.intro[chunk.intro.length - 1]; }
			} while (chunk = chunk.previous);
			if (this.intro.length)
				{ return this.intro[this.intro.length - 1]; }
			return '';
		};

		MagicString.prototype.lastLine = function lastLine () {
			var lineIndex = this.outro.lastIndexOf(n);
			if (lineIndex !== -1)
				{ return this.outro.substr(lineIndex + 1); }
			var lineStr = this.outro;
			var chunk = this.lastChunk;
			do {
				if (chunk.outro.length > 0) {
					lineIndex = chunk.outro.lastIndexOf(n);
					if (lineIndex !== -1)
						{ return chunk.outro.substr(lineIndex + 1) + lineStr; }
					lineStr = chunk.outro + lineStr;
				}

				if (chunk.content.length > 0) {
					lineIndex = chunk.content.lastIndexOf(n);
					if (lineIndex !== -1)
						{ return chunk.content.substr(lineIndex + 1) + lineStr; }
					lineStr = chunk.content + lineStr;
				}

				if (chunk.intro.length > 0) {
					lineIndex = chunk.intro.lastIndexOf(n);
					if (lineIndex !== -1)
						{ return chunk.intro.substr(lineIndex + 1) + lineStr; }
					lineStr = chunk.intro + lineStr;
				}
			} while (chunk = chunk.previous);
			lineIndex = this.intro.lastIndexOf(n);
			if (lineIndex !== -1)
				{ return this.intro.substr(lineIndex + 1) + lineStr; }
			return this.intro + lineStr;
		};

		MagicString.prototype.slice = function slice (start, end) {
				var this$1 = this;
				if ( start === void 0 ) start = 0;
				if ( end === void 0 ) end = this.original.length;

			while (start < 0) { start += this$1.original.length; }
			while (end < 0) { end += this$1.original.length; }

			var result = '';

			// find start chunk
			var chunk = this.firstChunk;
			while (chunk && (chunk.start > start || chunk.end <= start)) {
				// found end chunk before start
				if (chunk.start < end && chunk.end >= end) {
					return result;
				}

				chunk = chunk.next;
			}

			if (chunk && chunk.edited && chunk.start !== start)
				{ throw new Error(("Cannot use replaced character " + start + " as slice start anchor.")); }

			var startChunk = chunk;
			while (chunk) {
				if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
					result += chunk.intro;
				}

				var containsEnd = chunk.start < end && chunk.end >= end;
				if (containsEnd && chunk.edited && chunk.end !== end)
					{ throw new Error(("Cannot use replaced character " + end + " as slice end anchor.")); }

				var sliceStart = startChunk === chunk ? start - chunk.start : 0;
				var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

				result += chunk.content.slice(sliceStart, sliceEnd);

				if (chunk.outro && (!containsEnd || chunk.end === end)) {
					result += chunk.outro;
				}

				if (containsEnd) {
					break;
				}

				chunk = chunk.next;
			}

			return result;
		};

		// TODO deprecate this? not really very useful
		MagicString.prototype.snip = function snip (start, end) {
			var clone = this.clone();
			clone.remove(0, start);
			clone.remove(end, clone.original.length);

			return clone;
		};

		MagicString.prototype._split = function _split (index) {
				var this$1 = this;

			if (this.byStart[index] || this.byEnd[index]) { return; }

			var chunk = this.lastSearchedChunk;
			var searchForward = index > chunk.end;

			while (chunk) {
				if (chunk.contains(index)) { return this$1._splitChunk(chunk, index); }

				chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
			}
		};

		MagicString.prototype._splitChunk = function _splitChunk (chunk, index) {
			if (chunk.edited && chunk.content.length) {
				// zero-length edited chunks are a special case (overlapping replacements)
				var loc = getLocator$1(this.original)(index);
				throw new Error(
					("Cannot split a chunk that has already been edited (" + (loc.line) + ":" + (loc.column) + " – \"" + (chunk.original) + "\")")
				);
			}

			var newChunk = chunk.split(index);

			this.byEnd[index] = chunk;
			this.byStart[index] = newChunk;
			this.byEnd[newChunk.end] = newChunk;

			if (chunk === this.lastChunk) { this.lastChunk = newChunk; }

			this.lastSearchedChunk = chunk;
			return true;
		};

		MagicString.prototype.toString = function toString () {
			var str = this.intro;

			var chunk = this.firstChunk;
			while (chunk) {
				str += chunk.toString();
				chunk = chunk.next;
			}

			return str + this.outro;
		};

		MagicString.prototype.isEmpty = function isEmpty () {
			var chunk = this.firstChunk;
			do {
				if (chunk.intro.length && chunk.intro.trim() ||
						chunk.content.length && chunk.content.trim() ||
						chunk.outro.length && chunk.outro.trim())
					{ return false; }
			} while (chunk = chunk.next);
			return true;
		};

		MagicString.prototype.length = function length () {
			var chunk = this.firstChunk;
			var length = 0;
			do {
				length += chunk.intro.length + chunk.content.length + chunk.outro.length;
			} while (chunk = chunk.next);
			return length;
		};

		MagicString.prototype.trimLines = function trimLines () {
			return this.trim('[\\r\\n]');
		};

		MagicString.prototype.trim = function trim (charType) {
			return this.trimStart(charType).trimEnd(charType);
		};

		MagicString.prototype.trimEndAborted = function trimEndAborted (charType) {
				var this$1 = this;

			var rx = new RegExp((charType || '\\s') + '+$');

			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) { return true; }

			var chunk = this.lastChunk;

			do {
				var end = chunk.end;
				var aborted = chunk.trimEnd(rx);

				// if chunk was trimmed, we have a new lastChunk
				if (chunk.end !== end) {
					if (this$1.lastChunk === chunk) {
						this$1.lastChunk = chunk.next;
					}

					this$1.byEnd[chunk.end] = chunk;
					this$1.byStart[chunk.next.start] = chunk.next;
					this$1.byEnd[chunk.next.end] = chunk.next;
				}

				if (aborted) { return true; }
				chunk = chunk.previous;
			} while (chunk);

			return false;
		};

		MagicString.prototype.trimEnd = function trimEnd (charType) {
			this.trimEndAborted(charType);
			return this;
		};
		MagicString.prototype.trimStartAborted = function trimStartAborted (charType) {
				var this$1 = this;

			var rx = new RegExp('^' + (charType || '\\s') + '+');

			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) { return true; }

			var chunk = this.firstChunk;

			do {
				var end = chunk.end;
				var aborted = chunk.trimStart(rx);

				if (chunk.end !== end) {
					// special case...
					if (chunk === this$1.lastChunk) { this$1.lastChunk = chunk.next; }

					this$1.byEnd[chunk.end] = chunk;
					this$1.byStart[chunk.next.start] = chunk.next;
					this$1.byEnd[chunk.next.end] = chunk.next;
				}

				if (aborted) { return true; }
				chunk = chunk.next;
			} while (chunk);

			return false;
		};

		MagicString.prototype.trimStart = function trimStart (charType) {
			this.trimStartAborted(charType);
			return this;
		};

		var hasOwnProp = Object.prototype.hasOwnProperty;

		var Bundle = function Bundle(options) {
			if ( options === void 0 ) options = {};

			this.intro = options.intro || '';
			this.separator = options.separator !== undefined ? options.separator : '\n';
			this.sources = [];
			this.uniqueSources = [];
			this.uniqueSourceIndexByFilename = {};
		};

		Bundle.prototype.addSource = function addSource (source) {
			if (source instanceof MagicString) {
				return this.addSource({
					content: source,
					filename: source.filename,
					separator: this.separator
				});
			}

			if (!isObject(source) || !source.content) {
				throw new Error('bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`');
			}

			['filename', 'indentExclusionRanges', 'separator'].forEach(function (option) {
				if (!hasOwnProp.call(source, option)) { source[option] = source.content[option]; }
			});

			if (source.separator === undefined) {
				// TODO there's a bunch of this sort of thing, needs cleaning up
				source.separator = this.separator;
			}

			if (source.filename) {
				if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
					this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
					this.uniqueSources.push({ filename: source.filename, content: source.content.original });
				} else {
					var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
					if (source.content.original !== uniqueSource.content) {
						throw new Error(("Illegal source: same filename (" + (source.filename) + "), different contents"));
					}
				}
			}

			this.sources.push(source);
			return this;
		};

		Bundle.prototype.append = function append (str, options) {
			this.addSource({
				content: new MagicString(str),
				separator: (options && options.separator) || ''
			});

			return this;
		};

		Bundle.prototype.clone = function clone () {
			var bundle = new Bundle({
				intro: this.intro,
				separator: this.separator
			});

			this.sources.forEach(function (source) {
				bundle.addSource({
					filename: source.filename,
					content: source.content.clone(),
					separator: source.separator
				});
			});

			return bundle;
		};

		Bundle.prototype.generateDecodedMap = function generateDecodedMap (options) {
				var this$1 = this;
				if ( options === void 0 ) options = {};

			var names = [];
			this.sources.forEach(function (source) {
				Object.keys(source.content.storedNames).forEach(function (name) {
					if (!~names.indexOf(name)) { names.push(name); }
				});
			});

			var mappings = new Mappings(options.hires);

			if (this.intro) {
				mappings.advance(this.intro);
			}

			this.sources.forEach(function (source, i) {
				if (i > 0) {
					mappings.advance(this$1.separator);
				}

				var sourceIndex = source.filename ? this$1.uniqueSourceIndexByFilename[source.filename] : -1;
				var magicString = source.content;
				var locate = getLocator$1(magicString.original);

				if (magicString.intro) {
					mappings.advance(magicString.intro);
				}

				magicString.firstChunk.eachNext(function (chunk) {
					var loc = locate(chunk.start);

					if (chunk.intro.length) { mappings.advance(chunk.intro); }

					if (source.filename) {
						if (chunk.edited) {
							mappings.addEdit(
								sourceIndex,
								chunk.content,
								loc,
								chunk.storeName ? names.indexOf(chunk.original) : -1
							);
						} else {
							mappings.addUneditedChunk(
								sourceIndex,
								chunk,
								magicString.original,
								loc,
								magicString.sourcemapLocations
							);
						}
					} else {
						mappings.advance(chunk.content);
					}

					if (chunk.outro.length) { mappings.advance(chunk.outro); }
				});

				if (magicString.outro) {
					mappings.advance(magicString.outro);
				}
			});

			return {
				file: options.file ? options.file.split(/[/\\]/).pop() : null,
				sources: this.uniqueSources.map(function (source) {
					return options.file ? getRelativePath(options.file, source.filename) : source.filename;
				}),
				sourcesContent: this.uniqueSources.map(function (source) {
					return options.includeContent ? source.content : null;
				}),
				names: names,
				mappings: mappings.raw
			};
		};

		Bundle.prototype.generateMap = function generateMap (options) {
			return new SourceMap(this.generateDecodedMap(options));
		};

		Bundle.prototype.getIndentString = function getIndentString () {
			var indentStringCounts = {};

			this.sources.forEach(function (source) {
				var indentStr = source.content.indentStr;

				if (indentStr === null) { return; }

				if (!indentStringCounts[indentStr]) { indentStringCounts[indentStr] = 0; }
				indentStringCounts[indentStr] += 1;
			});

			return (
				Object.keys(indentStringCounts).sort(function (a, b) {
					return indentStringCounts[a] - indentStringCounts[b];
				})[0] || '\t'
			);
		};

		Bundle.prototype.indent = function indent (indentStr) {
				var this$1 = this;

			if (!arguments.length) {
				indentStr = this.getIndentString();
			}

			if (indentStr === '') { return this; } // noop

			var trailingNewline = !this.intro || this.intro.slice(-1) === '\n';

			this.sources.forEach(function (source, i) {
				var separator = source.separator !== undefined ? source.separator : this$1.separator;
				var indentStart = trailingNewline || (i > 0 && /\r?\n$/.test(separator));

				source.content.indent(indentStr, {
					exclude: source.indentExclusionRanges,
					indentStart: indentStart //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
				});

				trailingNewline = source.content.lastChar() === '\n';
			});

			if (this.intro) {
				this.intro =
					indentStr +
					this.intro.replace(/^[^\n]/gm, function (match, index) {
						return index > 0 ? indentStr + match : match;
					});
			}

			return this;
		};

		Bundle.prototype.prepend = function prepend (str) {
			this.intro = str + this.intro;
			return this;
		};

		Bundle.prototype.toString = function toString () {
				var this$1 = this;

			var body = this.sources
				.map(function (source, i) {
					var separator = source.separator !== undefined ? source.separator : this$1.separator;
					var str = (i > 0 ? separator : '') + source.content.toString();

					return str;
				})
				.join('');

			return this.intro + body;
		};

		Bundle.prototype.isEmpty = function isEmpty () {
			if (this.intro.length && this.intro.trim())
				{ return false; }
			if (this.sources.some(function (source) { return !source.content.isEmpty(); }))
				{ return false; }
			return true;
		};

		Bundle.prototype.length = function length () {
			return this.sources.reduce(function (length, source) { return length + source.content.length(); }, this.intro.length);
		};

		Bundle.prototype.trimLines = function trimLines () {
			return this.trim('[\\r\\n]');
		};

		Bundle.prototype.trim = function trim (charType) {
			return this.trimStart(charType).trimEnd(charType);
		};

		Bundle.prototype.trimStart = function trimStart (charType) {
				var this$1 = this;

			var rx = new RegExp('^' + (charType || '\\s') + '+');
			this.intro = this.intro.replace(rx, '');

			if (!this.intro) {
				var source;
				var i = 0;

				do {
					source = this$1.sources[i++];
					if (!source) {
						break;
					}
				} while (!source.content.trimStartAborted(charType));
			}

			return this;
		};

		Bundle.prototype.trimEnd = function trimEnd (charType) {
				var this$1 = this;

			var rx = new RegExp((charType || '\\s') + '+$');

			var source;
			var i = this.sources.length - 1;

			do {
				source = this$1.sources[i--];
				if (!source) {
					this$1.intro = this$1.intro.replace(rx, '');
					break;
				}
			} while (!source.content.trimEndAborted(charType));

			return this;
		};

		function isReference(node, parent) {
		    if (node.type === 'MemberExpression') {
		        return !node.computed && isReference(node.object, node);
		    }
		    if (node.type === 'Identifier') {
		        // the only time we could have an identifier node without a parent is
		        // if it's the entire body of a function without a block statement –
		        // i.e. an arrow function expression like `a => a`
		        if (!parent)
		            return true;
		        // TODO is this right?
		        if (parent.type === 'MemberExpression' || parent.type === 'MethodDefinition') {
		            return parent.computed || node === parent.object;
		        }
		        // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
		        if (parent.type === 'Property')
		            return parent.computed || node === parent.value;
		        // disregard the `bar` in `export { foo as bar }`
		        if (parent.type === 'ExportSpecifier' && node !== parent.local)
		            return false;
		        return true;
		    }
		    return false;
		}

		function getMethodName(node) {
		    if (node.type === 'Identifier')
		        return node.name;
		    if (node.type === 'Literal')
		        return String(node.value);
		}

		const keys = {
		    ObjectExpression: 'properties',
		    Program: 'body',
		};
		const offsets = {
		    ObjectExpression: [1, -1],
		    Program: [0, 0],
		};
		function removeNode(code, parent, node) {
		    const key = keys[parent.type];
		    const offset = offsets[parent.type];
		    if (!key || !offset)
		        throw new Error(`not implemented: ${parent.type}`);
		    const list = parent[key];
		    const i = list.indexOf(node);
		    if (i === -1)
		        throw new Error('node not in list');
		    let a;
		    let b;
		    if (list.length === 1) {
		        // remove everything, leave {}
		        a = parent.start + offset[0];
		        b = parent.end + offset[1];
		    }
		    else if (i === 0) {
		        // remove everything before second node, including comments
		        a = parent.start + offset[0];
		        while (/\s/.test(code.original[a]))
		            a += 1;
		        b = list[i].end;
		        while (/[\s,]/.test(code.original[b]))
		            b += 1;
		    }
		    else {
		        // remove the end of the previous node to the end of this one
		        a = list[i - 1].end;
		        b = node.end;
		    }
		    code.remove(a, b);
		    return;
		}

		function nodeToString(node) {
		    if (node.type === 'Literal' && typeof node.value === 'string') {
		        return node.value;
		    }
		    else if (node.type === 'TemplateLiteral'
		        && node.quasis.length === 1
		        && node.expressions.length === 0) {
		        return node.quasis[0].value.raw;
		    }
		}

		function list$1(items, conjunction = 'or') {
		    if (items.length === 1)
		        return items[0];
		    return `${items.slice(0, -1).join(', ')} ${conjunction} ${items[items.length - 1]}`;
		}

		const wrappers$1 = { es, amd, cjs, iife, umd, eval: expr };
		function wrapModule(code, format, name, options, banner, sharedPath, helpers, imports, shorthandImports, source) {
		    if (format === 'es')
		        return es(code, name, options, banner, sharedPath, helpers, imports, shorthandImports, source);
		    const dependencies = imports.map((declaration, i) => {
		        const defaultImport = declaration.specifiers.find((x) => x.type === 'ImportDefaultSpecifier' ||
		            (x.type === 'ImportSpecifier' && x.imported.name === 'default'));
		        const namespaceImport = declaration.specifiers.find((x) => x.type === 'ImportNamespaceSpecifier');
		        const namedImports = declaration.specifiers.filter((x) => x.type === 'ImportSpecifier' && x.imported.name !== 'default');
		        const name = defaultImport || namespaceImport
		            ? (defaultImport || namespaceImport).local.name
		            : `__import${i}`;
		        const statements = [];
		        namedImports.forEach((specifier) => {
		            statements.push(`var ${specifier.local.name} = ${name}.${specifier.imported.name};`);
		        });
		        if (defaultImport) {
		            statements.push(`${name} = (${name} && ${name}.__esModule) ? ${name}["default"] : ${name};`);
		        }
		        return { name, statements, source: declaration.source.value };
		    })
		        .concat(shorthandImports.map(({ name, source }) => ({
		        name,
		        statements: [
		            `${name} = (${name} && ${name}.__esModule) ? ${name}["default"] : ${name};`,
		        ],
		        source,
		    })));
		    if (format === 'amd')
		        return amd(code, name, options, banner, dependencies);
		    if (format === 'cjs')
		        return cjs(code, name, options, banner, sharedPath, helpers, dependencies);
		    if (format === 'iife')
		        return iife(code, name, options, banner, dependencies);
		    if (format === 'umd')
		        return umd(code, name, options, banner, dependencies);
		    if (format === 'eval')
		        return expr(code, name, options, banner, dependencies);
		    throw new Error(`options.format is invalid (must be ${list$1(Object.keys(wrappers$1))})`);
		}
		function es(code, name, options, banner, sharedPath, helpers, imports, shorthandImports, source) {
		    const importHelpers = helpers.length > 0 && (`import { ${helpers.map(h => h.name === h.alias ? h.name : `${h.name} as ${h.alias}`).join(', ')} } from ${JSON.stringify(sharedPath)};`);
		    const importBlock = imports.length > 0 && (imports
		        .map((declaration) => source.slice(declaration.start, declaration.end))
		        .join('\n'));
		    const shorthandImportBlock = shorthandImports.length > 0 && (shorthandImports.map(({ name, source }) => `import ${name} from ${JSON.stringify(source)};`).join('\n'));
		    return deindent `
		${banner}
		${importHelpers}
		${importBlock}
		${shorthandImportBlock}

		${code}
		export default ${name};`;
		}
		function amd(code, name, options, banner, dependencies) {
		    const sourceString = dependencies.length
		        ? `[${dependencies.map(d => `"${removeExtension(d.source)}"`).join(', ')}], `
		        : '';
		    const id = options.amd && options.amd.id;
		    return deindent `
		define(${id ? `"${id}", ` : ''}${sourceString}function(${paramString(dependencies)}) { "use strict";
			${getCompatibilityStatements(dependencies)}

			${code}
			return ${name};
		});`;
		}
		function cjs(code, name, options, banner, sharedPath, helpers, dependencies) {
		    const helperDeclarations = helpers.map(h => `${h.alias === h.name ? h.name : `${h.name}: ${h.alias}`}`).join(', ');
		    const helperBlock = helpers.length > 0 && (`var { ${helperDeclarations} } = require(${JSON.stringify(sharedPath)});\n`);
		    const requireBlock = dependencies.length > 0 && (dependencies
		        .map(d => `var ${d.name} = require("${d.source}");`)
		        .join('\n\n'));
		    return deindent `
		${banner}
		"use strict";

		${helperBlock}
		${requireBlock}
		${getCompatibilityStatements(dependencies)}

		${code}

		module.exports = ${name};`;
		}
		function iife(code, name, options, banner, dependencies) {
		    if (!options.name) {
		        throw new Error(`Missing required 'name' option for IIFE export`);
		    }
		    const globals = getGlobals(dependencies, options);
		    return deindent `
		${banner}
		var ${options.name} = (function(${paramString(dependencies)}) { "use strict";
			${getCompatibilityStatements(dependencies)}

			${code}
			return ${name};
		}(${globals.join(', ')}));`;
		}
		function umd(code, name, options, banner, dependencies) {
		    if (!options.name) {
		        throw new Error(`Missing required 'name' option for UMD export`);
		    }
		    const amdId = options.amd && options.amd.id ? `'${options.amd.id}', ` : '';
		    const amdDeps = dependencies.length
		        ? `[${dependencies.map(d => `"${removeExtension(d.source)}"`).join(', ')}], `
		        : '';
		    const cjsDeps = dependencies
		        .map(d => `require("${d.source}")`)
		        .join(', ');
		    const globals = getGlobals(dependencies, options);
		    return deindent `
		${banner}
		(function(global, factory) {
			typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(${cjsDeps}) :
			typeof define === "function" && define.amd ? define(${amdId}${amdDeps}factory) :
			(global.${options.name} = factory(${globals.join(', ')}));
		}(this, (function (${paramString(dependencies)}) { "use strict";

			${getCompatibilityStatements(dependencies)}

			${code}

			return ${name};

		})));`;
		}
		function expr(code, name, options, banner, dependencies) {
		    const globals = getGlobals(dependencies, options);
		    return deindent `
		(function (${paramString(dependencies)}) { "use strict";
			${banner}

			${getCompatibilityStatements(dependencies)}

			${code}

			return ${name};
		}(${globals.join(', ')}))`;
		}
		function paramString(dependencies) {
		    return dependencies.map(dep => dep.name).join(', ');
		}
		function removeExtension(file) {
		    const index = file.lastIndexOf('.');
		    return ~index ? file.slice(0, index) : file;
		}
		function getCompatibilityStatements(dependencies) {
		    if (!dependencies.length)
		        return null;
		    const statements = [];
		    dependencies.forEach(dependency => {
		        statements.push(...dependency.statements);
		    });
		    return statements.join('\n');
		}
		function getGlobals(dependencies, options) {
		    const { globals, onwarn } = options;
		    const globalFn = getGlobalFn(globals);
		    return dependencies.map(d => {
		        let name = globalFn(d.source);
		        if (!name) {
		            if (d.name.startsWith('__import')) {
		                throw new Error(`Could not determine name for imported module '${d.source}' – use options.globals`);
		            }
		            else {
		                const warning = {
		                    code: `options-missing-globals`,
		                    message: `No name was supplied for imported module '${d.source}'. Guessing '${d.name}', but you should use options.globals`,
		                };
		                onwarn(warning);
		            }
		            name = d.name;
		        }
		        return name;
		    });
		}
		function getGlobalFn(globals) {
		    if (typeof globals === 'function')
		        return globals;
		    if (typeof globals === 'object') {
		        return id => globals[id];
		    }
		    return () => undefined;
		}

		function createScopes(expression) {
		    const map = new WeakMap();
		    const globals = new Set();
		    let scope = new Scope(null, false);
		    walk(expression, {
		        enter(node, parent) {
		            if (/Function/.test(node.type)) {
		                if (node.type === 'FunctionDeclaration') {
		                    scope.declarations.add(node.id.name);
		                }
		                else {
		                    scope = new Scope(scope, false);
		                    map.set(node, scope);
		                    if (node.id)
		                        scope.declarations.add(node.id.name);
		                }
		                node.params.forEach((param) => {
		                    extractNames(param).forEach(name => {
		                        scope.declarations.add(name);
		                    });
		                });
		            }
		            else if (/For(?:In|Of)Statement/.test(node.type)) {
		                scope = new Scope(scope, true);
		                map.set(node, scope);
		            }
		            else if (node.type === 'BlockStatement') {
		                scope = new Scope(scope, true);
		                map.set(node, scope);
		            }
		            else if (/(Function|Class|Variable)Declaration/.test(node.type)) {
		                scope.addDeclaration(node);
		            }
		            else if (isReference(node, parent)) {
		                if (!scope.has(node.name)) {
		                    globals.add(node.name);
		                }
		            }
		        },
		        leave(node) {
		            if (map.has(node)) {
		                scope = scope.parent;
		            }
		        },
		    });
		    return { map, scope, globals };
		}
		// TODO remove this in favour of weakmap version
		function annotateWithScopes(expression) {
		    const globals = new Set();
		    let scope = new Scope(null, false);
		    walk(expression, {
		        enter(node, parent) {
		            if (/Function/.test(node.type)) {
		                if (node.type === 'FunctionDeclaration') {
		                    scope.declarations.add(node.id.name);
		                }
		                else {
		                    node._scope = scope = new Scope(scope, false);
		                    if (node.id)
		                        scope.declarations.add(node.id.name);
		                }
		                node.params.forEach((param) => {
		                    extractNames(param).forEach(name => {
		                        scope.declarations.add(name);
		                    });
		                });
		            }
		            else if (/For(?:In|Of)Statement/.test(node.type)) {
		                node._scope = scope = new Scope(scope, true);
		            }
		            else if (node.type === 'BlockStatement') {
		                node._scope = scope = new Scope(scope, true);
		            }
		            else if (/(Function|Class|Variable)Declaration/.test(node.type)) {
		                scope.addDeclaration(node);
		            }
		            else if (isReference(node, parent)) {
		                if (!scope.has(node.name)) {
		                    globals.add(node.name);
		                }
		            }
		        },
		        leave(node) {
		            if (node._scope) {
		                scope = scope.parent;
		            }
		        },
		    });
		    return { scope, globals };
		}
		class Scope {
		    constructor(parent, block) {
		        this.parent = parent;
		        this.block = block;
		        this.declarations = new Set();
		    }
		    addDeclaration(node) {
		        if (node.kind === 'var' && !this.block && this.parent) {
		            this.parent.addDeclaration(node);
		        }
		        else if (node.type === 'VariableDeclaration') {
		            node.declarations.forEach((declarator) => {
		                extractNames(declarator.id).forEach(name => {
		                    this.declarations.add(name);
		                });
		            });
		        }
		        else {
		            this.declarations.add(node.id.name);
		        }
		    }
		    has(name) {
		        return (this.declarations.has(name) || (this.parent && this.parent.has(name)));
		    }
		}
		function extractNames(param) {
		    const names = [];
		    extractors[param.type](names, param);
		    return names;
		}
		const extractors = {
		    Identifier(names, param) {
		        names.push(param.name);
		    },
		    ObjectPattern(names, param) {
		        param.properties.forEach((prop) => {
		            if (prop.type === 'RestElement') {
		                names.push(prop.argument.name);
		            }
		            else {
		                extractors[prop.value.type](names, prop.value);
		            }
		        });
		    },
		    ArrayPattern(names, param) {
		        param.elements.forEach((element) => {
		            if (element)
		                extractors[element.type](names, element);
		        });
		    },
		    RestElement(names, param) {
		        extractors[param.argument.type](names, param.argument);
		    },
		    AssignmentPattern(names, param) {
		        extractors[param.left.type](names, param.left);
		    },
		};

		const UNKNOWN = {};
		function gatherPossibleValues(node, set) {
		    if (node.type === 'Literal') {
		        set.add(node.value);
		    }
		    else if (node.type === 'ConditionalExpression') {
		        gatherPossibleValues(node.consequent, set);
		        gatherPossibleValues(node.alternate, set);
		    }
		    else {
		        set.add(UNKNOWN);
		    }
		}

		class Selector$1 {
		    constructor(node, stylesheet) {
		        this.node = node;
		        this.stylesheet = stylesheet;
		        this.blocks = groupSelectors(node);
		        // take trailing :global(...) selectors out of consideration
		        let i = this.blocks.length;
		        while (i > 0) {
		            if (!this.blocks[i - 1].global)
		                break;
		            i -= 1;
		        }
		        this.localBlocks = this.blocks.slice(0, i);
		        this.used = this.blocks[0].global;
		    }
		    apply(node, stack) {
		        const toEncapsulate = [];
		        applySelector(this.stylesheet, this.localBlocks.slice(), node, stack.slice(), toEncapsulate);
		        if (toEncapsulate.length > 0) {
		            toEncapsulate.filter((_, i) => i === 0 || i === toEncapsulate.length - 1).forEach(({ node, block }) => {
		                this.stylesheet.nodesWithCssClass.add(node);
		                block.shouldEncapsulate = true;
		            });
		            this.used = true;
		        }
		    }
		    minify(code) {
		        let c = null;
		        this.blocks.forEach((block, i) => {
		            if (i > 0) {
		                if (block.start - c > 1) {
		                    code.overwrite(c, block.start, block.combinator.name || ' ');
		                }
		            }
		            c = block.end;
		        });
		    }
		    transform(code, attr) {
		        function encapsulateBlock(block) {
		            let i = block.selectors.length;
		            while (i--) {
		                const selector = block.selectors[i];
		                if (selector.type === 'PseudoElementSelector' || selector.type === 'PseudoClassSelector')
		                    continue;
		                if (selector.type === 'TypeSelector' && selector.name === '*') {
		                    code.overwrite(selector.start, selector.end, attr);
		                }
		                else {
		                    code.appendLeft(selector.end, attr);
		                }
		                break;
		            }
		            i = block.selectors.length;
		            while (i--) {
		                const selector = block.selectors[i];
		                if (selector.type === 'RefSelector') {
		                    code.overwrite(selector.start, selector.end, `.svelte-ref-${selector.name}`, {
		                        contentOnly: true,
		                        storeName: false
		                    });
		                }
		            }
		        }
		        this.blocks.forEach((block, i) => {
		            if (block.global) {
		                const selector = block.selectors[0];
		                const first = selector.children[0];
		                const last = selector.children[selector.children.length - 1];
		                code.remove(selector.start, first.start).remove(last.end, selector.end);
		            }
		            if (block.shouldEncapsulate)
		                encapsulateBlock(block);
		        });
		    }
		    validate(component) {
		        this.blocks.forEach((block) => {
		            let i = block.selectors.length;
		            while (i-- > 1) {
		                const selector = block.selectors[i];
		                if (selector.type === 'PseudoClassSelector' && selector.name === 'global') {
		                    component.error(selector, {
		                        code: `css-invalid-global`,
		                        message: `:global(...) must be the first element in a compound selector`
		                    });
		                }
		            }
		        });
		        let start = 0;
		        let end = this.blocks.length;
		        for (; start < end; start += 1) {
		            if (!this.blocks[start].global)
		                break;
		        }
		        for (; end > start; end -= 1) {
		            if (!this.blocks[end - 1].global)
		                break;
		        }
		        for (let i = start; i < end; i += 1) {
		            if (this.blocks[i].global) {
		                component.error(this.blocks[i].selectors[0], {
		                    code: `css-invalid-global`,
		                    message: `:global(...) can be at the start or end of a selector sequence, but not in the middle`
		                });
		            }
		        }
		    }
		}
		function applySelector(stylesheet, blocks, node, stack, toEncapsulate) {
		    const block = blocks.pop();
		    if (!block)
		        return false;
		    if (!node) {
		        return blocks.every(block => block.global);
		    }
		    let i = block.selectors.length;
		    while (i--) {
		        const selector = block.selectors[i];
		        if (selector.type === 'PseudoClassSelector' && selector.name === 'global') {
		            // TODO shouldn't see this here... maybe we should enforce that :global(...)
		            // cannot be sandwiched between non-global selectors?
		            return false;
		        }
		        if (selector.type === 'PseudoClassSelector' || selector.type === 'PseudoElementSelector') {
		            continue;
		        }
		        if (selector.type === 'ClassSelector') {
		            if (!attributeMatches(node, 'class', selector.name, '~=', false) && !classMatches(node, selector.name))
		                return false;
		        }
		        else if (selector.type === 'IdSelector') {
		            if (!attributeMatches(node, 'id', selector.name, '=', false))
		                return false;
		        }
		        else if (selector.type === 'AttributeSelector') {
		            if (!attributeMatches(node, selector.name.name, selector.value && unquote(selector.value), selector.matcher, selector.flags))
		                return false;
		        }
		        else if (selector.type === 'TypeSelector') {
		            // remove toLowerCase() in v2, when uppercase elements will be forbidden
		            if (node.name.toLowerCase() !== selector.name.toLowerCase() && selector.name !== '*')
		                return false;
		        }
		        else if (selector.type === 'RefSelector') {
		            if (node.ref && node.ref.name === selector.name) {
		                stylesheet.nodesWithRefCssClass.set(selector.name, node);
		                toEncapsulate.push({ node, block });
		                return true;
		            }
		            return;
		        }
		        else {
		            // bail. TODO figure out what these could be
		            toEncapsulate.push({ node, block });
		            return true;
		        }
		    }
		    if (block.combinator) {
		        if (block.combinator.type === 'WhiteSpace') {
		            while (stack.length) {
		                if (applySelector(stylesheet, blocks.slice(), stack.pop(), stack, toEncapsulate)) {
		                    toEncapsulate.push({ node, block });
		                    return true;
		                }
		            }
		            if (blocks.every(block => block.global)) {
		                toEncapsulate.push({ node, block });
		                return true;
		            }
		            return false;
		        }
		        else if (block.combinator.name === '>') {
		            if (applySelector(stylesheet, blocks, stack.pop(), stack, toEncapsulate)) {
		                toEncapsulate.push({ node, block });
		                return true;
		            }
		            return false;
		        }
		        // TODO other combinators
		        toEncapsulate.push({ node, block });
		        return true;
		    }
		    toEncapsulate.push({ node, block });
		    return true;
		}
		const operators = {
		    '=': (value, flags) => new RegExp(`^${value}$`, flags),
		    '~=': (value, flags) => new RegExp(`\\b${value}\\b`, flags),
		    '|=': (value, flags) => new RegExp(`^${value}(-.+)?$`, flags),
		    '^=': (value, flags) => new RegExp(`^${value}`, flags),
		    '$=': (value, flags) => new RegExp(`${value}$`, flags),
		    '*=': (value, flags) => new RegExp(value, flags)
		};
		function attributeMatches(node, name, expectedValue, operator, caseInsensitive) {
		    const spread = node.attributes.find(attr => attr.type === 'Spread');
		    if (spread)
		        return true;
		    const attr = node.attributes.find((attr) => attr.name === name);
		    if (!attr)
		        return false;
		    if (attr.isTrue)
		        return operator === null;
		    if (attr.chunks.length > 1)
		        return true;
		    if (!expectedValue)
		        return true;
		    const pattern = operators[operator](expectedValue, caseInsensitive ? 'i' : '');
		    const value = attr.chunks[0];
		    if (!value)
		        return false;
		    if (value.type === 'Text')
		        return pattern.test(value.data);
		    const possibleValues = new Set();
		    gatherPossibleValues(value.node, possibleValues);
		    if (possibleValues.has(UNKNOWN))
		        return true;
		    for (const x of Array.from(possibleValues)) { // TypeScript for-of is slightly unlike JS
		        if (pattern.test(x))
		            return true;
		    }
		    return false;
		}
		function classMatches(node, name) {
		    return node.classes.some(function (classDir) {
		        return classDir.name === name;
		    });
		}
		function unquote(value) {
		    if (value.type === 'Identifier')
		        return value.name;
		    const str = value.value;
		    if (str[0] === str[str.length - 1] && str[0] === "'" || str[0] === '"') {
		        return str.slice(1, str.length - 1);
		    }
		    return str;
		}
		class Block$2 {
		    constructor(combinator) {
		        this.combinator = combinator;
		        this.global = false;
		        this.selectors = [];
		        this.start = null;
		        this.end = null;
		        this.shouldEncapsulate = false;
		    }
		    add(selector) {
		        if (this.selectors.length === 0) {
		            this.start = selector.start;
		            this.global = selector.type === 'PseudoClassSelector' && selector.name === 'global';
		        }
		        this.selectors.push(selector);
		        this.end = selector.end;
		    }
		}
		function groupSelectors(selector) {
		    let block = new Block$2(null);
		    const blocks = [block];
		    selector.children.forEach((child, i) => {
		        if (child.type === 'WhiteSpace' || child.type === 'Combinator') {
		            block = new Block$2(child);
		            blocks.push(block);
		        }
		        else {
		            block.add(child);
		        }
		    });
		    return blocks;
		}

		// https://github.com/darkskyapp/string-hash/blob/master/index.js
		function hash$1(str) {
		    let hash = 5381;
		    let i = str.length;
		    while (i--)
		        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
		    return (hash >>> 0).toString(36);
		}

		function removeCSSPrefix (name) {
		    return name.replace(/^-((webkit)|(moz)|(o)|(ms))-/, '');
		}

		const isKeyframesNode = (node) => removeCSSPrefix(node.name) === 'keyframes';
		class Rule$1 {
		    constructor(node, stylesheet, parent) {
		        this.node = node;
		        this.parent = parent;
		        this.selectors = node.selector.children.map((node) => new Selector$1(node, stylesheet));
		        this.declarations = node.block.children.map((node) => new Declaration$1(node));
		    }
		    apply(node, stack) {
		        this.selectors.forEach(selector => selector.apply(node, stack)); // TODO move the logic in here?
		    }
		    isUsed(dev) {
		        if (this.parent && this.parent.node.type === 'Atrule' && isKeyframesNode(this.parent.node))
		            return true;
		        if (this.declarations.length === 0)
		            return dev;
		        return this.selectors.some(s => s.used);
		    }
		    minify(code, dev) {
		        let c = this.node.start;
		        let started = false;
		        this.selectors.forEach((selector, i) => {
		            if (selector.used) {
		                const separator = started ? ',' : '';
		                if ((selector.node.start - c) > separator.length) {
		                    code.overwrite(c, selector.node.start, separator);
		                }
		                selector.minify(code);
		                c = selector.node.end;
		                started = true;
		            }
		        });
		        code.remove(c, this.node.block.start);
		        c = this.node.block.start + 1;
		        this.declarations.forEach((declaration, i) => {
		            const separator = i > 0 ? ';' : '';
		            if ((declaration.node.start - c) > separator.length) {
		                code.overwrite(c, declaration.node.start, separator);
		            }
		            declaration.minify(code);
		            c = declaration.node.end;
		        });
		        code.remove(c, this.node.block.end - 1);
		    }
		    transform(code, id, keyframes) {
		        if (this.parent && this.parent.node.type === 'Atrule' && isKeyframesNode(this.parent.node))
		            return true;
		        const attr = `.${id}`;
		        this.selectors.forEach(selector => selector.transform(code, attr));
		        this.declarations.forEach(declaration => declaration.transform(code, keyframes));
		    }
		    validate(component) {
		        this.selectors.forEach(selector => {
		            selector.validate(component);
		        });
		    }
		    warnOnUnusedSelector(handler) {
		        this.selectors.forEach(selector => {
		            if (!selector.used)
		                handler(selector);
		        });
		    }
		}
		class Declaration$1 {
		    constructor(node) {
		        this.node = node;
		    }
		    transform(code, keyframes) {
		        const property = this.node.property && removeCSSPrefix(this.node.property.toLowerCase());
		        if (property === 'animation' || property === 'animation-name') {
		            this.node.value.children.forEach((block) => {
		                if (block.type === 'Identifier') {
		                    const name = block.name;
		                    if (keyframes.has(name)) {
		                        code.overwrite(block.start, block.end, keyframes.get(name));
		                    }
		                }
		            });
		        }
		    }
		    minify(code) {
		        if (!this.node.property)
		            return; // @apply, and possibly other weird cases?
		        const c = this.node.start + this.node.property.length;
		        const first = this.node.value.children ?
		            this.node.value.children[0] :
		            this.node.value;
		        let start = first.start;
		        while (/\s/.test(code.original[start]))
		            start += 1;
		        if (start - c > 1) {
		            code.overwrite(c, start, ':');
		        }
		    }
		}
		class Atrule$1 {
		    constructor(node) {
		        this.node = node;
		        this.children = [];
		    }
		    apply(node, stack) {
		        if (this.node.name === 'media' || this.node.name === 'supports') {
		            this.children.forEach(child => {
		                child.apply(node, stack);
		            });
		        }
		        else if (isKeyframesNode(this.node)) {
		            this.children.forEach((rule) => {
		                rule.selectors.forEach(selector => {
		                    selector.used = true;
		                });
		            });
		        }
		    }
		    isUsed(dev) {
		        return true; // TODO
		    }
		    minify(code, dev) {
		        if (this.node.name === 'media') {
		            const expressionChar = code.original[this.node.expression.start];
		            let c = this.node.start + (expressionChar === '(' ? 6 : 7);
		            if (this.node.expression.start > c)
		                code.remove(c, this.node.expression.start);
		            this.node.expression.children.forEach((query) => {
		                // TODO minify queries
		                c = query.end;
		            });
		            code.remove(c, this.node.block.start);
		        }
		        else if (isKeyframesNode(this.node)) {
		            let c = this.node.start + this.node.name.length + 1;
		            if (this.node.expression.start - c > 1)
		                code.overwrite(c, this.node.expression.start, ' ');
		            c = this.node.expression.end;
		            if (this.node.block.start - c > 0)
		                code.remove(c, this.node.block.start);
		        }
		        else if (this.node.name === 'supports') {
		            let c = this.node.start + 9;
		            if (this.node.expression.start - c > 1)
		                code.overwrite(c, this.node.expression.start, ' ');
		            this.node.expression.children.forEach((query) => {
		                // TODO minify queries
		                c = query.end;
		            });
		            code.remove(c, this.node.block.start);
		        }
		        // TODO other atrules
		        if (this.node.block) {
		            let c = this.node.block.start + 1;
		            this.children.forEach(child => {
		                if (child.isUsed(dev)) {
		                    code.remove(c, child.node.start);
		                    child.minify(code, dev);
		                    c = child.node.end;
		                }
		            });
		            code.remove(c, this.node.block.end - 1);
		        }
		    }
		    transform(code, id, keyframes) {
		        if (isKeyframesNode(this.node)) {
		            this.node.expression.children.forEach(({ type, name, start, end }) => {
		                if (type === 'Identifier') {
		                    if (name.startsWith('-global-')) {
		                        code.remove(start, start + 8);
		                    }
		                    else {
		                        code.overwrite(start, end, keyframes.get(name));
		                    }
		                }
		            });
		        }
		        this.children.forEach(child => {
		            child.transform(code, id, keyframes);
		        });
		    }
		    validate(component) {
		        this.children.forEach(child => {
		            child.validate(component);
		        });
		    }
		    warnOnUnusedSelector(handler) {
		        if (this.node.name !== 'media')
		            return;
		        this.children.forEach(child => {
		            child.warnOnUnusedSelector(handler);
		        });
		    }
		}
		class Stylesheet {
		    constructor(source, ast, filename, dev) {
		        this.source = source;
		        this.ast = ast;
		        this.filename = filename;
		        this.dev = dev;
		        this.children = [];
		        this.keyframes = new Map();
		        this.nodesWithCssClass = new Set();
		        this.nodesWithRefCssClass = new Map();
		        if (ast.css && ast.css.children.length) {
		            this.id = `svelte-${hash$1(ast.css.content.styles)}`;
		            this.hasStyles = true;
		            const stack = [];
		            let currentAtrule = null;
		            walk(this.ast.css, {
		                enter: (node) => {
		                    if (node.type === 'Atrule') {
		                        const last = stack[stack.length - 1];
		                        const atrule = new Atrule$1(node);
		                        stack.push(atrule);
		                        // this is an awkward special case — @apply (and
		                        // possibly other future constructs)
		                        if (last && !(last instanceof Atrule$1))
		                            return;
		                        if (currentAtrule) {
		                            currentAtrule.children.push(atrule);
		                        }
		                        else {
		                            this.children.push(atrule);
		                        }
		                        if (isKeyframesNode(node)) {
		                            node.expression.children.forEach((expression) => {
		                                if (expression.type === 'Identifier' && !expression.name.startsWith('-global-')) {
		                                    this.keyframes.set(expression.name, `${this.id}-${expression.name}`);
		                                }
		                            });
		                        }
		                        currentAtrule = atrule;
		                    }
		                    if (node.type === 'Rule') {
		                        const rule = new Rule$1(node, this, currentAtrule);
		                        stack.push(rule);
		                        if (currentAtrule) {
		                            currentAtrule.children.push(rule);
		                        }
		                        else {
		                            this.children.push(rule);
		                        }
		                    }
		                },
		                leave: (node) => {
		                    if (node.type === 'Rule' || node.type === 'Atrule')
		                        stack.pop();
		                    if (node.type === 'Atrule')
		                        currentAtrule = stack[stack.length - 1];
		                }
		            });
		        }
		        else {
		            this.hasStyles = false;
		        }
		    }
		    apply(node) {
		        if (!this.hasStyles)
		            return;
		        const stack = [];
		        let parent = node;
		        while (parent = parent.parent) {
		            if (parent.type === 'Element')
		                stack.unshift(parent);
		        }
		        for (let i = 0; i < this.children.length; i += 1) {
		            const child = this.children[i];
		            child.apply(node, stack);
		        }
		    }
		    reify() {
		        this.nodesWithCssClass.forEach((node) => {
		            node.addCssClass();
		        });
		        this.nodesWithRefCssClass.forEach((node, name) => {
		            node.addCssClass(`svelte-ref-${name}`);
		        });
		    }
		    render(cssOutputFilename, shouldTransformSelectors) {
		        if (!this.hasStyles) {
		            return { code: null, map: null };
		        }
		        const code = new MagicString(this.source);
		        walk(this.ast.css, {
		            enter: (node) => {
		                code.addSourcemapLocation(node.start);
		                code.addSourcemapLocation(node.end);
		            }
		        });
		        if (shouldTransformSelectors) {
		            this.children.forEach((child) => {
		                child.transform(code, this.id, this.keyframes);
		            });
		        }
		        let c = 0;
		        this.children.forEach(child => {
		            if (child.isUsed(this.dev)) {
		                code.remove(c, child.node.start);
		                child.minify(code, this.dev);
		                c = child.node.end;
		            }
		        });
		        code.remove(c, this.source.length);
		        return {
		            code: code.toString(),
		            map: code.generateMap({
		                includeContent: true,
		                source: this.filename,
		                file: cssOutputFilename
		            })
		        };
		    }
		    validate(component) {
		        this.children.forEach(child => {
		            child.validate(component);
		        });
		    }
		    warnOnUnusedSelectors(onwarn) {
		        let locator;
		        const handler = (selector) => {
		            const pos = selector.node.start;
		            if (!locator)
		                locator = getLocator(this.source, { offsetLine: 1 });
		            const start = locator(pos);
		            const end = locator(selector.node.end);
		            const frame = getCodeFrame(this.source, start.line - 1, start.column);
		            const message = `Unused CSS selector`;
		            onwarn({
		                code: `css-unused-selector`,
		                message,
		                frame,
		                start,
		                end,
		                pos,
		                filename: this.filename,
		                toString: () => `${message} (${start.line}:${start.column})\n${frame}`,
		            });
		        };
		        this.children.forEach(child => {
		            child.warnOnUnusedSelector(handler);
		        });
		    }
		}

		const test = typeof process !== 'undefined' && process.env.TEST;

		class Node$1 {
		    constructor(component, parent, scope, info) {
		        this.start = info.start;
		        this.end = info.end;
		        this.type = info.type;
		        // this makes properties non-enumerable, which makes logging
		        // bearable. might have a performance cost. TODO remove in prod?
		        Object.defineProperties(this, {
		            component: {
		                value: component
		            },
		            parent: {
		                value: parent
		            }
		        });
		    }
		    cannotUseInnerHTML() {
		        if (this.canUseInnerHTML !== false) {
		            this.canUseInnerHTML = false;
		            if (this.parent)
		                this.parent.cannotUseInnerHTML();
		        }
		    }
		    hasAncestor(type) {
		        return this.parent ?
		            this.parent.type === type || this.parent.hasAncestor(type) :
		            false;
		    }
		    findNearest(selector) {
		        if (selector.test(this.type))
		            return this;
		        if (this.parent)
		            return this.parent.findNearest(selector);
		    }
		    remount(name) {
		        return `${this.var}.m(${name}._slotted.default, null);`;
		    }
		    warnIfEmptyBlock() {
		        if (!this.component.options.dev)
		            return;
		        if (!/Block$/.test(this.type) || !this.children)
		            return;
		        if (this.children.length > 1)
		            return;
		        const child = this.children[0];
		        if (!child || (child.type === 'Text' && !/[^ \r\n\f\v\t]/.test(child.data))) {
		            this.component.warn(this, {
		                code: 'empty-block',
		                message: 'Empty block'
		            });
		        }
		    }
		}

		class PendingBlock extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.children = mapChildren(component, parent, scope, info.children);
		        this.warnIfEmptyBlock();
		    }
		}

		class ThenBlock extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.children = mapChildren(component, parent, scope, info.children);
		        this.warnIfEmptyBlock();
		    }
		}

		class CatchBlock extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.children = mapChildren(component, parent, scope, info.children);
		        this.warnIfEmptyBlock();
		    }
		}

		const binaryOperators = {
		    '**': 15,
		    '*': 14,
		    '/': 14,
		    '%': 14,
		    '+': 13,
		    '-': 13,
		    '<<': 12,
		    '>>': 12,
		    '>>>': 12,
		    '<': 11,
		    '<=': 11,
		    '>': 11,
		    '>=': 11,
		    'in': 11,
		    'instanceof': 11,
		    '==': 10,
		    '!=': 10,
		    '===': 10,
		    '!==': 10,
		    '&': 9,
		    '^': 8,
		    '|': 7
		};
		const logicalOperators = {
		    '&&': 6,
		    '||': 5
		};
		const precedence = {
		    Literal: () => 21,
		    Identifier: () => 21,
		    ParenthesizedExpression: () => 20,
		    MemberExpression: () => 19,
		    NewExpression: () => 19,
		    CallExpression: () => 19,
		    UpdateExpression: () => 17,
		    UnaryExpression: () => 16,
		    BinaryExpression: (node) => binaryOperators[node.operator],
		    LogicalExpression: (node) => logicalOperators[node.operator],
		    ConditionalExpression: () => 4,
		    AssignmentExpression: () => 3,
		    YieldExpression: () => 2,
		    SpreadElement: () => 1,
		    SequenceExpression: () => 0
		};
		class Expression {
		    constructor(component, parent, scope, info) {
		        this.usesContext = false;
		        this.usesEvent = false;
		        // TODO revert to direct property access in prod?
		        Object.defineProperties(this, {
		            component: {
		                value: component
		            }
		        });
		        this.node = info;
		        this.thisReferences = [];
		        this.snippet = `[✂${info.start}-${info.end}✂]`;
		        const dependencies = new Set();
		        const { code, helpers } = component;
		        let { map, scope: currentScope } = createScopes(info);
		        const isEventHandler = parent.type === 'EventHandler';
		        const expression = this;
		        const isSynthetic = parent.isSynthetic;
		        walk(info, {
		            enter(node, parent, key) {
		                // don't manipulate shorthand props twice
		                if (key === 'value' && parent.shorthand)
		                    return;
		                code.addSourcemapLocation(node.start);
		                code.addSourcemapLocation(node.end);
		                if (map.has(node)) {
		                    currentScope = map.get(node);
		                    return;
		                }
		                if (node.type === 'ThisExpression') {
		                    expression.thisReferences.push(node);
		                }
		                if (isReference(node, parent)) {
		                    const { name, nodes } = flattenReference(node);
		                    if (name === 'event' && isEventHandler) {
		                        expression.usesEvent = true;
		                        return;
		                    }
		                    if (currentScope.has(name))
		                        return;
		                    if (component.helpers.has(name)) {
		                        let object = node;
		                        while (object.type === 'MemberExpression')
		                            object = object.object;
		                        component.used.helpers.add(name);
		                        const alias = component.templateVars.get(`helpers-${name}`);
		                        if (alias !== name)
		                            code.overwrite(object.start, object.end, alias);
		                        return;
		                    }
		                    expression.usesContext = true;
		                    if (!isSynthetic) {
		                        // <option> value attribute could be synthetic — avoid double editing
		                        code.prependRight(node.start, key === 'key' && parent.shorthand
		                            ? `${name}: ctx.`
		                            : 'ctx.');
		                    }
		                    if (scope.names.has(name)) {
		                        scope.dependenciesForName.get(name).forEach(dependency => {
		                            dependencies.add(dependency);
		                        });
		                    }
		                    else {
		                        dependencies.add(name);
		                        component.expectedProperties.add(name);
		                    }
		                    if (node.type === 'MemberExpression') {
		                        nodes.forEach(node => {
		                            code.addSourcemapLocation(node.start);
		                            code.addSourcemapLocation(node.end);
		                        });
		                    }
		                    this.skip();
		                }
		            },
		            leave(node, parent) {
		                if (map.has(node))
		                    currentScope = currentScope.parent;
		            }
		        });
		        this.dependencies = dependencies;
		    }
		    getPrecedence() {
		        return this.node.type in precedence ? precedence[this.node.type](this.node) : 0;
		    }
		    overwriteThis(name) {
		        this.thisReferences.forEach(ref => {
		            this.component.code.overwrite(ref.start, ref.end, name, {
		                storeName: true
		            });
		        });
		    }
		}

		class AwaitBlock$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.expression = new Expression(component, this, scope, info.expression);
		        const deps = this.expression.dependencies;
		        this.value = info.value;
		        this.error = info.error;
		        this.pending = new PendingBlock(component, this, scope, info.pending);
		        this.then = new ThenBlock(component, this, scope.add(this.value, deps), info.then);
		        this.catch = new CatchBlock(component, this, scope.add(this.error, deps), info.catch);
		    }
		}

		class Comment$2 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.data = info.data;
		    }
		}

		const validCalleeObjects = new Set(['this', 'event', 'console']);

		const validBuiltins = new Set(['set', 'fire', 'destroy']);
		class EventHandler extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.name = info.name;
		        this.modifiers = new Set(info.modifiers);
		        component.used.events.add(this.name);
		        this.dependencies = new Set();
		        if (info.expression) {
		            this.validateExpression(info.expression);
		            this.callee = flattenReference(info.expression.callee);
		            this.insertionPoint = info.expression.start;
		            this.usesComponent = !validCalleeObjects.has(this.callee.name);
		            this.usesContext = false;
		            this.usesEventObject = this.callee.name === 'event';
		            this.args = info.expression.arguments.map(param => {
		                const expression = new Expression(component, this, scope, param);
		                addToSet(this.dependencies, expression.dependencies);
		                if (expression.usesContext)
		                    this.usesContext = true;
		                if (expression.usesEvent)
		                    this.usesEventObject = true;
		                return expression;
		            });
		            this.snippet = `[✂${info.expression.start}-${info.expression.end}✂];`;
		        }
		        else {
		            this.callee = null;
		            this.insertionPoint = null;
		            this.args = null;
		            this.usesComponent = true;
		            this.usesContext = false;
		            this.usesEventObject = true;
		            this.snippet = null; // TODO handle shorthand events here?
		        }
		        this.isCustomEvent = component.events.has(this.name);
		        this.shouldHoist = !this.isCustomEvent && parent.hasAncestor('EachBlock');
		    }
		    render(component, block, context, hoisted) {
		        if (this.insertionPoint === null)
		            return; // TODO handle shorthand events here?
		        if (!validCalleeObjects.has(this.callee.name)) {
		            const component_name = hoisted ? `component` : block.alias(`component`);
		            // allow event.stopPropagation(), this.select() etc
		            // TODO verify that it's a valid callee (i.e. built-in or declared method)
		            if (this.callee.name[0] === '$' && !component.methods.has(this.callee.name)) {
		                component.code.overwrite(this.insertionPoint, this.insertionPoint + 1, `${component_name}.store.`);
		            }
		            else {
		                component.code.prependRight(this.insertionPoint, `${component_name}.`);
		            }
		        }
		        if (this.isCustomEvent) {
		            this.args.forEach(arg => {
		                arg.overwriteThis(context);
		            });
		            if (this.callee && this.callee.name === 'this') {
		                const node = this.callee.nodes[0];
		                component.code.overwrite(node.start, node.end, context, {
		                    storeName: true,
		                    contentOnly: true
		                });
		            }
		        }
		    }
		    validateExpression(expression) {
		        const { callee, type } = expression;
		        if (type !== 'CallExpression') {
		            this.component.error(expression, {
		                code: `invalid-event-handler`,
		                message: `Expected a call expression`
		            });
		        }
		        const { component } = this;
		        const { name } = flattenReference(callee);
		        if (validCalleeObjects.has(name) || name === 'options')
		            return;
		        if (name === 'refs') {
		            this.component.refCallees.push(callee);
		            return;
		        }
		        if ((callee.type === 'Identifier' && validBuiltins.has(name)) ||
		            this.component.methods.has(name)) {
		            return;
		        }
		        if (name[0] === '$') {
		            // assume it's a store method
		            return;
		        }
		        const validCallees = ['this.*', 'refs.*', 'event.*', 'options.*', 'console.*'].concat(Array.from(validBuiltins), Array.from(this.component.methods.keys()));
		        let message = `'${component.source.slice(callee.start, callee.end)}' is an invalid callee `;
		        if (name === 'store') {
		            message += `(did you mean '$${component.source.slice(callee.start + 6, callee.end)}(...)'?)`;
		        }
		        else {
		            message += `(should be one of ${list$1(validCallees)})`;
		            if (callee.type === 'Identifier' && component.helpers.has(callee.name)) {
		                message += `. '${callee.name}' exists on 'helpers', did you put it in the wrong place?`;
		            }
		        }
		        component.warn(expression, {
		            code: `invalid-callee`,
		            message
		        });
		    }
		}

		class Document extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.handlers = [];
		        info.attributes.forEach(node => {
		            if (node.type === 'EventHandler') {
		                this.handlers.push(new EventHandler(component, this, scope, node));
		            }
		        });
		    }
		}

		class ElseBlock extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.children = mapChildren(component, this, scope, info.children);
		        this.warnIfEmptyBlock();
		    }
		}

		function unpackDestructuring(contexts, node, tail) {
		    if (!node)
		        return;
		    if (node.type === 'Identifier') {
		        contexts.push({
		            key: node,
		            tail
		        });
		    }
		    else if (node.type === 'ArrayPattern') {
		        node.elements.forEach((element, i) => {
		            unpackDestructuring(contexts, element, `${tail}[${i}]`);
		        });
		    }
		    else if (node.type === 'ObjectPattern') {
		        node.properties.forEach((property) => {
		            unpackDestructuring(contexts, property.value, `${tail}.${property.key.name}`);
		        });
		    }
		}

		class EachBlock$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.expression = new Expression(component, this, scope, info.expression);
		        this.context = info.context.name || 'each'; // TODO this is used to facilitate binding; currently fails with destructuring
		        this.index = info.index;
		        this.scope = scope.child();
		        this.contexts = [];
		        unpackDestructuring(this.contexts, info.context, '');
		        this.contexts.forEach(context => {
		            if (component.helpers.has(context.key.name)) {
		                component.warn(context.key, {
		                    code: `each-context-clash`,
		                    message: `Context clashes with a helper. Rename one or the other to eliminate any ambiguity`
		                });
		            }
		            this.scope.add(context.key.name, this.expression.dependencies);
		        });
		        this.key = info.key
		            ? new Expression(component, this, this.scope, info.key)
		            : null;
		        if (this.index) {
		            // index can only change if this is a keyed each block
		            const dependencies = this.key ? this.expression.dependencies : [];
		            this.scope.add(this.index, dependencies);
		        }
		        this.hasAnimation = false;
		        this.children = mapChildren(component, this, this.scope, info.children);
		        if (this.hasAnimation) {
		            if (this.children.length !== 1) {
		                const child = this.children.find(child => !!child.animation);
		                component.error(child.animation, {
		                    code: `invalid-animation`,
		                    message: `An element that use the animate directive must be the sole child of a keyed each block`
		                });
		            }
		        }
		        this.warnIfEmptyBlock(); // TODO would be better if EachBlock, IfBlock etc extended an abstract Block class
		        this.else = info.else
		            ? new ElseBlock(component, this, this.scope, info.else)
		            : null;
		    }
		}

		class Attribute$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        if (info.type === 'Spread') {
		            this.name = null;
		            this.isSpread = true;
		            this.isTrue = false;
		            this.isSynthetic = false;
		            this.expression = new Expression(component, this, scope, info.expression);
		            this.dependencies = this.expression.dependencies;
		            this.chunks = null;
		            this.isDynamic = true; // TODO not necessarily
		            this.shouldCache = false; // TODO does this mean anything here?
		        }
		        else {
		            this.name = info.name;
		            this.isTrue = info.value === true;
		            this.isSynthetic = info.synthetic;
		            this.dependencies = new Set();
		            this.chunks = this.isTrue
		                ? []
		                : info.value.map(node => {
		                    if (node.type === 'Text')
		                        return node;
		                    const expression = new Expression(component, this, scope, node.expression);
		                    addToSet(this.dependencies, expression.dependencies);
		                    return expression;
		                });
		            this.isDynamic = this.dependencies.size > 0;
		            this.shouldCache = this.isDynamic
		                ? this.chunks.length === 1
		                    ? this.chunks[0].node.type !== 'Identifier' || scope.names.has(this.chunks[0].node.name)
		                    : true
		                : false;
		        }
		    }
		    getValue() {
		        if (this.isTrue)
		            return true;
		        if (this.chunks.length === 0)
		            return `""`;
		        if (this.chunks.length === 1) {
		            return this.chunks[0].type === 'Text'
		                ? stringify(this.chunks[0].data)
		                : this.chunks[0].snippet;
		        }
		        return (this.chunks[0].type === 'Text' ? '' : `"" + `) +
		            this.chunks
		                .map(chunk => {
		                if (chunk.type === 'Text') {
		                    return stringify(chunk.data);
		                }
		                else {
		                    return chunk.getPrecedence() <= 13 ? `(${chunk.snippet})` : chunk.snippet;
		                }
		            })
		                .join(' + ');
		    }
		    getStaticValue() {
		        if (this.isSpread || this.isDynamic)
		            return null;
		        return this.isTrue
		            ? true
		            : this.chunks[0]
		                ? this.chunks[0].data
		                : '';
		    }
		}

		class Binding extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.name = info.name;
		        this.value = new Expression(component, this, scope, info.value);
		        let obj;
		        let prop;
		        const { name } = getObject(this.value.node);
		        this.isContextual = scope.names.has(name);
		        if (this.value.node.type === 'MemberExpression') {
		            prop = `[✂${this.value.node.property.start}-${this.value.node.property.end}✂]`;
		            if (!this.value.node.computed)
		                prop = `'${prop}'`;
		            obj = `[✂${this.value.node.object.start}-${this.value.node.object.end}✂]`;
		            this.usesContext = true;
		        }
		        else {
		            obj = 'ctx';
		            prop = `'${name}'`;
		            this.usesContext = scope.names.has(name);
		        }
		        this.obj = obj;
		        this.prop = prop;
		    }
		}

		class Transition extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        if (!component.transitions.has(info.name)) {
		            component.error(info, {
		                code: `missing-transition`,
		                message: `Missing transition '${info.name}'`
		            });
		        }
		        this.name = info.name;
		        this.directive = info.intro && info.outro ? 'transition' : info.intro ? 'in' : 'out';
		        if ((info.intro && parent.intro) || (info.outro && parent.outro)) {
		            const parentTransition = (parent.intro || parent.outro);
		            const message = this.directive === parentTransition.directive
		                ? `An element can only have one '${this.directive}' directive`
		                : `An element cannot have both ${describe(parentTransition)} directive and ${describe(this)} directive`;
		            component.error(info, {
		                code: `duplicate-transition`,
		                message
		            });
		        }
		        this.component.used.transitions.add(this.name);
		        this.expression = info.expression
		            ? new Expression(component, this, scope, info.expression)
		            : null;
		    }
		}
		function describe(transition) {
		    return transition.directive === 'transition'
		        ? `a 'transition'`
		        : `an '${transition.directive}'`;
		}

		class Animation extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.name = info.name;
		        component.used.animations.add(this.name);
		        if (parent.animation) {
		            component.error(this, {
		                code: `duplicate-animation`,
		                message: `An element can only have one 'animate' directive`
		            });
		        }
		        if (!component.animations.has(this.name)) {
		            component.error(this, {
		                code: `missing-animation`,
		                message: `Missing animation '${this.name}'`
		            });
		        }
		        const block = parent.parent;
		        if (!block || block.type !== 'EachBlock' || !block.key) {
		            // TODO can we relax the 'immediate child' rule?
		            component.error(this, {
		                code: `invalid-animation`,
		                message: `An element that use the animate directive must be the immediate child of a keyed each block`
		            });
		        }
		        block.hasAnimation = true;
		        this.expression = info.expression
		            ? new Expression(component, this, scope, info.expression)
		            : null;
		    }
		}

		class Action extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.name = info.name;
		        component.used.actions.add(this.name);
		        if (!component.actions.has(this.name)) {
		            component.error(this, {
		                code: `missing-action`,
		                message: `Missing action '${this.name}'`
		            });
		        }
		        this.expression = info.expression
		            ? new Expression(component, this, scope, info.expression)
		            : null;
		    }
		}

		class Class extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.name = info.name;
		        this.expression = info.expression
		            ? new Expression(component, this, scope, info.expression)
		            : null;
		    }
		}

		class Text$2 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.data = info.data;
		    }
		}

		// adapted from https://github.com/Glench/fuzzyset.js/blob/master/lib/fuzzyset.js
		// BSD Licensed
		const GRAM_SIZE_LOWER = 2;
		const GRAM_SIZE_UPPER = 3;
		// return an edit distance from 0 to 1
		function _distance(str1, str2) {
		    if (str1 === null && str2 === null)
		        throw 'Trying to compare two null values';
		    if (str1 === null || str2 === null)
		        return 0;
		    str1 = String(str1);
		    str2 = String(str2);
		    const distance = levenshtein(str1, str2);
		    if (str1.length > str2.length) {
		        return 1 - distance / str1.length;
		    }
		    else {
		        return 1 - distance / str2.length;
		    }
		}
		// helper functions
		function levenshtein(str1, str2) {
		    const current = [];
		    let prev;
		    let value;
		    for (let i = 0; i <= str2.length; i++) {
		        for (let j = 0; j <= str1.length; j++) {
		            if (i && j) {
		                if (str1.charAt(j - 1) === str2.charAt(i - 1)) {
		                    value = prev;
		                }
		                else {
		                    value = Math.min(current[j], current[j - 1], prev) + 1;
		                }
		            }
		            else {
		                value = i + j;
		            }
		            prev = current[j];
		            current[j] = value;
		        }
		    }
		    return current.pop();
		}
		const _nonWordRe = /[^\w, ]+/;
		function _iterateGrams(value, gramSize) {
		    gramSize = gramSize || 2;
		    const simplified = '-' + value.toLowerCase().replace(_nonWordRe, '') + '-';
		    const lenDiff = gramSize - simplified.length;
		    const results = [];
		    if (lenDiff > 0) {
		        for (let i = 0; i < lenDiff; ++i) {
		            value += '-';
		        }
		    }
		    for (let i = 0; i < simplified.length - gramSize + 1; ++i) {
		        results.push(simplified.slice(i, i + gramSize));
		    }
		    return results;
		}
		function _gramCounter(value, gramSize) {
		    // return an object where key=gram, value=number of occurrences
		    gramSize = gramSize || 2;
		    const result = {};
		    const grams = _iterateGrams(value, gramSize);
		    let i = 0;
		    for (i; i < grams.length; ++i) {
		        if (grams[i] in result) {
		            result[grams[i]] += 1;
		        }
		        else {
		            result[grams[i]] = 1;
		        }
		    }
		    return result;
		}
		function sortDescending(a, b) {
		    return b[0] - a[0];
		}
		class FuzzySet {
		    constructor(arr) {
		        // define all the object functions and attributes
		        this.exactSet = {};
		        this.matchDict = {};
		        this.items = {};
		        // initialization
		        for (let i = GRAM_SIZE_LOWER; i < GRAM_SIZE_UPPER + 1; ++i) {
		            this.items[i] = [];
		        }
		        // add all the items to the set
		        for (let i = 0; i < arr.length; ++i) {
		            this.add(arr[i]);
		        }
		    }
		    add(value) {
		        const normalizedValue = value.toLowerCase();
		        if (normalizedValue in this.exactSet) {
		            return false;
		        }
		        let i = GRAM_SIZE_LOWER;
		        for (i; i < GRAM_SIZE_UPPER + 1; ++i) {
		            this._add(value, i);
		        }
		    }
		    _add(value, gramSize) {
		        const normalizedValue = value.toLowerCase();
		        const items = this.items[gramSize] || [];
		        const index = items.length;
		        items.push(0);
		        const gramCounts = _gramCounter(normalizedValue, gramSize);
		        let sumOfSquareGramCounts = 0;
		        let gram;
		        let gramCount;
		        for (gram in gramCounts) {
		            gramCount = gramCounts[gram];
		            sumOfSquareGramCounts += Math.pow(gramCount, 2);
		            if (gram in this.matchDict) {
		                this.matchDict[gram].push([index, gramCount]);
		            }
		            else {
		                this.matchDict[gram] = [[index, gramCount]];
		            }
		        }
		        const vectorNormal = Math.sqrt(sumOfSquareGramCounts);
		        items[index] = [vectorNormal, normalizedValue];
		        this.items[gramSize] = items;
		        this.exactSet[normalizedValue] = value;
		    }
		    ;
		    get(value) {
		        const normalizedValue = value.toLowerCase();
		        const result = this.exactSet[normalizedValue];
		        if (result) {
		            return [[1, result]];
		        }
		        let results = [];
		        // start with high gram size and if there are no results, go to lower gram sizes
		        for (let gramSize = GRAM_SIZE_UPPER; gramSize >= GRAM_SIZE_LOWER; --gramSize) {
		            results = this.__get(value, gramSize);
		            if (results) {
		                return results;
		            }
		        }
		        return null;
		    }
		    __get(value, gramSize) {
		        const normalizedValue = value.toLowerCase();
		        const matches = {};
		        const gramCounts = _gramCounter(normalizedValue, gramSize);
		        const items = this.items[gramSize];
		        let sumOfSquareGramCounts = 0;
		        let gram;
		        let gramCount;
		        let i;
		        let index;
		        let otherGramCount;
		        for (gram in gramCounts) {
		            gramCount = gramCounts[gram];
		            sumOfSquareGramCounts += Math.pow(gramCount, 2);
		            if (gram in this.matchDict) {
		                for (i = 0; i < this.matchDict[gram].length; ++i) {
		                    index = this.matchDict[gram][i][0];
		                    otherGramCount = this.matchDict[gram][i][1];
		                    if (index in matches) {
		                        matches[index] += gramCount * otherGramCount;
		                    }
		                    else {
		                        matches[index] = gramCount * otherGramCount;
		                    }
		                }
		            }
		        }
		        const vectorNormal = Math.sqrt(sumOfSquareGramCounts);
		        let results = [];
		        let matchScore;
		        // build a results list of [score, str]
		        for (const matchIndex in matches) {
		            matchScore = matches[matchIndex];
		            results.push([
		                matchScore / (vectorNormal * items[matchIndex][0]),
		                items[matchIndex][1],
		            ]);
		        }
		        results.sort(sortDescending);
		        let newResults = [];
		        const endIndex = Math.min(50, results.length);
		        // truncate somewhat arbitrarily to 50
		        for (let i = 0; i < endIndex; ++i) {
		            newResults.push([
		                _distance(results[i][1], normalizedValue),
		                results[i][1],
		            ]);
		        }
		        results = newResults;
		        results.sort(sortDescending);
		        newResults = [];
		        for (let i = 0; i < results.length; ++i) {
		            if (results[i][0] == results[0][0]) {
		                newResults.push([results[i][0], this.exactSet[results[i][1]]]);
		            }
		        }
		        return newResults;
		    }
		    ;
		}

		function fuzzymatch(name, names) {
		    const set = new FuzzySet(names);
		    const matches = set.get(name);
		    return matches && matches[0] && matches[0][0] > 0.7 ? matches[0][1] : null;
		}

		class Ref extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        if (parent.ref) {
		            component.error({
		                code: 'duplicate-refs',
		                message: `Duplicate refs`
		            });
		        }
		        if (!isValidIdentifier(info.name)) {
		            const suggestion = info.name.replace(/[^_$a-z0-9]/ig, '_').replace(/^\d/, '_$&');
		            component.error(info, {
		                code: `invalid-reference-name`,
		                message: `Reference name '${info.name}' is invalid — must be a valid identifier such as ${suggestion}`
		            });
		        }
		        else {
		            component.refs.add(info.name);
		        }
		        this.name = info.name;
		    }
		}

		const svg$1 = /^(?:altGlyph|altGlyphDef|altGlyphItem|animate|animateColor|animateMotion|animateTransform|circle|clipPath|color-profile|cursor|defs|desc|discard|ellipse|feBlend|feColorMatrix|feComponentTransfer|feComposite|feConvolveMatrix|feDiffuseLighting|feDisplacementMap|feDistantLight|feDropShadow|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feImage|feMerge|feMergeNode|feMorphology|feOffset|fePointLight|feSpecularLighting|feSpotLight|feTile|feTurbulence|filter|font|font-face|font-face-format|font-face-name|font-face-src|font-face-uri|foreignObject|g|glyph|glyphRef|hatch|hatchpath|hkern|image|line|linearGradient|marker|mask|mesh|meshgradient|meshpatch|meshrow|metadata|missing-glyph|mpath|path|pattern|polygon|polyline|radialGradient|rect|set|solidcolor|stop|switch|symbol|text|textPath|tref|tspan|unknown|use|view|vkern)$/;
		const ariaAttributes = 'activedescendant atomic autocomplete busy checked controls current describedby details disabled dropeffect errormessage expanded flowto grabbed haspopup hidden invalid keyshortcuts label labelledby level live modal multiline multiselectable orientation owns placeholder posinset pressed readonly relevant required roledescription selected setsize sort valuemax valuemin valuenow valuetext'.split(' ');
		const ariaAttributeSet = new Set(ariaAttributes);
		const ariaRoles = 'alert alertdialog application article banner button cell checkbox columnheader combobox command complementary composite contentinfo definition dialog directory document feed figure form grid gridcell group heading img input landmark link list listbox listitem log main marquee math menu menubar menuitem menuitemcheckbox menuitemradio navigation none note option presentation progressbar radio radiogroup range region roletype row rowgroup rowheader scrollbar search searchbox section sectionhead select separator slider spinbutton status structure switch tab table tablist tabpanel term textbox timer toolbar tooltip tree treegrid treeitem widget window'.split(' ');
		const ariaRoleSet = new Set(ariaRoles);
		const a11yRequiredAttributes = {
		    a: ['href'],
		    area: ['alt', 'aria-label', 'aria-labelledby'],
		    // html-has-lang
		    html: ['lang'],
		    // iframe-has-title
		    iframe: ['title'],
		    img: ['alt'],
		    object: ['title', 'aria-label', 'aria-labelledby']
		};
		const a11yDistractingElements = new Set([
		    'blink',
		    'marquee'
		]);
		const a11yRequiredContent = new Set([
		    // anchor-has-content
		    'a',
		    // heading-has-content
		    'h1',
		    'h2',
		    'h3',
		    'h4',
		    'h5',
		    'h6'
		]);
		const invisibleElements = new Set(['meta', 'html', 'script', 'style']);
		const validModifiers = new Set([
		    'preventDefault',
		    'stopPropagation',
		    'capture',
		    'once',
		    'passive'
		]);
		const passiveEvents = new Set([
		    'wheel',
		    'touchstart',
		    'touchmove',
		    'touchend',
		    'touchcancel'
		]);
		class Element$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.name = info.name;
		        this.scope = scope;
		        const parentElement = parent.findNearest(/^Element/);
		        this.namespace = this.name === 'svg' ?
		            svg :
		            parentElement ? parentElement.namespace : this.component.namespace;
		        if (!this.namespace && svg$1.test(this.name)) {
		            this.component.warn(this, {
		                code: `missing-namespace`,
		                message: `<${this.name}> is an SVG element – did you forget to add { namespace: 'svg' } ?`
		            });
		        }
		        this.attributes = [];
		        this.actions = [];
		        this.bindings = [];
		        this.classes = [];
		        this.handlers = [];
		        this.intro = null;
		        this.outro = null;
		        this.animation = null;
		        if (this.name === 'textarea') {
		            if (info.children.length > 0) {
		                const valueAttribute = info.attributes.find(node => node.name === 'value');
		                if (valueAttribute) {
		                    component.error(valueAttribute, {
		                        code: `textarea-duplicate-value`,
		                        message: `A <textarea> can have either a value attribute or (equivalently) child content, but not both`
		                    });
		                }
		                // this is an egregious hack, but it's the easiest way to get <textarea>
		                // children treated the same way as a value attribute
		                info.attributes.push({
		                    type: 'Attribute',
		                    name: 'value',
		                    value: info.children
		                });
		                info.children = [];
		            }
		        }
		        if (this.name === 'option') {
		            // Special case — treat these the same way:
		            //   <option>{foo}</option>
		            //   <option value={foo}>{foo}</option>
		            const valueAttribute = info.attributes.find((attribute) => attribute.name === 'value');
		            if (!valueAttribute) {
		                info.attributes.push({
		                    type: 'Attribute',
		                    name: 'value',
		                    value: info.children,
		                    synthetic: true
		                });
		            }
		        }
		        info.attributes.forEach(node => {
		            switch (node.type) {
		                case 'Action':
		                    this.actions.push(new Action(component, this, scope, node));
		                    break;
		                case 'Attribute':
		                case 'Spread':
		                    // special case
		                    if (node.name === 'xmlns')
		                        this.namespace = node.value[0].data;
		                    this.attributes.push(new Attribute$1(component, this, scope, node));
		                    break;
		                case 'Binding':
		                    this.bindings.push(new Binding(component, this, scope, node));
		                    break;
		                case 'Class':
		                    this.classes.push(new Class(component, this, scope, node));
		                    break;
		                case 'EventHandler':
		                    this.handlers.push(new EventHandler(component, this, scope, node));
		                    break;
		                case 'Transition':
		                    const transition = new Transition(component, this, scope, node);
		                    if (node.intro)
		                        this.intro = transition;
		                    if (node.outro)
		                        this.outro = transition;
		                    break;
		                case 'Animation':
		                    this.animation = new Animation(component, this, scope, node);
		                    break;
		                case 'Ref':
		                    this.ref = new Ref(component, this, scope, node);
		                    break;
		                default:
		                    throw new Error(`Not implemented: ${node.type}`);
		            }
		        });
		        this.children = mapChildren(component, this, scope, info.children);
		        this.validate();
		        component.stylesheet.apply(this);
		    }
		    validate() {
		        if (a11yDistractingElements.has(this.name)) {
		            // no-distracting-elements
		            this.component.warn(this, {
		                code: `a11y-distracting-elements`,
		                message: `A11y: Avoid <${this.name}> elements`
		            });
		        }
		        if (this.name === 'figcaption') {
		            if (this.parent.name !== 'figure') {
		                this.component.warn(this, {
		                    code: `a11y-structure`,
		                    message: `A11y: <figcaption> must be an immediate child of <figure>`
		                });
		            }
		        }
		        if (this.name === 'figure') {
		            const children = this.children.filter(node => {
		                if (node.type === 'Comment')
		                    return false;
		                if (node.type === 'Text')
		                    return /\S/.test(node.data);
		                return true;
		            });
		            const index = children.findIndex(child => child.name === 'figcaption');
		            if (index !== -1 && (index !== 0 && index !== children.length - 1)) {
		                this.component.warn(children[index], {
		                    code: `a11y-structure`,
		                    message: `A11y: <figcaption> must be first or last child of <figure>`
		                });
		            }
		        }
		        this.validateAttributes();
		        this.validateBindings();
		        this.validateContent();
		        this.validateEventHandlers();
		    }
		    validateAttributes() {
		        const { component } = this;
		        const attributeMap = new Map();
		        this.attributes.forEach(attribute => {
		            if (attribute.isSpread)
		                return;
		            const name = attribute.name.toLowerCase();
		            // aria-props
		            if (name.startsWith('aria-')) {
		                if (invisibleElements.has(this.name)) {
		                    // aria-unsupported-elements
		                    component.warn(attribute, {
		                        code: `a11y-aria-attributes`,
		                        message: `A11y: <${this.name}> should not have aria-* attributes`
		                    });
		                }
		                const type = name.slice(5);
		                if (!ariaAttributeSet.has(type)) {
		                    const match = fuzzymatch(type, ariaAttributes);
		                    let message = `A11y: Unknown aria attribute 'aria-${type}'`;
		                    if (match)
		                        message += ` (did you mean '${match}'?)`;
		                    component.warn(attribute, {
		                        code: `a11y-unknown-aria-attribute`,
		                        message
		                    });
		                }
		                if (name === 'aria-hidden' && /^h[1-6]$/.test(this.name)) {
		                    component.warn(attribute, {
		                        code: `a11y-hidden`,
		                        message: `A11y: <${this.name}> element should not be hidden`
		                    });
		                }
		            }
		            // aria-role
		            if (name === 'role') {
		                if (invisibleElements.has(this.name)) {
		                    // aria-unsupported-elements
		                    component.warn(attribute, {
		                        code: `a11y-misplaced-role`,
		                        message: `A11y: <${this.name}> should not have role attribute`
		                    });
		                }
		                const value = attribute.getStaticValue();
		                if (value && !ariaRoleSet.has(value)) {
		                    const match = fuzzymatch(value, ariaRoles);
		                    let message = `A11y: Unknown role '${value}'`;
		                    if (match)
		                        message += ` (did you mean '${match}'?)`;
		                    component.warn(attribute, {
		                        code: `a11y-unknown-role`,
		                        message
		                    });
		                }
		            }
		            // no-access-key
		            if (name === 'accesskey') {
		                component.warn(attribute, {
		                    code: `a11y-accesskey`,
		                    message: `A11y: Avoid using accesskey`
		                });
		            }
		            // no-autofocus
		            if (name === 'autofocus') {
		                component.warn(attribute, {
		                    code: `a11y-autofocus`,
		                    message: `A11y: Avoid using autofocus`
		                });
		            }
		            // scope
		            if (name === 'scope' && this.name !== 'th') {
		                component.warn(attribute, {
		                    code: `a11y-misplaced-scope`,
		                    message: `A11y: The scope attribute should only be used with <th> elements`
		                });
		            }
		            // tabindex-no-positive
		            if (name === 'tabindex') {
		                const value = attribute.getStaticValue();
		                if (!isNaN(value) && +value > 0) {
		                    component.warn(attribute, {
		                        code: `a11y-positive-tabindex`,
		                        message: `A11y: avoid tabindex values above zero`
		                    });
		                }
		            }
		            if (name === 'slot') {
		                if (attribute.isDynamic) {
		                    component.error(attribute, {
		                        code: `invalid-slot-attribute`,
		                        message: `slot attribute cannot have a dynamic value`
		                    });
		                }
		                let ancestor = this.parent;
		                do {
		                    if (ancestor.type === 'InlineComponent')
		                        break;
		                    if (ancestor.type === 'Element' && /-/.test(ancestor.name))
		                        break;
		                    if (ancestor.type === 'IfBlock' || ancestor.type === 'EachBlock') {
		                        const type = ancestor.type === 'IfBlock' ? 'if' : 'each';
		                        const message = `Cannot place slotted elements inside an ${type}-block`;
		                        component.error(attribute, {
		                            code: `invalid-slotted-content`,
		                            message
		                        });
		                    }
		                } while (ancestor = ancestor.parent);
		                if (!ancestor) {
		                    component.error(attribute, {
		                        code: `invalid-slotted-content`,
		                        message: `Element with a slot='...' attribute must be a descendant of a component or custom element`
		                    });
		                }
		            }
		            attributeMap.set(attribute.name, attribute);
		        });
		        // handle special cases
		        if (this.name === 'a') {
		            const attribute = attributeMap.get('href') || attributeMap.get('xlink:href');
		            if (attribute) {
		                const value = attribute.getStaticValue();
		                if (value === '' || value === '#') {
		                    component.warn(attribute, {
		                        code: `a11y-invalid-attribute`,
		                        message: `A11y: '${value}' is not a valid ${attribute.name} attribute`
		                    });
		                }
		            }
		            else {
		                component.warn(this, {
		                    code: `a11y-missing-attribute`,
		                    message: `A11y: <a> element should have an href attribute`
		                });
		            }
		        }
		        else {
		            const requiredAttributes = a11yRequiredAttributes[this.name];
		            if (requiredAttributes) {
		                const hasAttribute = requiredAttributes.some(name => attributeMap.has(name));
		                if (!hasAttribute) {
		                    shouldHaveAttribute(this, requiredAttributes);
		                }
		            }
		            if (this.name === 'input') {
		                const type = attributeMap.get('type');
		                if (type && type.getStaticValue() === 'image') {
		                    shouldHaveAttribute(this, ['alt', 'aria-label', 'aria-labelledby'], 'input type="image"');
		                }
		            }
		        }
		    }
		    validateBindings() {
		        const { component } = this;
		        const checkTypeAttribute = () => {
		            const attribute = this.attributes.find((attribute) => attribute.name === 'type');
		            if (!attribute)
		                return null;
		            if (attribute.isDynamic) {
		                component.error(attribute, {
		                    code: `invalid-type`,
		                    message: `'type' attribute cannot be dynamic if input uses two-way binding`
		                });
		            }
		            const value = attribute.getStaticValue();
		            if (value === true) {
		                component.error(attribute, {
		                    code: `missing-type`,
		                    message: `'type' attribute must be specified`
		                });
		            }
		            return value;
		        };
		        this.bindings.forEach(binding => {
		            const { name } = binding;
		            if (name === 'value') {
		                if (this.name !== 'input' &&
		                    this.name !== 'textarea' &&
		                    this.name !== 'select') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'value' is not a valid binding on <${this.name}> elements`
		                    });
		                }
		                if (this.name === 'select') {
		                    const attribute = this.attributes.find((attribute) => attribute.name === 'multiple');
		                    if (attribute && attribute.isDynamic) {
		                        component.error(attribute, {
		                            code: `dynamic-multiple-attribute`,
		                            message: `'multiple' attribute cannot be dynamic if select uses two-way binding`
		                        });
		                    }
		                }
		                else {
		                    checkTypeAttribute();
		                }
		            }
		            else if (name === 'checked' || name === 'indeterminate') {
		                if (this.name !== 'input') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'${name}' is not a valid binding on <${this.name}> elements`
		                    });
		                }
		                if (checkTypeAttribute() !== 'checkbox') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'${name}' binding can only be used with <input type="checkbox">`
		                    });
		                }
		            }
		            else if (name === 'group') {
		                if (this.name !== 'input') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'group' is not a valid binding on <${this.name}> elements`
		                    });
		                }
		                const type = checkTypeAttribute();
		                if (type !== 'checkbox' && type !== 'radio') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'checked' binding can only be used with <input type="checkbox"> or <input type="radio">`
		                    });
		                }
		            }
		            else if (name == 'files') {
		                if (this.name !== 'input') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'files' binding acn only be used with <input type="file">`
		                    });
		                }
		                const type = checkTypeAttribute();
		                if (type !== 'file') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'files' binding can only be used with <input type="file">`
		                    });
		                }
		            }
		            else if (name === 'currentTime' ||
		                name === 'duration' ||
		                name === 'paused' ||
		                name === 'buffered' ||
		                name === 'seekable' ||
		                name === 'played' ||
		                name === 'volume') {
		                if (this.name !== 'audio' && this.name !== 'video') {
		                    component.error(binding, {
		                        code: `invalid-binding`,
		                        message: `'${name}' binding can only be used with <audio> or <video>`
		                    });
		                }
		            }
		            else if (dimensions.test(name)) {
		                if (this.name === 'svg' && (name === 'offsetWidth' || name === 'offsetHeight')) {
		                    component.error(binding, {
		                        code: 'invalid-binding',
		                        message: `'${binding.name}' is not a valid binding on <svg>. Use '${name.replace('offset', 'client')}' instead`
		                    });
		                }
		                else if (svg$1.test(this.name)) {
		                    component.error(binding, {
		                        code: 'invalid-binding',
		                        message: `'${binding.name}' is not a valid binding on SVG elements`
		                    });
		                }
		                else if (isVoidElementName(this.name)) {
		                    component.error(binding, {
		                        code: 'invalid-binding',
		                        message: `'${binding.name}' is not a valid binding on void elements like <${this.name}>. Use a wrapper element instead`
		                    });
		                }
		            }
		            else {
		                component.error(binding, {
		                    code: `invalid-binding`,
		                    message: `'${binding.name}' is not a valid binding`
		                });
		            }
		        });
		    }
		    validateContent() {
		        if (!a11yRequiredContent.has(this.name))
		            return;
		        if (this.children.length === 0) {
		            this.component.warn(this, {
		                code: `a11y-missing-content`,
		                message: `A11y: <${this.name}> element should have child content`
		            });
		        }
		    }
		    validateEventHandlers() {
		        const { component } = this;
		        this.handlers.forEach(handler => {
		            if (handler.modifiers.has('passive') && handler.modifiers.has('preventDefault')) {
		                component.error(handler, {
		                    code: 'invalid-event-modifier',
		                    message: `The 'passive' and 'preventDefault' modifiers cannot be used together`
		                });
		            }
		            handler.modifiers.forEach(modifier => {
		                if (!validModifiers.has(modifier)) {
		                    component.error(handler, {
		                        code: 'invalid-event-modifier',
		                        message: `Valid event modifiers are ${list$1([...validModifiers])}`
		                    });
		                }
		                if (modifier === 'passive') {
		                    if (passiveEvents.has(handler.name)) {
		                        if (!handler.usesEventObject) {
		                            component.warn(handler, {
		                                code: 'redundant-event-modifier',
		                                message: `Touch event handlers that don't use the 'event' object are passive by default`
		                            });
		                        }
		                    }
		                    else {
		                        component.warn(handler, {
		                            code: 'redundant-event-modifier',
		                            message: `The passive modifier only works with wheel and touch events`
		                        });
		                    }
		                }
		                if (component.options.legacy && (modifier === 'once' || modifier === 'passive')) {
		                    // TODO this could be supported, but it would need a few changes to
		                    // how event listeners work
		                    component.error(handler, {
		                        code: 'invalid-event-modifier',
		                        message: `The '${modifier}' modifier cannot be used in legacy mode`
		                    });
		                }
		            });
		            if (passiveEvents.has(handler.name) && !handler.usesEventObject && !handler.modifiers.has('preventDefault')) {
		                // touch/wheel events should be passive by default
		                handler.modifiers.add('passive');
		            }
		        });
		    }
		    getStaticAttributeValue(name) {
		        const attribute = this.attributes.find((attr) => attr.type === 'Attribute' && attr.name.toLowerCase() === name);
		        if (!attribute)
		            return null;
		        if (attribute.isTrue)
		            return true;
		        if (attribute.chunks.length === 0)
		            return '';
		        if (attribute.chunks.length === 1 && attribute.chunks[0].type === 'Text') {
		            return attribute.chunks[0].data;
		        }
		        return null;
		    }
		    isMediaNode() {
		        return this.name === 'audio' || this.name === 'video';
		    }
		    remount(name) {
		        const slot = this.attributes.find(attribute => attribute.name === 'slot');
		        if (slot) {
		            const prop = quotePropIfNecessary(slot.chunks[0].data);
		            return `@append(${name}._slotted${prop}, ${this.var});`;
		        }
		        return `@append(${name}._slotted.default, ${this.var});`;
		    }
		    addCssClass(className = this.component.stylesheet.id) {
		        const classAttribute = this.attributes.find(a => a.name === 'class');
		        if (classAttribute && !classAttribute.isTrue) {
		            if (classAttribute.chunks.length === 1 && classAttribute.chunks[0].type === 'Text') {
		                classAttribute.chunks[0].data += ` ${className}`;
		            }
		            else {
		                classAttribute.chunks.push(new Text$2(this.component, this, this.scope, {
		                    type: 'Text',
		                    data: ` ${className}`
		                }));
		            }
		        }
		        else {
		            this.attributes.push(new Attribute$1(this.component, this, this.scope, {
		                type: 'Attribute',
		                name: 'class',
		                value: [{ type: 'Text', data: className }]
		            }));
		        }
		    }
		}
		function shouldHaveAttribute(node, attributes, name = node.name) {
		    const article = /^[aeiou]/.test(attributes[0]) ? 'an' : 'a';
		    const sequence = attributes.length > 1 ?
		        attributes.slice(0, -1).join(', ') + ` or ${attributes[attributes.length - 1]}` :
		        attributes[0];
		    node.component.warn(node, {
		        code: `a11y-missing-attribute`,
		        message: `A11y: <${name}> element should have ${article} ${sequence} attribute`
		    });
		}

		class Head$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        if (info.attributes.length) {
		            component.error(info.attributes[0], {
		                code: `invalid-attribute`,
		                message: `<svelte:head> should not have any attributes or directives`
		            });
		        }
		        this.children = mapChildren(component, parent, scope, info.children.filter(child => {
		            return (child.type !== 'Text' || /\S/.test(child.data));
		        }));
		    }
		}

		class IfBlock$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.expression = new Expression(component, this, scope, info.expression);
		        this.children = mapChildren(component, this, scope, info.children);
		        this.else = info.else
		            ? new ElseBlock(component, this, scope, info.else)
		            : null;
		        this.warnIfEmptyBlock();
		    }
		}

		class InlineComponent$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        component.hasComponents = true;
		        this.name = info.name;
		        if (this.name !== 'svelte:self' && this.name !== 'svelte:component') {
		            if (!component.components.has(this.name)) {
		                component.error(this, {
		                    code: `missing-component`,
		                    message: `${this.name} component is not defined`
		                });
		            }
		            component.used.components.add(this.name);
		        }
		        this.expression = this.name === 'svelte:component'
		            ? new Expression(component, this, scope, info.expression)
		            : null;
		        this.attributes = [];
		        this.bindings = [];
		        this.handlers = [];
		        info.attributes.forEach(node => {
		            switch (node.type) {
		                case 'Action':
		                    component.error(node, {
		                        code: `invalid-action`,
		                        message: `Actions can only be applied to DOM elements, not components`
		                    });
		                case 'Attribute':
		                case 'Spread':
		                    this.attributes.push(new Attribute$1(component, this, scope, node));
		                    break;
		                case 'Binding':
		                    this.bindings.push(new Binding(component, this, scope, node));
		                    break;
		                case 'Class':
		                    component.error(node, {
		                        code: `invalid-class`,
		                        message: `Classes can only be applied to DOM elements, not components`
		                    });
		                case 'EventHandler':
		                    this.handlers.push(new EventHandler(component, this, scope, node));
		                    break;
		                case 'Ref':
		                    this.ref = new Ref(component, this, scope, node);
		                    break;
		                case 'Transition':
		                    component.error(node, {
		                        code: `invalid-transition`,
		                        message: `Transitions can only be applied to DOM elements, not components`
		                    });
		                default:
		                    throw new Error(`Not implemented: ${node.type}`);
		            }
		        });
		        this.children = mapChildren(component, this, scope, info.children);
		    }
		}

		class Tag$2 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.expression = new Expression(component, this, scope, info.expression);
		        this.shouldCache = (info.expression.type !== 'Identifier' ||
		            (this.expression.dependencies.size && scope.names.has(info.expression.name)));
		    }
		}

		class MustacheTag extends Tag$2 {
		}

		class RawMustacheTag extends Tag$2 {
		}

		class DebugTag$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.expressions = info.identifiers.map(node => {
		            return new Expression(component, parent, scope, node);
		        });
		    }
		}

		class Slot$1 extends Element$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        info.attributes.forEach(attr => {
		            if (attr.type !== 'Attribute') {
		                component.error(attr, {
		                    code: `invalid-slot-directive`,
		                    message: `<slot> cannot have directives`
		                });
		            }
		            if (attr.name !== 'name') {
		                component.error(attr, {
		                    code: `invalid-slot-attribute`,
		                    message: `"name" is the only attribute permitted on <slot> elements`
		                });
		            }
		            if (attr.value.length !== 1 || attr.value[0].type !== 'Text') {
		                component.error(attr, {
		                    code: `dynamic-slot-name`,
		                    message: `<slot> name cannot be dynamic`
		                });
		            }
		            const slotName = attr.value[0].data;
		            if (slotName === 'default') {
		                component.error(attr, {
		                    code: `invalid-slot-name`,
		                    message: `default is a reserved word — it cannot be used as a slot name`
		                });
		            }
		            // TODO should duplicate slots be disallowed? Feels like it's more likely to be a
		            // bug than anything. Perhaps it should be a warning
		            // if (validator.slots.has(slotName)) {
		            // 	validator.error(`duplicate '${slotName}' <slot> element`, nameAttribute.start);
		            // }
		            // validator.slots.add(slotName);
		        });
		        // if (node.attributes.length === 0) && validator.slots.has('default')) {
		        // 	validator.error(node, {
		        // 		code: `duplicate-slot`,
		        // 		message: `duplicate default <slot> element`
		        // 	});
		        // }
		    }
		    getStaticAttributeValue(name) {
		        const attribute = this.attributes.find(attr => attr.name.toLowerCase() === name);
		        if (!attribute)
		            return null;
		        if (attribute.isTrue)
		            return true;
		        if (attribute.chunks.length === 0)
		            return '';
		        if (attribute.chunks.length === 1 && attribute.chunks[0].type === 'Text') {
		            return attribute.chunks[0].data;
		        }
		        return null;
		    }
		}

		class Title$1 extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.children = mapChildren(component, parent, scope, info.children);
		        if (info.attributes.length > 0) {
		            component.error(info.attributes[0], {
		                code: `illegal-attribute`,
		                message: `<title> cannot have attributes`
		            });
		        }
		        info.children.forEach(child => {
		            if (child.type !== 'Text' && child.type !== 'MustacheTag') {
		                component.error(child, {
		                    code: 'illegal-structure',
		                    message: `<title> can only contain text and {tags}`
		                });
		            }
		        });
		        this.shouldCache = info.children.length === 1
		            ? (info.children[0].type !== 'Identifier' ||
		                scope.names.has(info.children[0].name))
		            : true;
		    }
		}

		const validBindings = [
		    'innerWidth',
		    'innerHeight',
		    'outerWidth',
		    'outerHeight',
		    'scrollX',
		    'scrollY',
		    'online'
		];
		class Window extends Node$1 {
		    constructor(component, parent, scope, info) {
		        super(component, parent, scope, info);
		        this.handlers = [];
		        this.bindings = [];
		        info.attributes.forEach(node => {
		            if (node.type === 'EventHandler') {
		                this.handlers.push(new EventHandler(component, this, scope, node));
		            }
		            else if (node.type === 'Binding') {
		                if (node.value.type !== 'Identifier') {
		                    const { parts } = flattenReference(node.value);
		                    component.error(node.value, {
		                        code: `invalid-binding`,
		                        message: `Bindings on <svelte:window> must be to top-level properties, e.g. '${parts[parts.length - 1]}' rather than '${parts.join('.')}'`
		                    });
		                }
		                if (!~validBindings.indexOf(node.name)) {
		                    const match = node.name === 'width'
		                        ? 'innerWidth'
		                        : node.name === 'height'
		                            ? 'innerHeight'
		                            : fuzzymatch(node.name, validBindings);
		                    const message = `'${node.name}' is not a valid binding on <svelte:window>`;
		                    if (match) {
		                        component.error(node, {
		                            code: `invalid-binding`,
		                            message: `${message} (did you mean '${match}'?)`
		                        });
		                    }
		                    else {
		                        component.error(node, {
		                            code: `invalid-binding`,
		                            message: `${message} — valid bindings are ${list$1(validBindings)}`
		                        });
		                    }
		                }
		                this.bindings.push(new Binding(component, this, scope, node));
		            }
		        });
		    }
		}

		function getConstructor(type) {
		    switch (type) {
		        case 'AwaitBlock': return AwaitBlock$1;
		        case 'Comment': return Comment$2;
		        case 'Document': return Document;
		        case 'EachBlock': return EachBlock$1;
		        case 'Element': return Element$1;
		        case 'Head': return Head$1;
		        case 'IfBlock': return IfBlock$1;
		        case 'InlineComponent': return InlineComponent$1;
		        case 'MustacheTag': return MustacheTag;
		        case 'RawMustacheTag': return RawMustacheTag;
		        case 'DebugTag': return DebugTag$1;
		        case 'Slot': return Slot$1;
		        case 'Text': return Text$2;
		        case 'Title': return Title$1;
		        case 'Window': return Window;
		        default: throw new Error(`Not implemented: ${type}`);
		    }
		}
		function mapChildren(component, parent, scope, children) {
		    let last = null;
		    return children.map(child => {
		        const constructor = getConstructor(child.type);
		        const node = new constructor(component, parent, scope, child);
		        if (last)
		            last.next = node;
		        node.prev = last;
		        last = node;
		        return node;
		    });
		}

		class TemplateScope {
		    constructor(parent) {
		        this.names = new Set(parent ? parent.names : []);
		        this.dependenciesForName = new Map(parent ? parent.dependenciesForName : []);
		    }
		    add(name, dependencies) {
		        this.names.add(name);
		        this.dependenciesForName.set(name, dependencies);
		        return this;
		    }
		    child() {
		        return new TemplateScope(this);
		    }
		}

		class Fragment extends Node$1 {
		    constructor(component, info) {
		        const scope = new TemplateScope();
		        super(component, null, scope, info);
		        this.scope = scope;
		        this.children = mapChildren(component, this, scope, info.children);
		    }
		}

		// this file is auto-generated, do not edit it
		const shared = {
		    "wrapAnimation": "function wrapAnimation(node, from, fn, params) {\n\tif (!from) return;\n\n\tconst to = node.getBoundingClientRect();\n\tif (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) return;\n\n\tconst info = fn(node, { from, to }, params);\n\n\tconst duration = 'duration' in info ? info.duration : 300;\n\tconst delay = 'delay' in info ? info.delay : 0;\n\tconst ease = info.easing || linear;\n\tconst start = window.performance.now() + delay;\n\tconst end = start + duration;\n\n\tconst program = {\n\t\ta: 0,\n\t\tt: 0,\n\t\tb: 1,\n\t\tdelta: 1,\n\t\tduration,\n\t\tstart,\n\t\tend\n\t};\n\n\tconst cssText = node.style.cssText;\n\n\tconst animation = {\n\t\tpending: delay ? program : null,\n\t\tprogram: delay ? null : program,\n\t\trunning: true,\n\n\t\tstart() {\n\t\t\tif (info.css) {\n\t\t\t\tif (delay) node.style.cssText = cssText;\n\n\t\t\t\tconst rule = generateRule(program, ease, info.css);\n\t\t\t\tprogram.name = `__svelte_${hash(rule)}`;\n\n\t\t\t\ttransitionManager.addRule(rule, program.name);\n\n\t\t\t\tnode.style.animation = (node.style.animation || '')\n\t\t\t\t\t.split(', ')\n\t\t\t\t\t.filter(anim => anim && (program.delta < 0 || !/__svelte/.test(anim)))\n\t\t\t\t\t.concat(`${program.name} ${program.duration}ms linear 1 forwards`)\n\t\t\t\t\t.join(', ');\n\t\t\t}\n\n\t\t\tanimation.program = program;\n\t\t\tanimation.pending = null;\n\t\t},\n\n\t\tupdate: now => {\n\t\t\tconst p = now - program.start;\n\t\t\tconst t = program.a + program.delta * ease(p / program.duration);\n\t\t\tif (info.tick) info.tick(t, 1 - t);\n\t\t},\n\n\t\tdone() {\n\t\t\tif (info.tick) info.tick(1, 0);\n\t\t\tanimation.stop();\n\t\t},\n\n\t\tstop() {\n\t\t\tif (info.css) transitionManager.deleteRule(node, program.name);\n\t\t\tanimation.running = false;\n\t\t}\n\t};\n\n\ttransitionManager.add(animation);\n\n\tif (info.tick) info.tick(0, 1);\n\n\tif (delay) {\n\t\tif (info.css) node.style.cssText += info.css(0, 1);\n\t} else {\n\t\tanimation.start();\n\t}\n\n\treturn animation;\n}",
		    "fixPosition": "function fixPosition(node) {\n\tconst style = getComputedStyle(node);\n\n\tif (style.position !== 'absolute' && style.position !== 'fixed') {\n\t\tconst { width, height } = style;\n\t\tconst a = node.getBoundingClientRect();\n\t\tnode.style.position = 'absolute';\n\t\tnode.style.width = width;\n\t\tnode.style.height = height;\n\t\tconst b = node.getBoundingClientRect();\n\n\t\tif (a.left !== b.left || a.top !== b.top) {\n\t\t\tconst style = getComputedStyle(node);\n\t\t\tconst transform = style.transform === 'none' ? '' : style.transform;\n\n\t\t\tnode.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;\n\t\t}\n\t}\n}",
		    "handlePromise": "function handlePromise(promise, info) {\n\tvar token = info.token = {};\n\n\tfunction update(type, index, key, value) {\n\t\tif (info.token !== token) return;\n\n\t\tinfo.resolved = key && { [key]: value };\n\n\t\tconst child_ctx = assign(assign({}, info.ctx), info.resolved);\n\t\tconst block = type && (info.current = type)(info.component, child_ctx);\n\n\t\tif (info.block) {\n\t\t\tif (info.blocks) {\n\t\t\t\tinfo.blocks.forEach((block, i) => {\n\t\t\t\t\tif (i !== index && block) {\n\t\t\t\t\t\tgroupOutros();\n\t\t\t\t\t\tblock.o(() => {\n\t\t\t\t\t\t\tblock.d(1);\n\t\t\t\t\t\t\tinfo.blocks[i] = null;\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\tinfo.block.d(1);\n\t\t\t}\n\n\t\t\tblock.c();\n\t\t\tblock[block.i ? 'i' : 'm'](info.mount(), info.anchor);\n\n\t\t\tinfo.component.root.set({}); // flush any handlers that were created\n\t\t}\n\n\t\tinfo.block = block;\n\t\tif (info.blocks) info.blocks[index] = block;\n\t}\n\n\tif (isPromise(promise)) {\n\t\tpromise.then(value => {\n\t\t\tupdate(info.then, 1, info.value, value);\n\t\t}, error => {\n\t\t\tupdate(info.catch, 2, info.error, error);\n\t\t});\n\n\t\t// if we previously had a then/catch block, destroy it\n\t\tif (info.current !== info.pending) {\n\t\t\tupdate(info.pending, 0);\n\t\t\treturn true;\n\t\t}\n\t} else {\n\t\tif (info.current !== info.then) {\n\t\t\tupdate(info.then, 1, info.value, promise);\n\t\t\treturn true;\n\t\t}\n\n\t\tinfo.resolved = { [info.value]: promise };\n\t}\n}",
		    "append": "function append(target, node) {\n\ttarget.appendChild(node);\n}",
		    "insert": "function insert(target, node, anchor) {\n\ttarget.insertBefore(node, anchor);\n}",
		    "detachNode": "function detachNode(node) {\n\tnode.parentNode.removeChild(node);\n}",
		    "detachBetween": "function detachBetween(before, after) {\n\twhile (before.nextSibling && before.nextSibling !== after) {\n\t\tbefore.parentNode.removeChild(before.nextSibling);\n\t}\n}",
		    "detachBefore": "function detachBefore(after) {\n\twhile (after.previousSibling) {\n\t\tafter.parentNode.removeChild(after.previousSibling);\n\t}\n}",
		    "detachAfter": "function detachAfter(before) {\n\twhile (before.nextSibling) {\n\t\tbefore.parentNode.removeChild(before.nextSibling);\n\t}\n}",
		    "reinsertBetween": "function reinsertBetween(before, after, target) {\n\twhile (before.nextSibling && before.nextSibling !== after) {\n\t\ttarget.appendChild(before.parentNode.removeChild(before.nextSibling));\n\t}\n}",
		    "reinsertChildren": "function reinsertChildren(parent, target) {\n\twhile (parent.firstChild) target.appendChild(parent.firstChild);\n}",
		    "reinsertAfter": "function reinsertAfter(before, target) {\n\twhile (before.nextSibling) target.appendChild(before.nextSibling);\n}",
		    "reinsertBefore": "function reinsertBefore(after, target) {\n\tvar parent = after.parentNode;\n\twhile (parent.firstChild !== after) target.appendChild(parent.firstChild);\n}",
		    "destroyEach": "function destroyEach(iterations, detach) {\n\tfor (var i = 0; i < iterations.length; i += 1) {\n\t\tif (iterations[i]) iterations[i].d(detach);\n\t}\n}",
		    "createFragment": "function createFragment() {\n\treturn document.createDocumentFragment();\n}",
		    "createElement": "function createElement(name) {\n\treturn document.createElement(name);\n}",
		    "createSvgElement": "function createSvgElement(name) {\n\treturn document.createElementNS('http://www.w3.org/2000/svg', name);\n}",
		    "createText": "function createText(data) {\n\treturn document.createTextNode(data);\n}",
		    "createComment": "function createComment() {\n\treturn document.createComment('');\n}",
		    "addListener": "function addListener(node, event, handler, options) {\n\tnode.addEventListener(event, handler, options);\n}",
		    "removeListener": "function removeListener(node, event, handler, options) {\n\tnode.removeEventListener(event, handler, options);\n}",
		    "setAttribute": "function setAttribute(node, attribute, value) {\n\tif (value == null) node.removeAttribute(attribute);\n\telse node.setAttribute(attribute, value);\n}",
		    "setAttributes": "function setAttributes(node, attributes) {\n\tfor (var key in attributes) {\n\t\tif (key === 'style') {\n\t\t\tnode.style.cssText = attributes[key];\n\t\t} else if (key in node) {\n\t\t\tnode[key] = attributes[key];\n\t\t} else {\n\t\t\tsetAttribute(node, key, attributes[key]);\n\t\t}\n\t}\n}",
		    "setCustomElementData": "function setCustomElementData(node, prop, value) {\n\tif (prop in node) {\n\t\tnode[prop] = value;\n\t} else if (value) {\n\t\tsetAttribute(node, prop, value);\n\t} else {\n\t\tnode.removeAttribute(prop);\n\t}\n}",
		    "setXlinkAttribute": "function setXlinkAttribute(node, attribute, value) {\n\tnode.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);\n}",
		    "getBindingGroupValue": "function getBindingGroupValue(group) {\n\tvar value = [];\n\tfor (var i = 0; i < group.length; i += 1) {\n\t\tif (group[i].checked) value.push(group[i].__value);\n\t}\n\treturn value;\n}",
		    "toNumber": "function toNumber(value) {\n\treturn value === '' ? undefined : +value;\n}",
		    "timeRangesToArray": "function timeRangesToArray(ranges) {\n\tvar array = [];\n\tfor (var i = 0; i < ranges.length; i += 1) {\n\t\tarray.push({ start: ranges.start(i), end: ranges.end(i) });\n\t}\n\treturn array;\n}",
		    "children": "function children (element) {\n\treturn Array.from(element.childNodes);\n}",
		    "claimElement": "function claimElement (nodes, name, attributes, svg) {\n\tfor (var i = 0; i < nodes.length; i += 1) {\n\t\tvar node = nodes[i];\n\t\tif (node.nodeName === name) {\n\t\t\tfor (var j = 0; j < node.attributes.length; j += 1) {\n\t\t\t\tvar attribute = node.attributes[j];\n\t\t\t\tif (!attributes[attribute.name]) node.removeAttribute(attribute.name);\n\t\t\t}\n\t\t\treturn nodes.splice(i, 1)[0]; // TODO strip unwanted attributes\n\t\t}\n\t}\n\n\treturn svg ? createSvgElement(name) : createElement(name);\n}",
		    "claimText": "function claimText (nodes, data) {\n\tfor (var i = 0; i < nodes.length; i += 1) {\n\t\tvar node = nodes[i];\n\t\tif (node.nodeType === 3) {\n\t\t\tnode.data = data;\n\t\t\treturn nodes.splice(i, 1)[0];\n\t\t}\n\t}\n\n\treturn createText(data);\n}",
		    "setData": "function setData(text, data) {\n\ttext.data = '' + data;\n}",
		    "setInputType": "function setInputType(input, type) {\n\ttry {\n\t\tinput.type = type;\n\t} catch (e) {}\n}",
		    "setStyle": "function setStyle(node, key, value) {\n\tnode.style.setProperty(key, value);\n}",
		    "selectOption": "function selectOption(select, value) {\n\tfor (var i = 0; i < select.options.length; i += 1) {\n\t\tvar option = select.options[i];\n\n\t\tif (option.__value === value) {\n\t\t\toption.selected = true;\n\t\t\treturn;\n\t\t}\n\t}\n}",
		    "selectOptions": "function selectOptions(select, value) {\n\tfor (var i = 0; i < select.options.length; i += 1) {\n\t\tvar option = select.options[i];\n\t\toption.selected = ~value.indexOf(option.__value);\n\t}\n}",
		    "selectValue": "function selectValue(select) {\n\tvar selectedOption = select.querySelector(':checked') || select.options[0];\n\treturn selectedOption && selectedOption.__value;\n}",
		    "selectMultipleValue": "function selectMultipleValue(select) {\n\treturn [].map.call(select.querySelectorAll(':checked'), function(option) {\n\t\treturn option.__value;\n\t});\n}",
		    "addResizeListener": "function addResizeListener(element, fn) {\n\tif (getComputedStyle(element).position === 'static') {\n\t\telement.style.position = 'relative';\n\t}\n\n\tconst object = document.createElement('object');\n\tobject.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');\n\tobject.type = 'text/html';\n\n\tlet win;\n\n\tobject.onload = () => {\n\t\twin = object.contentDocument.defaultView;\n\t\twin.addEventListener('resize', fn);\n\t};\n\n\tif (/Trident/.test(navigator.userAgent)) {\n\t\telement.appendChild(object);\n\t\tobject.data = 'about:blank';\n\t} else {\n\t\tobject.data = 'about:blank';\n\t\telement.appendChild(object);\n\t}\n\n\treturn {\n\t\tcancel: () => {\n\t\t\twin && win.removeEventListener && win.removeEventListener('resize', fn);\n\t\t\telement.removeChild(object);\n\t\t}\n\t};\n}",
		    "toggleClass": "function toggleClass(element, name, toggle) {\n\telement.classList.toggle(name, !!toggle);\n}",
		    "blankObject": "function blankObject() {\n\treturn Object.create(null);\n}",
		    "destroy": "function destroy(detach) {\n\tthis.destroy = noop;\n\tthis.fire('destroy');\n\tthis.set = noop;\n\n\tthis._fragment.d(detach !== false);\n\tthis._fragment = null;\n\tthis._state = {};\n}",
		    "destroyDev": "function destroyDev(detach) {\n\tdestroy.call(this, detach);\n\tthis.destroy = function() {\n\t\tconsole.warn('Component was already destroyed');\n\t};\n}",
		    "_differs": "function _differs(a, b) {\n\treturn a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');\n}",
		    "_differsImmutable": "function _differsImmutable(a, b) {\n\treturn a != a ? b == b : a !== b;\n}",
		    "fire": "function fire(eventName, data) {\n\tvar handlers =\n\t\teventName in this._handlers && this._handlers[eventName].slice();\n\tif (!handlers) return;\n\n\tfor (var i = 0; i < handlers.length; i += 1) {\n\t\tvar handler = handlers[i];\n\n\t\tif (!handler.__calling) {\n\t\t\ttry {\n\t\t\t\thandler.__calling = true;\n\t\t\t\thandler.call(this, data);\n\t\t\t} finally {\n\t\t\t\thandler.__calling = false;\n\t\t\t}\n\t\t}\n\t}\n}",
		    "flush": "function flush(component) {\n\tcomponent._lock = true;\n\tcallAll(component._beforecreate);\n\tcallAll(component._oncreate);\n\tcallAll(component._aftercreate);\n\tcomponent._lock = false;\n}",
		    "get": "function get() {\n\treturn this._state;\n}",
		    "init": "function init(component, options) {\n\tcomponent._handlers = blankObject();\n\tcomponent._slots = blankObject();\n\tcomponent._bind = options._bind;\n\tcomponent._staged = {};\n\n\tcomponent.options = options;\n\tcomponent.root = options.root || component;\n\tcomponent.store = options.store || component.root.store;\n\n\tif (!options.root) {\n\t\tcomponent._beforecreate = [];\n\t\tcomponent._oncreate = [];\n\t\tcomponent._aftercreate = [];\n\t}\n}",
		    "on": "function on(eventName, handler) {\n\tvar handlers = this._handlers[eventName] || (this._handlers[eventName] = []);\n\thandlers.push(handler);\n\n\treturn {\n\t\tcancel: function() {\n\t\t\tvar index = handlers.indexOf(handler);\n\t\t\tif (~index) handlers.splice(index, 1);\n\t\t}\n\t};\n}",
		    "set": "function set(newState) {\n\tthis._set(assign({}, newState));\n\tif (this.root._lock) return;\n\tflush(this.root);\n}",
		    "_set": "function _set(newState) {\n\tvar oldState = this._state,\n\t\tchanged = {},\n\t\tdirty = false;\n\n\tnewState = assign(this._staged, newState);\n\tthis._staged = {};\n\n\tfor (var key in newState) {\n\t\tif (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;\n\t}\n\tif (!dirty) return;\n\n\tthis._state = assign(assign({}, oldState), newState);\n\tthis._recompute(changed, this._state);\n\tif (this._bind) this._bind(changed, this._state);\n\n\tif (this._fragment) {\n\t\tthis.fire(\"state\", { changed: changed, current: this._state, previous: oldState });\n\t\tthis._fragment.p(changed, this._state);\n\t\tthis.fire(\"update\", { changed: changed, current: this._state, previous: oldState });\n\t}\n}",
		    "_stage": "function _stage(newState) {\n\tassign(this._staged, newState);\n}",
		    "setDev": "function setDev(newState) {\n\tif (typeof newState !== 'object') {\n\t\tthrow new Error(\n\t\t\tthis._debugName + '.set was called without an object of data key-values to update.'\n\t\t);\n\t}\n\n\tthis._checkReadOnly(newState);\n\tset.call(this, newState);\n}",
		    "callAll": "function callAll(fns) {\n\twhile (fns && fns.length) fns.shift()();\n}",
		    "_mount": "function _mount(target, anchor) {\n\tthis._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);\n}",
		    "PENDING": "{}",
		    "SUCCESS": "{}",
		    "FAILURE": "{}",
		    "removeFromStore": "function removeFromStore() {\n\tthis.store._remove(this);\n}",
		    "proto": "{\n\tdestroy,\n\tget,\n\tfire,\n\ton,\n\tset,\n\t_recompute: noop,\n\t_set,\n\t_stage,\n\t_mount,\n\t_differs\n}",
		    "protoDev": "{\n\tdestroy: destroyDev,\n\tget,\n\tfire,\n\ton,\n\tset: setDev,\n\t_recompute: noop,\n\t_set,\n\t_stage,\n\t_mount,\n\t_differs\n}",
		    "destroyBlock": "function destroyBlock(block, lookup) {\n\tblock.d(1);\n\tlookup[block.key] = null;\n}",
		    "outroAndDestroyBlock": "function outroAndDestroyBlock(block, lookup) {\n\tblock.o(function() {\n\t\tdestroyBlock(block, lookup);\n\t});\n}",
		    "fixAndOutroAndDestroyBlock": "function fixAndOutroAndDestroyBlock(block, lookup) {\n\tblock.f();\n\toutroAndDestroyBlock(block, lookup);\n}",
		    "updateKeyedEach": "function updateKeyedEach(old_blocks, component, changed, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, intro_method, next, get_context) {\n\tvar o = old_blocks.length;\n\tvar n = list.length;\n\n\tvar i = o;\n\tvar old_indexes = {};\n\twhile (i--) old_indexes[old_blocks[i].key] = i;\n\n\tvar new_blocks = [];\n\tvar new_lookup = {};\n\tvar deltas = {};\n\n\tvar i = n;\n\twhile (i--) {\n\t\tvar child_ctx = get_context(ctx, list, i);\n\t\tvar key = get_key(child_ctx);\n\t\tvar block = lookup[key];\n\n\t\tif (!block) {\n\t\t\tblock = create_each_block(component, key, child_ctx);\n\t\t\tblock.c();\n\t\t} else if (dynamic) {\n\t\t\tblock.p(changed, child_ctx);\n\t\t}\n\n\t\tnew_blocks[i] = new_lookup[key] = block;\n\n\t\tif (key in old_indexes) deltas[key] = Math.abs(i - old_indexes[key]);\n\t}\n\n\tvar will_move = {};\n\tvar did_move = {};\n\n\tfunction insert(block) {\n\t\tblock[intro_method](node, next);\n\t\tlookup[block.key] = block;\n\t\tnext = block.first;\n\t\tn--;\n\t}\n\n\twhile (o && n) {\n\t\tvar new_block = new_blocks[n - 1];\n\t\tvar old_block = old_blocks[o - 1];\n\t\tvar new_key = new_block.key;\n\t\tvar old_key = old_block.key;\n\n\t\tif (new_block === old_block) {\n\t\t\t// do nothing\n\t\t\tnext = new_block.first;\n\t\t\to--;\n\t\t\tn--;\n\t\t}\n\n\t\telse if (!new_lookup[old_key]) {\n\t\t\t// remove old block\n\t\t\tdestroy(old_block, lookup);\n\t\t\to--;\n\t\t}\n\n\t\telse if (!lookup[new_key] || will_move[new_key]) {\n\t\t\tinsert(new_block);\n\t\t}\n\n\t\telse if (did_move[old_key]) {\n\t\t\to--;\n\n\t\t} else if (deltas[new_key] > deltas[old_key]) {\n\t\t\tdid_move[new_key] = true;\n\t\t\tinsert(new_block);\n\n\t\t} else {\n\t\t\twill_move[old_key] = true;\n\t\t\to--;\n\t\t}\n\t}\n\n\twhile (o--) {\n\t\tvar old_block = old_blocks[o];\n\t\tif (!new_lookup[old_block.key]) destroy(old_block, lookup);\n\t}\n\n\twhile (n) insert(new_blocks[n - 1]);\n\n\treturn new_blocks;\n}",
		    "measure": "function measure(blocks) {\n\tconst rects = {};\n\tlet i = blocks.length;\n\twhile (i--) rects[blocks[i].key] = blocks[i].node.getBoundingClientRect();\n\treturn rects;\n}",
		    "animate": "function animate(blocks, rects, fn, params) {\n\tlet i = blocks.length;\n\twhile (i--) {\n\t\tconst block = blocks[i];\n\t\tconst from = rects[block.key];\n\n\t\tif (!from) continue;\n\t\tconst to = block.node.getBoundingClientRect();\n\n\t\tif (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) continue;\n\n\n\t}\n}",
		    "getSpreadUpdate": "function getSpreadUpdate(levels, updates) {\n\tvar update = {};\n\n\tvar to_null_out = {};\n\tvar accounted_for = {};\n\n\tvar i = levels.length;\n\twhile (i--) {\n\t\tvar o = levels[i];\n\t\tvar n = updates[i];\n\n\t\tif (n) {\n\t\t\tfor (var key in o) {\n\t\t\t\tif (!(key in n)) to_null_out[key] = 1;\n\t\t\t}\n\n\t\t\tfor (var key in n) {\n\t\t\t\tif (!accounted_for[key]) {\n\t\t\t\t\tupdate[key] = n[key];\n\t\t\t\t\taccounted_for[key] = 1;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tlevels[i] = n;\n\t\t} else {\n\t\t\tfor (var key in o) {\n\t\t\t\taccounted_for[key] = 1;\n\t\t\t}\n\t\t}\n\t}\n\n\tfor (var key in to_null_out) {\n\t\tif (!(key in update)) update[key] = undefined;\n\t}\n\n\treturn update;\n}",
		    "invalidAttributeNameCharacter": "/[\\s'\">\\/=\\u{FDD0}-\\u{FDEF}\\u{FFFE}\\u{FFFF}\\u{1FFFE}\\u{1FFFF}\\u{2FFFE}\\u{2FFFF}\\u{3FFFE}\\u{3FFFF}\\u{4FFFE}\\u{4FFFF}\\u{5FFFE}\\u{5FFFF}\\u{6FFFE}\\u{6FFFF}\\u{7FFFE}\\u{7FFFF}\\u{8FFFE}\\u{8FFFF}\\u{9FFFE}\\u{9FFFF}\\u{AFFFE}\\u{AFFFF}\\u{BFFFE}\\u{BFFFF}\\u{CFFFE}\\u{CFFFF}\\u{DFFFE}\\u{DFFFF}\\u{EFFFE}\\u{EFFFF}\\u{FFFFE}\\u{FFFFF}\\u{10FFFE}\\u{10FFFF}]/u",
		    "spread": "function spread(args) {\n\tconst attributes = Object.assign({}, ...args);\n\tlet str = '';\n\n\tObject.keys(attributes).forEach(name => {\n\t\tif (invalidAttributeNameCharacter.test(name)) return;\n\n\t\tconst value = attributes[name];\n\t\tif (value === undefined) return;\n\t\tif (value === true) str += \" \" + name;\n\n\t\tconst escaped = String(value)\n\t\t\t.replace(/\"/g, '&#34;')\n\t\t\t.replace(/'/g, '&#39;');\n\n\t\tstr += \" \" + name + \"=\" + JSON.stringify(escaped);\n\t});\n\n\treturn str;\n}",
		    "escaped": "{\n\t'\"': '&quot;',\n\t\"'\": '&#39;',\n\t'&': '&amp;',\n\t'<': '&lt;',\n\t'>': '&gt;'\n}",
		    "escape": "function escape(html) {\n\treturn String(html).replace(/[\"'&<>]/g, match => escaped[match]);\n}",
		    "each": "function each(items, assign, fn) {\n\tlet str = '';\n\tfor (let i = 0; i < items.length; i += 1) {\n\t\tstr += fn(assign(items[i], i));\n\t}\n\treturn str;\n}",
		    "missingComponent": "{\n\t_render: () => ''\n}",
		    "validateSsrComponent": "function validateSsrComponent(component, name) {\n\tif (!component || !component._render) {\n\t\tif (name === 'svelte:component') name += ' this={...}';\n\t\tthrow new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);\n\t}\n\n\treturn component;\n}",
		    "debug": "function debug(file, line, column, values) {\n\tconsole.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`);\n\tconsole.log(values);\n\treturn '';\n}",
		    "linear": "function linear(t) {\n\treturn t;\n}",
		    "generateRule": "function generateRule({ a, b, delta, duration }, ease, fn) {\n\tconst step = 16.666 / duration;\n\tlet keyframes = '{\\n';\n\n\tfor (let p = 0; p <= 1; p += step) {\n\t\tconst t = a + delta * ease(p);\n\t\tkeyframes += p * 100 + `%{${fn(t, 1 - t)}}\\n`;\n\t}\n\n\treturn keyframes + `100% {${fn(b, 1 - b)}}\\n}`;\n}",
		    "hash": "function hash(str) {\n\tlet hash = 5381;\n\tlet i = str.length;\n\n\twhile (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);\n\treturn hash >>> 0;\n}",
		    "wrapTransition": "function wrapTransition(component, node, fn, params, intro) {\n\tlet obj = fn.call(component, node, params);\n\tlet duration;\n\tlet ease;\n\tlet cssText;\n\n\tlet initialised = false;\n\n\treturn {\n\t\tt: intro ? 0 : 1,\n\t\trunning: false,\n\t\tprogram: null,\n\t\tpending: null,\n\n\t\trun(b, callback) {\n\t\t\tif (typeof obj === 'function') {\n\t\t\t\ttransitionManager.wait().then(() => {\n\t\t\t\t\tobj = obj();\n\t\t\t\t\tthis._run(b, callback);\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\tthis._run(b, callback);\n\t\t\t}\n\t\t},\n\n\t\t_run(b, callback) {\n\t\t\tduration = obj.duration || 300;\n\t\t\tease = obj.easing || linear;\n\n\t\t\tconst program = {\n\t\t\t\tstart: window.performance.now() + (obj.delay || 0),\n\t\t\t\tb,\n\t\t\t\tcallback: callback || noop\n\t\t\t};\n\n\t\t\tif (intro && !initialised) {\n\t\t\t\tif (obj.css && obj.delay) {\n\t\t\t\t\tcssText = node.style.cssText;\n\t\t\t\t\tnode.style.cssText += obj.css(0, 1);\n\t\t\t\t}\n\n\t\t\t\tif (obj.tick) obj.tick(0, 1);\n\t\t\t\tinitialised = true;\n\t\t\t}\n\n\t\t\tif (!b) {\n\t\t\t\tprogram.group = outros.current;\n\t\t\t\toutros.current.remaining += 1;\n\t\t\t}\n\n\t\t\tif (obj.delay) {\n\t\t\t\tthis.pending = program;\n\t\t\t} else {\n\t\t\t\tthis.start(program);\n\t\t\t}\n\n\t\t\tif (!this.running) {\n\t\t\t\tthis.running = true;\n\t\t\t\ttransitionManager.add(this);\n\t\t\t}\n\t\t},\n\n\t\tstart(program) {\n\t\t\tcomponent.fire(`${program.b ? 'intro' : 'outro'}.start`, { node });\n\n\t\t\tprogram.a = this.t;\n\t\t\tprogram.delta = program.b - program.a;\n\t\t\tprogram.duration = duration * Math.abs(program.b - program.a);\n\t\t\tprogram.end = program.start + program.duration;\n\n\t\t\tif (obj.css) {\n\t\t\t\tif (obj.delay) node.style.cssText = cssText;\n\n\t\t\t\tconst rule = generateRule(program, ease, obj.css);\n\t\t\t\ttransitionManager.addRule(rule, program.name = '__svelte_' + hash(rule));\n\n\t\t\t\tnode.style.animation = (node.style.animation || '')\n\t\t\t\t\t.split(', ')\n\t\t\t\t\t.filter(anim => anim && (program.delta < 0 || !/__svelte/.test(anim)))\n\t\t\t\t\t.concat(`${program.name} ${program.duration}ms linear 1 forwards`)\n\t\t\t\t\t.join(', ');\n\t\t\t}\n\n\t\t\tthis.program = program;\n\t\t\tthis.pending = null;\n\t\t},\n\n\t\tupdate(now) {\n\t\t\tconst program = this.program;\n\t\t\tif (!program) return;\n\n\t\t\tconst p = now - program.start;\n\t\t\tthis.t = program.a + program.delta * ease(p / program.duration);\n\t\t\tif (obj.tick) obj.tick(this.t, 1 - this.t);\n\t\t},\n\n\t\tdone() {\n\t\t\tconst program = this.program;\n\t\t\tthis.t = program.b;\n\n\t\t\tif (obj.tick) obj.tick(this.t, 1 - this.t);\n\n\t\t\tcomponent.fire(`${program.b ? 'intro' : 'outro'}.end`, { node });\n\n\t\t\tif (!program.b && !program.invalidated) {\n\t\t\t\tprogram.group.callbacks.push(() => {\n\t\t\t\t\tprogram.callback();\n\t\t\t\t\tif (obj.css) transitionManager.deleteRule(node, program.name);\n\t\t\t\t});\n\n\t\t\t\tif (--program.group.remaining === 0) {\n\t\t\t\t\tprogram.group.callbacks.forEach(run);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif (obj.css) transitionManager.deleteRule(node, program.name);\n\t\t\t}\n\n\t\t\tthis.running = !!this.pending;\n\t\t},\n\n\t\tabort(reset) {\n\t\t\tif (this.program) {\n\t\t\t\tif (reset && obj.tick) obj.tick(1, 0);\n\t\t\t\tif (obj.css) transitionManager.deleteRule(node, this.program.name);\n\t\t\t\tthis.program = this.pending = null;\n\t\t\t\tthis.running = false;\n\t\t\t}\n\t\t},\n\n\t\tinvalidate() {\n\t\t\tif (this.program) {\n\t\t\t\tthis.program.invalidated = true;\n\t\t\t}\n\t\t}\n\t};\n}",
		    "outros": "{}",
		    "groupOutros": "function groupOutros() {\n\toutros.current = {\n\t\tremaining: 0,\n\t\tcallbacks: []\n\t};\n}",
		    "transitionManager": "{\n\trunning: false,\n\ttransitions: [],\n\tbound: null,\n\tstylesheet: null,\n\tactiveRules: {},\n\tpromise: null,\n\n\tadd(transition) {\n\t\tthis.transitions.push(transition);\n\n\t\tif (!this.running) {\n\t\t\tthis.running = true;\n\t\t\trequestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));\n\t\t}\n\t},\n\n\taddRule(rule, name) {\n\t\tif (!this.stylesheet) {\n\t\t\tconst style = createElement('style');\n\t\t\tdocument.head.appendChild(style);\n\t\t\ttransitionManager.stylesheet = style.sheet;\n\t\t}\n\n\t\tif (!this.activeRules[name]) {\n\t\t\tthis.activeRules[name] = true;\n\t\t\tthis.stylesheet.insertRule(`@keyframes ${name} ${rule}`, this.stylesheet.cssRules.length);\n\t\t}\n\t},\n\n\tnext() {\n\t\tthis.running = false;\n\n\t\tconst now = window.performance.now();\n\t\tlet i = this.transitions.length;\n\n\t\twhile (i--) {\n\t\t\tconst transition = this.transitions[i];\n\n\t\t\tif (transition.program && now >= transition.program.end) {\n\t\t\t\ttransition.done();\n\t\t\t}\n\n\t\t\tif (transition.pending && now >= transition.pending.start) {\n\t\t\t\ttransition.start(transition.pending);\n\t\t\t}\n\n\t\t\tif (transition.running) {\n\t\t\t\ttransition.update(now);\n\t\t\t\tthis.running = true;\n\t\t\t} else if (!transition.pending) {\n\t\t\t\tthis.transitions.splice(i, 1);\n\t\t\t}\n\t\t}\n\n\t\tif (this.running) {\n\t\t\trequestAnimationFrame(this.bound);\n\t\t} else if (this.stylesheet) {\n\t\t\tlet i = this.stylesheet.cssRules.length;\n\t\t\twhile (i--) this.stylesheet.deleteRule(i);\n\t\t\tthis.activeRules = {};\n\t\t}\n\t},\n\n\tdeleteRule(node, name) {\n\t\tnode.style.animation = node.style.animation\n\t\t\t.split(', ')\n\t\t\t.filter(anim => anim && anim.indexOf(name) === -1)\n\t\t\t.join(', ');\n\t},\n\n\twait() {\n\t\tif (!transitionManager.promise) {\n\t\t\ttransitionManager.promise = Promise.resolve();\n\t\t\ttransitionManager.promise.then(() => {\n\t\t\t\ttransitionManager.promise = null;\n\t\t\t});\n\t\t}\n\n\t\treturn transitionManager.promise;\n\t}\n}",
		    "noop": "function noop() {}",
		    "assign": "function assign(tar, src) {\n\tfor (var k in src) tar[k] = src[k];\n\treturn tar;\n}",
		    "assignTrue": "function assignTrue(tar, src) {\n\tfor (var k in src) tar[k] = 1;\n\treturn tar;\n}",
		    "isPromise": "function isPromise(value) {\n\treturn value && typeof value.then === 'function';\n}",
		    "callAfter": "function callAfter(fn, i) {\n\tif (i === 0) fn();\n\treturn () => {\n\t\tif (!--i) fn();\n\t};\n}",
		    "addLoc": "function addLoc(element, file, line, column, char) {\n\telement.__svelte_meta = {\n\t\tloc: { file, line, column, char }\n\t};\n}",
		    "exclude": "function exclude(src, prop) {\n\tconst tar = {};\n\tfor (const k in src) k === prop || (tar[k] = src[k]);\n\treturn tar;\n}",
		    "run": "function run(fn) {\n\tfn();\n}"
		};

		function checkForComputedKeys(component, properties) {
		    properties.forEach(prop => {
		        if (prop.key.computed) {
		            component.error(prop, {
		                code: `computed-key`,
		                message: `Cannot use computed keys`
		            });
		        }
		    });
		}

		function checkForDupes(component, properties) {
		    const seen = new Set();
		    properties.forEach(prop => {
		        const name = getMethodName(prop.key);
		        if (seen.has(name)) {
		            component.error(prop, {
		                code: `duplicate-property`,
		                message: `Duplicate property '${name}'`
		            });
		        }
		        seen.add(name);
		    });
		}

		const disallowed = new Set(['Literal', 'ObjectExpression', 'ArrayExpression']);
		function data$1(component, prop) {
		    while (prop.type === 'ParenthesizedExpression')
		        prop = prop.expression;
		    if (disallowed.has(prop.value.type)) {
		        component.error(prop.value, {
		            code: `invalid-data-property`,
		            message: `'data' must be a function`
		        });
		    }
		}

		function actions(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-actions`,
		            message: `The 'actions' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		}

		function transitions(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-transitions-property`,
		            message: `The 'transitions' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		    prop.value.properties.forEach(() => {
		        // TODO probably some validation that can happen here...
		        // checking for use of `this` etc?
		    });
		}

		function walkThroughTopFunctionScope(body, callback) {
		    let lexicalDepth = 0;
		    walk(body, {
		        enter(node) {
		            if (/^Function/.test(node.type)) {
		                lexicalDepth += 1;
		            }
		            else if (lexicalDepth === 0) {
		                callback(node);
		            }
		        },
		        leave(node) {
		            if (/^Function/.test(node.type)) {
		                lexicalDepth -= 1;
		            }
		        },
		    });
		}

		function isThisGetCallExpression(node) {
		    return node.type === 'CallExpression' &&
		        node.callee.type === 'MemberExpression' &&
		        node.callee.object.type === 'ThisExpression' &&
		        node.callee.property.name === 'get';
		}

		const isFunctionExpression = new Set([
		    'FunctionExpression',
		    'ArrowFunctionExpression',
		]);
		function computed(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-computed-property`,
		            message: `The 'computed' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		    prop.value.properties.forEach((computation) => {
		        const name = getMethodName(computation.key);
		        if (!isValidIdentifier(name)) {
		            const suggestion = name.replace(/[^_$a-z0-9]/ig, '_').replace(/^\d/, '_$&');
		            component.error(computation.key, {
		                code: `invalid-computed-name`,
		                message: `Computed property name '${name}' is invalid — must be a valid identifier such as ${suggestion}`
		            });
		        }
		        if (reservedNames.has(name)) {
		            component.error(computation.key, {
		                code: `invalid-computed-name`,
		                message: `Computed property name '${name}' is invalid — cannot be a JavaScript reserved word`
		            });
		        }
		        if (!isFunctionExpression.has(computation.value.type)) {
		            component.error(computation.value, {
		                code: `invalid-computed-value`,
		                message: `Computed properties can be function expressions or arrow function expressions`
		            });
		        }
		        const { body, params } = computation.value;
		        walkThroughTopFunctionScope(body, (node) => {
		            if (isThisGetCallExpression(node) && !node.callee.property.computed) {
		                component.error(node, {
		                    code: `impure-computed`,
		                    message: `Cannot use this.get(...) — values must be passed into the function as arguments`
		                });
		            }
		            if (node.type === 'ThisExpression') {
		                component.error(node, {
		                    code: `impure-computed`,
		                    message: `Computed properties should be pure functions — they do not have access to the component instance and cannot use 'this'. Did you mean to put this in 'methods'?`
		                });
		            }
		        });
		        if (params.length === 0) {
		            component.error(computation.value, {
		                code: `impure-computed`,
		                message: `A computed value must depend on at least one property`
		            });
		        }
		        if (params.length > 1) {
		            component.error(computation.value, {
		                code: `invalid-computed-arguments`,
		                message: `Computed properties must take a single argument`
		            });
		        }
		    });
		}

		function usesThisOrArguments(node) {
		    let result = false;
		    walk(node, {
		        enter(node, parent) {
		            if (result ||
		                node.type === 'FunctionExpression' ||
		                node.type === 'FunctionDeclaration') {
		                return this.skip();
		            }
		            if (node.type === 'ThisExpression') {
		                result = true;
		            }
		            if (node.type === 'Identifier' &&
		                isReference(node, parent) &&
		                node.name === 'arguments') {
		                result = true;
		            }
		        },
		    });
		    return result;
		}

		function oncreate(component, prop) {
		    if (prop.value.type === 'ArrowFunctionExpression') {
		        if (usesThisOrArguments(prop.value.body)) {
		            component.error(prop, {
		                code: `invalid-oncreate-property`,
		                message: `'oncreate' should be a function expression, not an arrow function expression`
		            });
		        }
		    }
		}

		function ondestroy(component, prop) {
		    if (prop.value.type === 'ArrowFunctionExpression') {
		        if (usesThisOrArguments(prop.value.body)) {
		            component.error(prop, {
		                code: `invalid-ondestroy-property`,
		                message: `'ondestroy' should be a function expression, not an arrow function expression`
		            });
		        }
		    }
		}

		function onstate(component, prop) {
		    if (prop.value.type === 'ArrowFunctionExpression') {
		        if (usesThisOrArguments(prop.value.body)) {
		            component.error(prop, {
		                code: `invalid-onstate-property`,
		                message: `'onstate' should be a function expression, not an arrow function expression`
		            });
		        }
		    }
		}

		function onupdate(component, prop) {
		    if (prop.value.type === 'ArrowFunctionExpression') {
		        if (usesThisOrArguments(prop.value.body)) {
		            component.error(prop, {
		                code: `invalid-onupdate-property`,
		                message: `'onupdate' should be a function expression, not an arrow function expression`
		            });
		        }
		    }
		}

		function onrender(component, prop) {
		    component.warn(prop, {
		        code: `deprecated-onrender`,
		        message: `'onrender' has been deprecated in favour of 'oncreate', and will cause an error in Svelte 2.x`
		    });
		    oncreate(component, prop);
		}

		function onteardown(component, prop) {
		    component.warn(prop, {
		        code: `deprecated-onteardown`,
		        message: `'onteardown' has been deprecated in favour of 'ondestroy', and will cause an error in Svelte 2.x`
		    });
		    ondestroy(component, prop);
		}

		function helpers(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-helpers-property`,
		            message: `The 'helpers' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		    prop.value.properties.forEach((prop) => {
		        if (!/FunctionExpression/.test(prop.value.type))
		            return;
		        let usesArguments = false;
		        walkThroughTopFunctionScope(prop.value.body, (node) => {
		            if (isThisGetCallExpression(node) && !node.callee.property.computed) {
		                component.error(node, {
		                    code: `impure-helper`,
		                    message: `Cannot use this.get(...) — values must be passed into the helper function as arguments`
		                });
		            }
		            if (node.type === 'ThisExpression') {
		                component.error(node, {
		                    code: `impure-helper`,
		                    message: `Helpers should be pure functions — they do not have access to the component instance and cannot use 'this'. Did you mean to put this in 'methods'?`
		                });
		            }
		            else if (node.type === 'Identifier' && node.name === 'arguments') {
		                usesArguments = true;
		            }
		        });
		        if (prop.value.params.length === 0 && !usesArguments) {
		            component.warn(prop, {
		                code: `impure-helper`,
		                message: `Helpers should be pure functions, with at least one argument`
		            });
		        }
		    });
		}

		function checkForAccessors(component, properties, label) {
		    properties.forEach(prop => {
		        if (prop.kind !== 'init') {
		            component.error(prop, {
		                code: `illegal-accessor`,
		                message: `${label} cannot use getters and setters`
		            });
		        }
		    });
		}

		const builtin = new Set(['set', 'get', 'on', 'fire', 'destroy']);
		function methods(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-methods-property`,
		            message: `The 'methods' property must be an object literal`
		        });
		    }
		    checkForAccessors(component, prop.value.properties, 'Methods');
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		    prop.value.properties.forEach((prop) => {
		        const name = getMethodName(prop.key);
		        if (builtin.has(name)) {
		            component.error(prop, {
		                code: `invalid-method-name`,
		                message: `Cannot overwrite built-in method '${name}'`
		            });
		        }
		        if (prop.value.type === 'ArrowFunctionExpression') {
		            if (usesThisOrArguments(prop.value.body)) {
		                component.error(prop, {
		                    code: `invalid-method-value`,
		                    message: `Method '${prop.key.name}' should be a function expression, not an arrow function expression`
		                });
		            }
		        }
		    });
		}

		function components(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-components-property`,
		            message: `The 'components' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		    prop.value.properties.forEach((node) => {
		        const name = getMethodName(node.key);
		        if (name === 'state') {
		            // TODO is this still true?
		            component.error(node, {
		                code: `invalid-name`,
		                message: `Component constructors cannot be called 'state' due to technical limitations`
		            });
		        }
		        if (!/^[A-Z]/.test(name)) {
		            component.error(node, {
		                code: `component-lowercase`,
		                message: `Component names must be capitalised`
		            });
		        }
		    });
		}

		function events$1(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-events-property`,
		            message: `The 'events' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		}

		const valid = new Set(validNamespaces);
		function namespace(component, prop) {
		    const ns = nodeToString(prop.value);
		    if (typeof ns !== 'string') {
		        component.error(prop, {
		            code: `invalid-namespace-property`,
		            message: `The 'namespace' property must be a string literal representing a valid namespace`
		        });
		    }
		    if (!valid.has(ns)) {
		        const match = fuzzymatch(ns, validNamespaces);
		        if (match) {
		            component.error(prop, {
		                code: `invalid-namespace-property`,
		                message: `Invalid namespace '${ns}' (did you mean '${match}'?)`
		            });
		        }
		        else {
		            component.error(prop, {
		                code: `invalid-namespace-property`,
		                message: `Invalid namespace '${ns}'`
		            });
		        }
		    }
		}

		function preload(component, prop) {
		    // not sure there's anything we need to check here...
		}

		function props(component, prop) {
		    if (prop.value.type !== 'ArrayExpression') {
		        component.error(prop.value, {
		            code: `invalid-props-property`,
		            message: `'props' must be an array expression, if specified`
		        });
		    }
		    prop.value.elements.forEach((element) => {
		        if (typeof nodeToString(element) !== 'string') {
		            component.error(element, {
		                code: `invalid-props-property`,
		                message: `'props' must be an array of string literals`
		            });
		        }
		    });
		}

		function tag$1(component, prop) {
		    const tag = nodeToString(prop.value);
		    if (typeof tag !== 'string') {
		        component.error(prop.value, {
		            code: `invalid-tag-property`,
		            message: `'tag' must be a string literal`
		        });
		    }
		    if (!/^[a-zA-Z][a-zA-Z0-9]*-[a-zA-Z0-9-]+$/.test(tag)) {
		        component.error(prop.value, {
		            code: `invalid-tag-property`,
		            message: `tag name must be two or more words joined by the '-' character`
		        });
		    }
		}

		function transitions$1(component, prop) {
		    if (prop.value.type !== 'ObjectExpression') {
		        component.error(prop, {
		            code: `invalid-transitions-property`,
		            message: `The 'transitions' property must be an object literal`
		        });
		    }
		    checkForDupes(component, prop.value.properties);
		    checkForComputedKeys(component, prop.value.properties);
		    prop.value.properties.forEach(() => {
		        // TODO probably some validation that can happen here...
		        // checking for use of `this` etc?
		    });
		}

		const disallowed$1 = new Set(['Literal', 'ObjectExpression', 'ArrayExpression']);
		function setup(component, prop) {
		    while (prop.type === 'ParenthesizedExpression')
		        prop = prop.expression;
		    if (disallowed$1.has(prop.value.type)) {
		        component.error(prop.value, {
		            code: `invalid-setup-property`,
		            message: `'setup' must be a function`
		        });
		    }
		}

		function store(component, prop) {
		    // not sure there's anything we need to check here...
		}

		function immutable(component, prop) {
		    if (prop.value.type !== 'Literal' || typeof prop.value.value !== 'boolean') {
		        component.error(prop.value, {
		            code: `invalid-immutable-property`,
		            message: `'immutable' must be a boolean literal`
		        });
		    }
		}

		var propValidators = {
		    data: data$1,
		    actions,
		    animations: transitions,
		    computed,
		    oncreate,
		    ondestroy,
		    onstate,
		    onupdate,
		    onrender,
		    onteardown,
		    helpers,
		    methods,
		    components,
		    events: events$1,
		    namespace,
		    preload,
		    props,
		    tag: tag$1,
		    transitions: transitions$1,
		    setup,
		    store,
		    immutable,
		};

		function getIndentationLevel(str, b) {
		    let a = b;
		    while (a > 0 && str[a - 1] !== '\n')
		        a -= 1;
		    return /^\s*/.exec(str.slice(a, b))[0];
		}
		function getIndentExclusionRanges(node) {
		    // TODO can we fold this into a different pass?
		    const ranges = [];
		    walk(node, {
		        enter(node) {
		            if (node.type === 'TemplateElement')
		                ranges.push(node);
		        }
		    });
		    return ranges;
		}
		function removeIndentation(code, start, end, indentationLevel, ranges) {
		    const str = code.original.slice(start, end);
		    const pattern = new RegExp(`^${indentationLevel}`, 'gm');
		    let match;
		    while (match = pattern.exec(str)) {
		        // TODO bail if we're inside an exclusion range
		        code.remove(start + match.index, start + match.index + indentationLevel.length);
		    }
		}
		// We need to tell estree-walker that it should always
		// look for an `else` block, otherwise it might get
		// the wrong idea about the shape of each/if blocks
		childKeys.EachBlock = childKeys.IfBlock = ['children', 'else'];
		childKeys.Attribute = ['value'];
		class Component {
		    constructor(ast, source, name, options, stats) {
		        this.stats = stats;
		        this.ast = ast;
		        this.source = source;
		        this.options = options;
		        this.imports = [];
		        this.shorthandImports = [];
		        this.helpers = new Set();
		        this.components = new Set();
		        this.events = new Set();
		        this.methods = new Set();
		        this.animations = new Set();
		        this.transitions = new Set();
		        this.actions = new Set();
		        this.importedComponents = new Map();
		        this.used = {
		            components: new Set(),
		            helpers: new Set(),
		            events: new Set(),
		            animations: new Set(),
		            transitions: new Set(),
		            actions: new Set(),
		        };
		        this.declarations = [];
		        this.refs = new Set();
		        this.refCallees = [];
		        this.indirectDependencies = new Map();
		        this.file = options.filename && (typeof process !== 'undefined' ? options.filename.replace(process.cwd(), '').replace(/^[\/\\]/, '') : options.filename);
		        this.locate = getLocator(this.source);
		        // track which properties are needed, so we can provide useful info
		        // in dev mode
		        this.expectedProperties = new Set();
		        this.code = new MagicString(source);
		        // styles
		        this.stylesheet = new Stylesheet(source, ast, options.filename, options.dev);
		        this.stylesheet.validate(this);
		        // allow compiler to deconflict user's `import { get } from 'whatever'` and
		        // Svelte's builtin `import { get, ... } from 'svelte/shared.ts'`;
		        this.userVars = new Set();
		        this.templateVars = new Map();
		        this.aliases = new Map();
		        this.usedNames = new Set();
		        this.computations = [];
		        this.templateProperties = {};
		        this.properties = new Map();
		        this.walkJs();
		        this.name = this.alias(name);
		        if (options.customElement === true) {
		            this.customElement = {
		                tag: this.tag,
		                props: this.props
		            };
		        }
		        else {
		            this.customElement = options.customElement;
		        }
		        if (this.customElement && !this.customElement.tag) {
		            throw new Error(`No tag name specified`); // TODO better error
		        }
		        this.fragment = new Fragment(this, ast.html);
		        // this.walkTemplate();
		        if (!this.customElement)
		            this.stylesheet.reify();
		        this.stylesheet.warnOnUnusedSelectors(options.onwarn);
		        if (this.defaultExport) {
		            const categories = {
		                components: 'component',
		                helpers: 'helper',
		                events: 'event definition',
		                transitions: 'transition',
		                actions: 'actions',
		            };
		            Object.keys(categories).forEach(category => {
		                const definitions = this.defaultExport.declaration.properties.find(prop => prop.key.name === category);
		                if (definitions) {
		                    definitions.value.properties.forEach(prop => {
		                        const { name } = prop.key;
		                        if (!this.used[category].has(name)) {
		                            this.warn(prop, {
		                                code: `unused-${category.slice(0, -1)}`,
		                                message: `The '${name}' ${categories[category]} is unused`
		                            });
		                        }
		                    });
		                }
		            });
		        }
		        this.refCallees.forEach(callee => {
		            const { parts } = flattenReference(callee);
		            const ref = parts[1];
		            if (this.refs.has(ref)) ;
		            else {
		                const match = fuzzymatch(ref, Array.from(this.refs.keys()));
		                let message = `'refs.${ref}' does not exist`;
		                if (match)
		                    message += ` (did you mean 'refs.${match}'?)`;
		                this.error(callee, {
		                    code: `missing-ref`,
		                    message
		                });
		            }
		        });
		    }
		    addSourcemapLocations(node) {
		        walk(node, {
		            enter: (node) => {
		                this.code.addSourcemapLocation(node.start);
		                this.code.addSourcemapLocation(node.end);
		            },
		        });
		    }
		    alias(name) {
		        if (!this.aliases.has(name)) {
		            this.aliases.set(name, this.getUniqueName(name));
		        }
		        return this.aliases.get(name);
		    }
		    generate(result, options, { banner = '', name, format }) {
		        const pattern = /\[✂(\d+)-(\d+)$/;
		        const helpers = new Set();
		        // TODO use same regex for both
		        result = result.replace(options.generate === 'ssr' ? /(@+|#+|%+)(\w*(?:-\w*)?)/g : /(%+|@+)(\w*(?:-\w*)?)/g, (match, sigil, name) => {
		            if (sigil === '@') {
		                if (name in shared) {
		                    if (options.dev && `${name}Dev` in shared)
		                        name = `${name}Dev`;
		                    helpers.add(name);
		                }
		                return this.alias(name);
		            }
		            if (sigil === '%') {
		                return this.templateVars.get(name);
		            }
		            return sigil.slice(1) + name;
		        });
		        let importedHelpers;
		        if (options.shared) {
		            if (format !== 'es' && format !== 'cjs') {
		                throw new Error(`Components with shared helpers must be compiled with \`format: 'es'\` or \`format: 'cjs'\``);
		            }
		            importedHelpers = Array.from(helpers).sort().map(name => {
		                const alias = this.alias(name);
		                return { name, alias };
		            });
		        }
		        else {
		            let inlineHelpers = '';
		            const component = this;
		            importedHelpers = [];
		            helpers.forEach(name => {
		                const str = shared[name];
		                const code = new MagicString(str);
		                const expression = parseExpressionAt(str, 0);
		                let { scope } = annotateWithScopes(expression);
		                walk(expression, {
		                    enter(node, parent) {
		                        if (node._scope)
		                            scope = node._scope;
		                        if (node.type === 'Identifier' &&
		                            isReference(node, parent) &&
		                            !scope.has(node.name)) {
		                            if (node.name in shared) {
		                                // this helper function depends on another one
		                                const dependency = node.name;
		                                helpers.add(dependency);
		                                const alias = component.alias(dependency);
		                                if (alias !== node.name) {
		                                    code.overwrite(node.start, node.end, alias);
		                                }
		                            }
		                        }
		                    },
		                    leave(node) {
		                        if (node._scope)
		                            scope = scope.parent;
		                    },
		                });
		                if (name === 'transitionManager' || name === 'outros') {
		                    // special case
		                    const global = name === 'outros'
		                        ? `_svelteOutros`
		                        : `_svelteTransitionManager`;
		                    inlineHelpers += `\n\nvar ${this.alias(name)} = window.${global} || (window.${global} = ${code});\n\n`;
		                }
		                else if (name === 'escaped' || name === 'missingComponent' || name === 'invalidAttributeNameCharacter') {
		                    // vars are an awkward special case... would be nice to avoid this
		                    const alias = this.alias(name);
		                    inlineHelpers += `\n\nconst ${alias} = ${code};`;
		                }
		                else {
		                    const alias = this.alias(expression.id.name);
		                    if (alias !== expression.id.name) {
		                        code.overwrite(expression.id.start, expression.id.end, alias);
		                    }
		                    inlineHelpers += `\n\n${code}`;
		                }
		            });
		            result += inlineHelpers;
		        }
		        const sharedPath = options.shared === true
		            ? 'svelte/shared.js'
		            : options.shared || '';
		        const module = wrapModule(result, format, name, options, banner, sharedPath, importedHelpers, this.imports, this.shorthandImports, this.source);
		        const parts = module.split('✂]');
		        const finalChunk = parts.pop();
		        const compiled = new Bundle({ separator: '' });
		        function addString(str) {
		            compiled.addSource({
		                content: new MagicString(str),
		            });
		        }
		        const { filename } = options;
		        // special case — the source file doesn't actually get used anywhere. we need
		        // to add an empty file to populate map.sources and map.sourcesContent
		        if (!parts.length) {
		            compiled.addSource({
		                filename,
		                content: new MagicString(this.source).remove(0, this.source.length),
		            });
		        }
		        parts.forEach((str) => {
		            const chunk = str.replace(pattern, '');
		            if (chunk)
		                addString(chunk);
		            const match = pattern.exec(str);
		            const snippet = this.code.snip(+match[1], +match[2]);
		            compiled.addSource({
		                filename,
		                content: snippet,
		            });
		        });
		        addString(finalChunk);
		        const css = this.customElement ?
		            { code: null, map: null } :
		            this.stylesheet.render(options.cssOutputFilename, true);
		        const js = {
		            code: compiled.toString(),
		            map: compiled.generateMap({
		                includeContent: true,
		                file: options.outputFilename,
		            })
		        };
		        return {
		            ast: this.ast,
		            js,
		            css,
		            stats: this.stats.render(this)
		        };
		    }
		    getUniqueName(name) {
		        if (test)
		            name = `${name}$`;
		        let alias = name;
		        for (let i = 1; reservedNames.has(alias) ||
		            this.userVars.has(alias) ||
		            this.usedNames.has(alias); alias = `${name}_${i++}`)
		            ;
		        this.usedNames.add(alias);
		        return alias;
		    }
		    getUniqueNameMaker() {
		        const localUsedNames = new Set();
		        function add(name) {
		            localUsedNames.add(name);
		        }
		        reservedNames.forEach(add);
		        this.userVars.forEach(add);
		        return (name) => {
		            if (test)
		                name = `${name}$`;
		            let alias = name;
		            for (let i = 1; this.usedNames.has(alias) ||
		                localUsedNames.has(alias); alias = `${name}_${i++}`)
		                ;
		            localUsedNames.add(alias);
		            return alias;
		        };
		    }
		    error(pos, e) {
		        error$1(e.message, {
		            name: 'ValidationError',
		            code: e.code,
		            source: this.source,
		            start: pos.start,
		            end: pos.end,
		            filename: this.options.filename
		        });
		    }
		    warn(pos, warning) {
		        if (!this.locator) {
		            this.locator = getLocator(this.source, { offsetLine: 1 });
		        }
		        const start = this.locator(pos.start);
		        const end = this.locator(pos.end);
		        const frame = getCodeFrame(this.source, start.line - 1, start.column);
		        this.stats.warn({
		            code: warning.code,
		            message: warning.message,
		            frame,
		            start,
		            end,
		            pos: pos.start,
		            filename: this.options.filename,
		            toString: () => `${warning.message} (${start.line + 1}:${start.column})\n${frame}`,
		        });
		    }
		    processDefaultExport(node, indentExclusionRanges) {
		        const { templateProperties, source, code } = this;
		        if (node.declaration.type !== 'ObjectExpression') {
		            this.error(node.declaration, {
		                code: `invalid-default-export`,
		                message: `Default export must be an object literal`
		            });
		        }
		        checkForComputedKeys(this, node.declaration.properties);
		        checkForDupes(this, node.declaration.properties);
		        const props = this.properties;
		        node.declaration.properties.forEach((prop) => {
		            props.set(getMethodName(prop.key), prop);
		        });
		        const validPropList = Object.keys(propValidators);
		        // ensure all exported props are valid
		        node.declaration.properties.forEach((prop) => {
		            const name = getMethodName(prop.key);
		            const propValidator = propValidators[name];
		            if (propValidator) {
		                propValidator(this, prop);
		            }
		            else {
		                const match = fuzzymatch(name, validPropList);
		                if (match) {
		                    this.error(prop, {
		                        code: `unexpected-property`,
		                        message: `Unexpected property '${name}' (did you mean '${match}'?)`
		                    });
		                }
		                else if (/FunctionExpression/.test(prop.value.type)) {
		                    this.error(prop, {
		                        code: `unexpected-property`,
		                        message: `Unexpected property '${name}' (did you mean to include it in 'methods'?)`
		                    });
		                }
		                else {
		                    this.error(prop, {
		                        code: `unexpected-property`,
		                        message: `Unexpected property '${name}'`
		                    });
		                }
		            }
		        });
		        if (props.has('namespace')) {
		            const ns = nodeToString(props.get('namespace').value);
		            this.namespace = namespaces[ns] || ns;
		        }
		        node.declaration.properties.forEach((prop) => {
		            templateProperties[getMethodName(prop.key)] = prop;
		        });
		        ['helpers', 'events', 'components', 'transitions', 'actions', 'animations'].forEach(key => {
		            if (templateProperties[key]) {
		                templateProperties[key].value.properties.forEach((prop) => {
		                    this[key].add(getMethodName(prop.key));
		                });
		            }
		        });
		        const addArrowFunctionExpression = (type, name, node) => {
		            const { body, params, async } = node;
		            const fnKeyword = async ? 'async function' : 'function';
		            const paramString = params.length ?
		                `[✂${params[0].start}-${params[params.length - 1].end}✂]` :
		                ``;
		            const block = body.type === 'BlockStatement'
		                ? deindent `
					${fnKeyword} ${name}(${paramString}) [✂${body.start}-${body.end}✂]
				`
		                : deindent `
					${fnKeyword} ${name}(${paramString}) {
						return [✂${body.start}-${body.end}✂];
					}
				`;
		            this.declarations.push({ type, name, block, node });
		        };
		        const addFunctionExpression = (type, name, node) => {
		            const { async } = node;
		            const fnKeyword = async ? 'async function' : 'function';
		            let c = node.start;
		            while (this.source[c] !== '(')
		                c += 1;
		            const block = deindent `
				${fnKeyword} ${name}[✂${c}-${node.end}✂];
			`;
		            this.declarations.push({ type, name, block, node });
		        };
		        const addValue = (type, name, node) => {
		            const block = deindent `
				var ${name} = [✂${node.start}-${node.end}✂];
			`;
		            this.declarations.push({ type, name, block, node });
		        };
		        const addDeclaration = (type, key, node, allowShorthandImport, disambiguator, conflicts) => {
		            const qualified = disambiguator ? `${disambiguator}-${key}` : key;
		            if (node.type === 'Identifier' && node.name === key) {
		                this.templateVars.set(qualified, key);
		                return;
		            }
		            let deconflicted = key;
		            if (conflicts)
		                while (deconflicted in conflicts)
		                    deconflicted += '_';
		            let name = this.getUniqueName(deconflicted);
		            this.templateVars.set(qualified, name);
		            if (allowShorthandImport && node.type === 'Literal' && typeof node.value === 'string') {
		                this.shorthandImports.push({ name, source: node.value });
		                return;
		            }
		            // deindent
		            const indentationLevel = getIndentationLevel(source, node.start);
		            if (indentationLevel) {
		                removeIndentation(code, node.start, node.end, indentationLevel, indentExclusionRanges);
		            }
		            if (node.type === 'ArrowFunctionExpression') {
		                addArrowFunctionExpression(type, name, node);
		            }
		            else if (node.type === 'FunctionExpression') {
		                addFunctionExpression(type, name, node);
		            }
		            else {
		                addValue(type, name, node);
		            }
		        };
		        if (templateProperties.components) {
		            templateProperties.components.value.properties.forEach((property) => {
		                addDeclaration('components', getMethodName(property.key), property.value, true, 'components');
		            });
		        }
		        if (templateProperties.computed) {
		            const dependencies = new Map();
		            const fullStateComputations = [];
		            templateProperties.computed.value.properties.forEach((prop) => {
		                const key = getMethodName(prop.key);
		                const value = prop.value;
		                addDeclaration('computed', key, value, false, 'computed', {
		                    state: true,
		                    changed: true
		                });
		                const param = value.params[0];
		                const hasRestParam = (param.properties &&
		                    param.properties.some(prop => prop.type === 'RestElement'));
		                if (param.type !== 'ObjectPattern' || hasRestParam) {
		                    fullStateComputations.push({ key, deps: null, hasRestParam });
		                }
		                else {
		                    const deps = param.properties.map(prop => prop.key.name);
		                    deps.forEach(dep => {
		                        this.expectedProperties.add(dep);
		                    });
		                    dependencies.set(key, deps);
		                }
		            });
		            const visited = new Set();
		            const visit = (key) => {
		                if (!dependencies.has(key))
		                    return; // not a computation
		                if (visited.has(key))
		                    return;
		                visited.add(key);
		                const deps = dependencies.get(key);
		                deps.forEach(visit);
		                this.computations.push({ key, deps, hasRestParam: false });
		                const prop = templateProperties.computed.value.properties.find((prop) => getMethodName(prop.key) === key);
		            };
		            templateProperties.computed.value.properties.forEach((prop) => visit(getMethodName(prop.key)));
		            if (fullStateComputations.length > 0) {
		                this.computations.push(...fullStateComputations);
		            }
		        }
		        if (templateProperties.data) {
		            addDeclaration('data', 'data', templateProperties.data.value);
		        }
		        if (templateProperties.events) {
		            templateProperties.events.value.properties.forEach((property) => {
		                addDeclaration('events', getMethodName(property.key), property.value, false, 'events');
		            });
		        }
		        if (templateProperties.helpers) {
		            templateProperties.helpers.value.properties.forEach((property) => {
		                addDeclaration('helpers', getMethodName(property.key), property.value, false, 'helpers');
		            });
		        }
		        if (templateProperties.methods) {
		            addDeclaration('methods', 'methods', templateProperties.methods.value);
		            templateProperties.methods.value.properties.forEach(property => {
		                this.methods.add(getMethodName(property.key));
		            });
		        }
		        if (templateProperties.namespace) {
		            const ns = nodeToString(templateProperties.namespace.value);
		            this.namespace = namespaces[ns] || ns;
		        }
		        if (templateProperties.oncreate) {
		            addDeclaration('oncreate', 'oncreate', templateProperties.oncreate.value);
		        }
		        if (templateProperties.ondestroy) {
		            addDeclaration('ondestroy', 'ondestroy', templateProperties.ondestroy.value);
		        }
		        if (templateProperties.onstate) {
		            addDeclaration('onstate', 'onstate', templateProperties.onstate.value);
		        }
		        if (templateProperties.onupdate) {
		            addDeclaration('onupdate', 'onupdate', templateProperties.onupdate.value);
		        }
		        if (templateProperties.preload) {
		            addDeclaration('preload', 'preload', templateProperties.preload.value);
		        }
		        if (templateProperties.props) {
		            this.props = templateProperties.props.value.elements.map((element) => nodeToString(element));
		        }
		        if (templateProperties.setup) {
		            addDeclaration('setup', 'setup', templateProperties.setup.value);
		        }
		        if (templateProperties.store) {
		            addDeclaration('store', 'store', templateProperties.store.value);
		        }
		        if (templateProperties.tag) {
		            this.tag = nodeToString(templateProperties.tag.value);
		        }
		        if (templateProperties.transitions) {
		            templateProperties.transitions.value.properties.forEach((property) => {
		                addDeclaration('transitions', getMethodName(property.key), property.value, false, 'transitions');
		            });
		        }
		        if (templateProperties.animations) {
		            templateProperties.animations.value.properties.forEach((property) => {
		                addDeclaration('animations', getMethodName(property.key), property.value, false, 'animations');
		            });
		        }
		        if (templateProperties.actions) {
		            templateProperties.actions.value.properties.forEach((property) => {
		                addDeclaration('actions', getMethodName(property.key), property.value, false, 'actions');
		            });
		        }
		        this.defaultExport = node;
		    }
		    walkJs() {
		        const { js } = this.ast;
		        if (!js)
		            return;
		        this.addSourcemapLocations(js.content);
		        const { code, source, imports } = this;
		        const indentationLevel = getIndentationLevel(source, js.content.body[0].start);
		        const indentExclusionRanges = getIndentExclusionRanges(js.content);
		        const { scope, globals } = annotateWithScopes(js.content);
		        scope.declarations.forEach(name => {
		            this.userVars.add(name);
		        });
		        globals.forEach(name => {
		            this.userVars.add(name);
		        });
		        const body = js.content.body.slice(); // slice, because we're going to be mutating the original
		        body.forEach(node => {
		            // check there are no named exports
		            if (node.type === 'ExportNamedDeclaration') {
		                this.error(node, {
		                    code: `named-export`,
		                    message: `A component can only have a default export`
		                });
		            }
		            if (node.type === 'ExportDefaultDeclaration') {
		                this.processDefaultExport(node, indentExclusionRanges);
		            }
		            // imports need to be hoisted out of the IIFE
		            else if (node.type === 'ImportDeclaration') {
		                removeNode(code, js.content, node);
		                imports.push(node);
		                node.specifiers.forEach((specifier) => {
		                    this.userVars.add(specifier.local.name);
		                });
		            }
		        });
		        if (indentationLevel) {
		            if (this.defaultExport) {
		                removeIndentation(code, js.content.start, this.defaultExport.start, indentationLevel, indentExclusionRanges);
		                removeIndentation(code, this.defaultExport.end, js.content.end, indentationLevel, indentExclusionRanges);
		            }
		            else {
		                removeIndentation(code, js.content.start, js.content.end, indentationLevel, indentExclusionRanges);
		            }
		        }
		        let a = js.content.start;
		        while (/\s/.test(source[a]))
		            a += 1;
		        let b = js.content.end;
		        while (/\s/.test(source[b - 1]))
		            b -= 1;
		        this.javascript = this.defaultExport
		            ? [
		                a !== this.defaultExport.start ? `[✂${a}-${this.defaultExport.start}✂]` : '',
		                b !== this.defaultExport.end ? `[✂${this.defaultExport.end}-${b}✂]` : ''
		            ]
		            : [
		                a !== b ? `[✂${a}-${b}✂]` : '',
		                ''
		            ];
		    }
		}

		const seen = new Set();
		function deprecate(message, code = message) {
		    if (seen.has(code))
		        return;
		    seen.add(code);
		    console.warn(`[svelte] DEPRECATION: ${message}`);
		}

		function normalize_options(options) {
		    let normalized = assign({ generate: 'dom', dev: false }, options);
		    const { onwarn } = normalized;
		    normalized.onwarn = onwarn
		        ? (warning) => onwarn(warning, default_onwarn)
		        : default_onwarn;
		    return normalized;
		}
		function default_onwarn({ start, message }) {
		    if (start) {
		        console.warn(`(${start.line}:${start.column}) – ${message}`);
		    }
		    else {
		        console.warn(message);
		    }
		}
		function validate_options(options, stats) {
		    const { name, filename } = options;
		    if (name && !/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(name)) {
		        const error = new Error(`options.name must be a valid identifier (got '${name}')`);
		        throw error;
		    }
		    if (name && /^[a-z]/.test(name)) {
		        const message = `options.name should be capitalised`;
		        stats.warn({
		            code: `options-lowercase-name`,
		            message,
		            filename,
		            toString: () => message,
		        });
		    }
		}
		function compile(source, options = {}) {
		    const onerror = options.onerror || (err => {
		        throw err;
		    });
		    if (options.onerror) {
		        // TODO remove in v3
		        deprecate(`Instead of using options.onerror, wrap svelte.compile in a try-catch block`);
		        delete options.onerror;
		    }
		    options = normalize_options(options);
		    const stats = new Stats({
		        onwarn: options.onwarn
		    });
		    let ast;
		    try {
		        validate_options(options, stats);
		        stats.start('parse');
		        ast = parse$1(source, options);
		        stats.stop('parse');
		        stats.start('create component');
		        const component = new Component(ast, source, options.name || 'SvelteComponent', options, stats);
		        stats.stop('create component');
		        if (options.generate === false) {
		            return { ast, stats: stats.render(component), js: null, css: null };
		        }
		        if (options.generate === 'ssr') {
		            return ssr(component, options);
		        }
		        return dom(component, options);
		    }
		    catch (err) {
		        onerror(err);
		    }
		}

		/*! *****************************************************************************
		Copyright (c) Microsoft Corporation. All rights reserved.
		Licensed under the Apache License, Version 2.0 (the "License"); you may not use
		this file except in compliance with the License. You may obtain a copy of the
		License at http://www.apache.org/licenses/LICENSE-2.0

		THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
		KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
		WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
		MERCHANTABLITY OR NON-INFRINGEMENT.

		See the Apache Version 2.0 License for specific language governing permissions
		and limitations under the License.
		***************************************************************************** */

		function __awaiter$1(thisArg, _arguments, P, generator) {
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		}

		function parseAttributeValue(value) {
		    return /^['"]/.test(value) ?
		        value.slice(1, -1) :
		        value;
		}
		function parseAttributes(str) {
		    const attrs = {};
		    str.split(/\s+/).filter(Boolean).forEach(attr => {
		        const [name, value] = attr.split('=');
		        attrs[name] = value ? parseAttributeValue(value) : true;
		    });
		    return attrs;
		}
		function replaceTagContents(source, type, preprocessor, options) {
		    return __awaiter$1(this, void 0, void 0, function* () {
		        const exp = new RegExp(`<${type}([\\S\\s]*?)>([\\S\\s]*?)<\\/${type}>`, 'ig');
		        const match = exp.exec(source);
		        if (match) {
		            const attributes = parseAttributes(match[1]);
		            const content = match[2];
		            const processed = yield preprocessor({
		                content,
		                attributes,
		                filename: options.filename
		            });
		            if (processed && processed.code) {
		                return (source.slice(0, match.index) +
		                    `<${type}>${processed.code}</${type}>` +
		                    source.slice(match.index + match[0].length));
		            }
		        }
		        return source;
		    });
		}
		function preprocess(source, options) {
		    return __awaiter$1(this, void 0, void 0, function* () {
		        const { markup, style, script } = options;
		        if (!!markup) {
		            const processed = yield markup({
		                content: source,
		                filename: options.filename
		            });
		            source = processed.code;
		        }
		        if (!!style) {
		            source = yield replaceTagContents(source, 'style', style, options);
		        }
		        if (!!script) {
		            source = yield replaceTagContents(source, 'script', script, options);
		        }
		        return {
		            // TODO return separated output, in future version where svelte.compile supports it:
		            // style: { code: styleCode, map: styleMap },
		            // script { code: scriptCode, map: scriptMap },
		            // markup { code: markupCode, map: markupMap },
		            toString() {
		                return source;
		            }
		        };
		    });
		}

		function create$1(source, options = {}) {
		    const onerror = options.onerror || (err => {
		        throw err;
		    });
		    if (options.onerror) {
		        // TODO remove in v3
		        deprecate(`Instead of using options.onerror, wrap svelte.create in a try-catch block`);
		        delete options.onerror;
		    }
		    options.format = 'eval';
		    try {
		        const compiled = compile(source, options);
		        if (!compiled || !compiled.js.code) {
		            return;
		        }
		        return (new Function(`return ${compiled.js.code}`))();
		    }
		    catch (err) {
		        onerror(err);
		    }
		}
		const VERSION = '2.15.3';

		exports.create = create$1;
		exports.VERSION = VERSION;
		exports.compile = compile;
		exports.parse = parse$1;
		exports.preprocess = preprocess;

		Object.defineProperty(exports, '__esModule', { value: true });

	})));
	//# sourceMappingURL=svelte.js.map
	});

	unwrapExports(svelte);

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function _differsImmutable(a, b) {
		return a != a ? b == b : a !== b;
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto = {
		destroy,
		get,
		fire,
		on,
		set,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	function Store(state, options) {
		this._handlers = {};
		this._dependents = [];

		this._computed = blankObject();
		this._sortedComputedProperties = [];

		this._state = assign({}, state);
		this._differs = options && options.immutable ? _differsImmutable : _differs;
	}

	assign(Store.prototype, {
		_add(component, props) {
			this._dependents.push({
				component: component,
				props: props
			});
		},

		_init(props) {
			const state = {};
			for (let i = 0; i < props.length; i += 1) {
				const prop = props[i];
				state['$' + prop] = this._state[prop];
			}
			return state;
		},

		_remove(component) {
			let i = this._dependents.length;
			while (i--) {
				if (this._dependents[i].component === component) {
					this._dependents.splice(i, 1);
					return;
				}
			}
		},

		_set(newState, changed) {
			const previous = this._state;
			this._state = assign(assign({}, previous), newState);

			for (let i = 0; i < this._sortedComputedProperties.length; i += 1) {
				this._sortedComputedProperties[i].update(this._state, changed);
			}

			this.fire('state', {
				changed,
				previous,
				current: this._state
			});

			this._dependents
				.filter(dependent => {
					const componentState = {};
					let dirty = false;

					for (let j = 0; j < dependent.props.length; j += 1) {
						const prop = dependent.props[j];
						if (prop in changed) {
							componentState['$' + prop] = this._state[prop];
							dirty = true;
						}
					}

					if (dirty) {
						dependent.component._stage(componentState);
						return true;
					}
				})
				.forEach(dependent => {
					dependent.component.set({});
				});

			this.fire('update', {
				changed,
				previous,
				current: this._state
			});
		},

		_sortComputedProperties() {
			const computed = this._computed;
			const sorted = this._sortedComputedProperties = [];
			const visited = blankObject();
			let currentKey;

			function visit(key) {
				const c = computed[key];

				if (c) {
					c.deps.forEach(dep => {
						if (dep === currentKey) {
							throw new Error(`Cyclical dependency detected between ${dep} <-> ${key}`);
						}

						visit(dep);
					});

					if (!visited[key]) {
						visited[key] = true;
						sorted.push(c);
					}
				}
			}

			for (const key in this._computed) {
				visit(currentKey = key);
			}
		},

		compute(key, deps, fn) {
			let value;

			const c = {
				deps,
				update: (state, changed, dirty) => {
					const values = deps.map(dep => {
						if (dep in changed) dirty = true;
						return state[dep];
					});

					if (dirty) {
						const newValue = fn.apply(null, values);
						if (this._differs(newValue, value)) {
							value = newValue;
							changed[key] = true;
							state[key] = value;
						}
					}
				}
			};

			this._computed[key] = c;
			this._sortComputedProperties();

			const state = assign({}, this._state);
			const changed = {};
			c.update(state, changed, true);
			this._set(state, changed);
		},

		fire,

		get,

		on,

		set(newState) {
			const oldState = this._state;
			const changed = this._changed = {};
			let dirty = false;

			for (const key in newState) {
				if (this._computed[key]) throw new Error(`'${key}' is a read-only computed property`);
				if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
			}
			if (!dirty) return;

			this._set(newState, changed);
		}
	});

	/* src/Item.html generated by Svelte v2.15.3 */

	function create_main_fragment(component, ctx) {
		var text_value = ctx.getOptionLabel(ctx.item), text;

		return {
			c() {
				text = createText(text_value);
			},

			m(target, anchor) {
				insert(target, text, anchor);
			},

			p(changed, ctx) {
				if ((changed.getOptionLabel || changed.item) && text_value !== (text_value = ctx.getOptionLabel(ctx.item))) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(text);
				}
			}
		};
	}

	function Item(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Item.prototype, proto);

	/* src/List.html generated by Svelte v2.15.3 */

	function data() {
	  return {
	    hoverItemIndex: 0,
	    items: [],
	    Item,
	    selectedValue: undefined,
	    getOptionLabel: (option) => option.label
	  }
	}
	function itemClasses(hoverItemIndex, item, itemIndex, items, selectedValue) {
	  return `${selectedValue && (selectedValue.value === item.value) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;
	}
	var methods = {
	  handleSelect(item) {
	    this.fire('itemSelected', item);
	  },
	  handleHover(i) {
	    this.set({hoverItemIndex: i});
	  },
	  handleClick(item, i, event) {
	    event.stopPropagation();
	    this.set({activeItemIndex: i, hoverItemIndex: i});
	    this.handleSelect(item);
	  },
	  updateHoverItem(increment) {
	    let {items, hoverItemIndex} = this.get();

	    if (increment > 0 && hoverItemIndex === (items.length - 1)) {
	      hoverItemIndex = 0;
	    }
	    else if (increment < 0 && hoverItemIndex === 0) {
	      hoverItemIndex = items.length - 1;
	    }
	    else {
	      hoverItemIndex = hoverItemIndex + increment;
	    }

	    this.set({hoverItemIndex});
	    this.scrollToActiveItem('hover');
	  },
	  handleKeyDown(e) {
	    const {items, hoverItemIndex} = this.get();

	    switch (e.key) {
	      case 'ArrowDown':
	        e.preventDefault();
	        this.updateHoverItem(1);
	        break;
	      case 'ArrowUp':
	        e.preventDefault();
	        this.updateHoverItem(-1);
	        break;
	      case 'Enter':
	        e.preventDefault();
	        this.set({activeItemIndex: hoverItemIndex});
	        this.handleSelect(items[hoverItemIndex]);
	        break;
	      case 'Tab':
	        e.preventDefault();
	        this.set({activeItemIndex: hoverItemIndex});
	        this.handleSelect(items[hoverItemIndex]);
	        break;
	    }
	  },
	  scrollToActiveItem(className) {
	    const {container} = this.refs;
	    let offsetBounding;
	    const focusedElemBounding = container.querySelector(`.listItem.${className}`);

	    if (focusedElemBounding) {
	      offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
	    }

	    container.scrollTop -= offsetBounding;
	  }
	};

	function onupdate({changed, current}) {
	  if (changed.items && current.items.length > 0) {
	    if (!current.items[current.hoverItemIndex]) {
	      this.set({
	        hoverItemIndex: current.items.length - 1
	      });
	    }
	  }
	  if (changed.activeItemIndex && current.activeItemIndex > -1) {
	    this.set({
	      hoverItemIndex: current.activeItemIndex,
	    });

	    this.scrollToActiveItem('active');
	  }
	  if (changed.selectedValue && current.selectedValue) {
	    this.scrollToActiveItem('active');
	    if (current.items) {
	      const hoverItemIndex = current.items.findIndex((item) => item.value === current.selectedValue.value);
	      if (hoverItemIndex) {
	        this.set({hoverItemIndex});
	      }
	    }
	  }
	}
	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-1h82xdc-style';
		style.textContent = ".listContainer.svelte-1h82xdc{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;max-height:250px;overflow-y:auto;background:#fff}.listGroupTitle.svelte-1h82xdc{color:#8f8f8f;cursor:default;font-size:12px;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:uppercase}.listItem.svelte-1h82xdc{cursor:default;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap}.listItem.hover.svelte-1h82xdc{background:#e7f2ff}.listItem.svelte-1h82xdc:active{background:#b9daff}.listItem.svelte-1h82xdc:first-child{border-radius:4px 4px 0 0}.listItem.active.svelte-1h82xdc{background:#007aff;color:#fff}.empty.svelte-1h82xdc{text-align:center;padding:20px 0;color:#78848F}";
		append(document.head, style);
	}

	function click_handler(event) {
		const { component, ctx } = this._svelte;

		component.handleClick(ctx.item, ctx.i, event);
	}

	function mouseover_handler(event) {
		const { component, ctx } = this._svelte;

		component.handleHover(ctx.i);
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.item = list[i];
		child_ctx.i = i;
		return child_ctx;
	}

	function create_main_fragment$1(component, ctx) {
		var div;

		function onwindowkeydown(event) {
			component.handleKeyDown(event);	}
		window.addEventListener("keydown", onwindowkeydown);

		var each_value = ctx.items;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		var each_else = null;

		if (!each_value.length) {
			each_else = create_else_block(component, ctx);
			each_else.c();
		}

		return {
			c() {
				div = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				div.className = "listContainer svelte-1h82xdc";
			},

			m(target, anchor) {
				insert(target, div, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div, null);
				}

				if (each_else) {
					each_else.m(div, null);
				}

				component.refs.container = div;
			},

			p(changed, ctx) {
				if (changed.hoverItemIndex || changed.items || changed.selectedValue || changed.Item || changed.getOptionLabel) {
					each_value = ctx.items;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}

				if (each_value.length) {
					if (each_else) {
						each_else.d(1);
						each_else = null;
					}
				} else if (!each_else) {
					each_else = create_else_block(component, ctx);
					each_else.c();
					each_else.m(div, null);
				}
			},

			d(detach) {
				window.removeEventListener("keydown", onwindowkeydown);

				if (detach) {
					detachNode(div);
				}

				destroyEach(each_blocks, detach);

				if (each_else) each_else.d();

				if (component.refs.container === div) component.refs.container = null;
			}
		};
	}

	// (15:2) {:else}
	function create_else_block(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.textContent = "No options";
				div.className = "empty svelte-1h82xdc";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (5:2) {#if item.groupValue}
	function create_if_block(component, ctx) {
		var div, text_value = ctx.item.groupValue, text;

		return {
			c() {
				div = createElement("div");
				text = createText(text_value);
				div.className = "listGroupTitle svelte-1h82xdc";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, text);
			},

			p(changed, ctx) {
				if ((changed.items) && text_value !== (text_value = ctx.item.groupValue)) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (4:2) {#each items as item, i}
	function create_each_block(component, ctx) {
		var text0, div, text1, div_class_value;

		var if_block = (ctx.item.groupValue) && create_if_block(component, ctx);

		var switch_value = ctx.Item;

		function switch_props(ctx) {
			var switch_instance_initial_data = {
			 	item: ctx.item,
			 	getOptionLabel: ctx.getOptionLabel
			 };
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		return {
			c() {
				if (if_block) if_block.c();
				text0 = createText("\n\n  ");
				div = createElement("div");
				if (switch_instance) switch_instance._fragment.c();
				text1 = createText("\n  ");
				div._svelte = { component, ctx };

				addListener(div, "mouseover", mouseover_handler);
				addListener(div, "click", click_handler);
				div.className = div_class_value = "listItem " + itemClasses(ctx.hoverItemIndex, ctx.item, ctx.i, ctx.items, ctx.selectedValue) + " svelte-1h82xdc";
			},

			m(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, text0, anchor);
				insert(target, div, anchor);

				if (switch_instance) {
					switch_instance._mount(div, null);
				}

				append(div, text1);
			},

			p(changed, _ctx) {
				ctx = _ctx;
				if (ctx.item.groupValue) {
					if (if_block) {
						if_block.p(changed, ctx);
					} else {
						if_block = create_if_block(component, ctx);
						if_block.c();
						if_block.m(text0.parentNode, text0);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}

				var switch_instance_changes = {};
				if (changed.items) switch_instance_changes.item = ctx.item;
				if (changed.getOptionLabel) switch_instance_changes.getOptionLabel = ctx.getOptionLabel;

				if (switch_value !== (switch_value = ctx.Item)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(div, text1);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}

				div._svelte.ctx = ctx;
				if ((changed.hoverItemIndex || changed.items || changed.selectedValue) && div_class_value !== (div_class_value = "listItem " + itemClasses(ctx.hoverItemIndex, ctx.item, ctx.i, ctx.items, ctx.selectedValue) + " svelte-1h82xdc")) {
					div.className = div_class_value;
				}
			},

			d(detach) {
				if (if_block) if_block.d(detach);
				if (detach) {
					detachNode(text0);
					detachNode(div);
				}

				if (switch_instance) switch_instance.destroy();
				removeListener(div, "mouseover", mouseover_handler);
				removeListener(div, "click", click_handler);
			}
		};
	}

	function List(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data(), options.data);
		this._intro = true;
		this._handlers.update = [onupdate];

		if (!document.getElementById("svelte-1h82xdc-style")) add_css();

		this._fragment = create_main_fragment$1(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(List.prototype, proto);
	assign(List.prototype, methods);

	/* src/Selection.html generated by Svelte v2.15.3 */

	function create_main_fragment$2(component, ctx) {
		var text_value = ctx.getSelectionLabel(ctx.selectedValue), text;

		return {
			c() {
				text = createText(text_value);
			},

			m(target, anchor) {
				insert(target, text, anchor);
			},

			p(changed, ctx) {
				if ((changed.getSelectionLabel || changed.selectedValue) && text_value !== (text_value = ctx.getSelectionLabel(ctx.selectedValue))) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(text);
				}
			}
		};
	}

	function Selection(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._fragment = create_main_fragment$2(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Selection.prototype, proto);

	/* src/MultiSelection.html generated by Svelte v2.15.3 */

	function add_css$1() {
		var style = createElement("style");
		style.id = 'svelte-a64isl-style';
		style.textContent = ".multiSelectItem.svelte-a64isl{background:#E8EAED;margin-right:5px;border-radius:4px;line-height:26px;display:flex;cursor:default}.multiSelectItem_label.svelte-a64isl{padding:0 5px 0 10px}.multiSelectItem_clear.svelte-a64isl{border-radius:0 4px 4px 0;width:20px;text-align:center}.multiSelectItem_clear.svelte-a64isl:hover{background-color:red}.multiSelectItem_clear.svelte-a64isl svg.svelte-a64isl{width:14px;height:14px;position:relative;top:3px}";
		append(document.head, style);
	}

	function get_each_context$1(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.value = list[i];
		return child_ctx;
	}

	function create_main_fragment$3(component, ctx) {
		var each_anchor;

		var each_value = ctx.selectedValue;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$1(component, get_each_context$1(ctx, each_value, i));
		}

		return {
			c() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insert(target, each_anchor, anchor);
			},

			p(changed, ctx) {
				if (changed.selectedValue) {
					each_value = ctx.selectedValue;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$1(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block$1(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}
			},

			d(detach) {
				destroyEach(each_blocks, detach);

				if (detach) {
					detachNode(each_anchor);
				}
			}
		};
	}

	// (1:0) {#each selectedValue as value}
	function create_each_block$1(component, ctx) {
		var div2, div0, text0_value = ctx.value.label, text0, text1, div1, text2;

		return {
			c() {
				div2 = createElement("div");
				div0 = createElement("div");
				text0 = createText(text0_value);
				text1 = createText("\n  ");
				div1 = createElement("div");
				div1.innerHTML = `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-a64isl"><path d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
				text2 = createText("\n");
				div0.className = "multiSelectItem_label svelte-a64isl";
				div1.className = "multiSelectItem_clear svelte-a64isl";
				div2.className = "multiSelectItem svelte-a64isl";
			},

			m(target, anchor) {
				insert(target, div2, anchor);
				append(div2, div0);
				append(div0, text0);
				append(div2, text1);
				append(div2, div1);
				append(div2, text2);
			},

			p(changed, ctx) {
				if ((changed.selectedValue) && text0_value !== (text0_value = ctx.value.label)) {
					setData(text0, text0_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div2);
				}
			}
		};
	}

	function MultiSelection(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-a64isl-style")) add_css$1();

		this._fragment = create_main_fragment$3(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(MultiSelection.prototype, proto);

	/* src/Select.html generated by Svelte v2.15.3 */



	function containerClasses({isMulti, isDisabled, isFocused}) {
	  let classes = `selectContainer`;
	  classes += isMulti ? ' multiSelect' : '';
	  classes += isDisabled ? ' disabled' : '';
	  classes += isFocused ? ' focused' : '';

	  return classes;
	}
	function showSelectedItem({selectedValue, filterText}) {
	  return selectedValue && filterText.length === 0;
	}
	function placeholderText({selectedValue, placeholder}) {
	  return selectedValue ? '' : placeholder
	}
	function filteredItems({items, filterText, groupBy, groupFilter, getOptionLabel, isMulti, selectedValue}) {
	  const filteredItems = items.filter(item => {
	    let keepItem = true;

	    if (isMulti && selectedValue) {
	      keepItem = !selectedValue.find(({value}) => {
	        return value === item.value
	      });
	    }
	    if (keepItem && filterText.length < 1) return true;
	    return getOptionLabel(item).toLowerCase().includes(filterText.toLowerCase());
	  });

	  if(groupBy) {
	    const groupValues = [];
	    const groups = {};

	    filteredItems.forEach((item) => {
	      const groupValue = groupBy(item);

	      if(!groupValues.includes(groupValue)) {
	        groupValues.push(groupValue);
	        groups[groupValue] = [];
	        groups[groupValue].push(Object.assign({groupValue}, item));
	      } else {
	        groups[groupValue].push(Object.assign({}, item));
	      }

	      groups[groupValue].push();
	    });

	    const sortedGroupedItems = [];

	    groupFilter(groupValues).forEach((groupValue) => {
	      sortedGroupedItems.push(...groups[groupValue]);
	    });

	    return sortedGroupedItems;
	  }

	  return filteredItems;
	}
	function data$1() {
	  return {
	    containerStyles: undefined,
	    items: [],
	    filterText: '',
	    listOpen: false,
	    Item,
	    Selection,
	    MultiSelection,
	    paddingLeft: 0,
	    list: undefined,
	    target: undefined,
	    // selectedItem: undefined,
	    selectedValue: undefined,
	    isClearable: true,
	    isSearchable: true,
	    getOptionLabel: (option) => option.label,
	    getSelectionLabel: (option) => option.label,
	    placeholder: 'Select...',
	    groupBy: undefined,
	    groupFilter: (groups) => groups,
	    isMulti: false
	  }
	}
	var methods$1 = {
	  getPosition() {
	    const {target} = this.get();
	    if (!target) return;
	    const {top, height, width} = this.refs.container.getBoundingClientRect();
	    target.style.top = `${height + 5}px`;
	    target.style.minWidth = `${width}px`;
	    target.style.left = '0';
	    this.set({target});
	  },
	  handleKeyDown(e) {
	    const {isFocused, listOpen} = this.get();

	    if (!isFocused) return;

	    switch (e.key) {
	      case 'ArrowDown':
	        e.preventDefault();
	        this.set({listOpen: true});
	        break;
	      case 'ArrowUp':
	        e.preventDefault();
	        this.set({listOpen: true});
	        break;
	      case 'Tab':
	        if (!listOpen) this.set({isFocused: false});
	        break;
	    }
	  },
	  handleFocus() {
	    this.set({isFocused: true});
	    if (this.refs.input) this.refs.input.focus();
	  },
	  removeList() {
	    let {list, target} = this.get();
	    this.set({filterText: ''});

	    if (!list) return;
	    list.destroy();
	    list = undefined;

	    if (!target) return;
	    target.parentNode.removeChild(target);
	    target = undefined;

	    this.set({list, target});
	  },
	  handleWindowClick(event) {
	    if (!this.refs.container) return;
	    if (this.refs.container.contains(event.target)) return;
	    this.set({isFocused: false, listOpen: false});
	    if (this.refs.input) this.refs.input.blur();
	  },
	  handleClick() {
	    const {isDisabled, listOpen} = this.get();
	    if (isDisabled) return;
	    this.set({isFocused: true, listOpen: !listOpen});
	  },
	  handleClear(e) {
	    e.stopPropagation();
	    this.set({selectedValue: undefined, listOpen: false});
	    this.handleFocus();
	  },
	  loadList() {
	    let {target, list} = this.get();
	    if (target && list) return;
	    target = document.createElement('div');

	    Object.assign(target.style, {
	      position: 'absolute',
	      'z-index': 2
	    });

	    this.set({list, target});

	    this.getPosition();
	    this.refs.container.appendChild(target);

	    let {Item: Item$$1, getOptionLabel, items, selectedValue, filteredItems, isMulti} = this.get();
	    const data = {Item: Item$$1};

	    if (getOptionLabel) {
	      data.getOptionLabel = getOptionLabel;
	    }

	    list = new List({
	      target,
	      data
	    });

	    if (items) {
	      list.set({items: filteredItems, selectedValue});
	    }

	    list.on('itemSelected', (newSelection) => {
	      if (newSelection) {
	        if (isMulti) {
	          selectedValue = selectedValue ? selectedValue.concat([Object.assign({}, newSelection)]) : [Object.assign({}, newSelection)];
	        } else {
	          selectedValue = Object.assign({}, newSelection);
	        }

	        this.set({
	          selectedValue,
	          listOpen: false
	        });
	      }
	    });

	    this.set({list, target});
	  }
	};

	function oncreate() {
	  const {listOpen} = this.get();
	  if (listOpen) this.loadList();
	}
	function ondestroy() {
	  this.removeList();
	}
	function onstate({changed, current, previous}) {
	  if (!previous) return;

	  if (changed.listOpen) {
	    if (current.listOpen) {
	      this.loadList();
	    } else {
	      this.removeList();
	    }
	  }

	  if (changed.filterText && current.filterText.length === 1) {
	    this.loadList();
	    this.set({listOpen: true});
	  }

	  if (changed.isFocused) {
	    const {isFocused} = current;
	    if (isFocused) {
	      this.handleFocus();
	    } else {
	      this.set({filterText: ''});
	    }
	  }

	  if (changed.filteredItems && current.list) {
	    current.list.set({items: current.filteredItems});
	  }
	}
	function add_css$2() {
		var style = createElement("style");
		style.id = 'svelte-5604wf-style';
		style.textContent = ".selectContainer.svelte-5604wf{border:1px solid #D8DBDF;border-radius:3px;height:44px;position:relative;display:flex;padding:0 16px}.selectContainer.svelte-5604wf input.svelte-5604wf{cursor:default;border:none;color:#3F4F5F;height:44px;line-height:44px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px;position:absolute;left:0}.selectContainer.svelte-5604wf input.svelte-5604wf::placeholder{color:#78848F}.selectContainer.svelte-5604wf input.svelte-5604wf:focus{outline:none}.selectContainer.svelte-5604wf:hover{border-color:#b2b8bf}.selectContainer.focused.svelte-5604wf{border-color:#006FE8}.selectContainer.disabled.svelte-5604wf{background:#F6F7F8;border-color:#F6F7F8;color:#C1C6CC}.selectContainer.disabled.svelte-5604wf input.svelte-5604wf::placeholder{color:#C1C6CC}.selectedItem.svelte-5604wf{line-height:44px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;padding-right:20px}.selectedItem.svelte-5604wf:focus{outline:none}.clearSelectedItem.svelte-5604wf{position:absolute;right:10px;top:11px;width:20px;height:20px;color:#c5cacf}.clearSelectedItem.svelte-5604wf:hover{color:#2c3e50}.selectContainer.focused.svelte-5604wf .clearSelectedItem.svelte-5604wf{color:#3F4F5F}.indicator.svelte-5604wf{position:absolute;right:10px;top:11px;width:20px;height:20px;color:#c5cacf}.indicator.svelte-5604wf svg.svelte-5604wf{display:inline-block;fill:currentcolor;line-height:1;stroke:currentcolor;stroke-width:0}.spinner.svelte-5604wf{position:absolute;right:10px;top:11px;width:20px;height:20px;color:#51ce6c;animation:svelte-5604wf-rotate 0.75s linear infinite}.spinner_icon.svelte-5604wf{display:block;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;-webkit-transform:none}.spinner_path.svelte-5604wf{stroke-dasharray:90;stroke-linecap:round}.multiSelect.svelte-5604wf{display:flex;padding:0 16px}.selectContainer.multiSelect.svelte-5604wf input.svelte-5604wf{width:auto;padding:0;flex-grow:1;position:relative}.multiSelectItems.svelte-5604wf{display:flex;padding:8px 0}@keyframes svelte-5604wf-rotate{100%{transform:rotate(360deg)}}";
		append(document.head, style);
	}

	function create_main_fragment$4(component, ctx) {
		var div, text0, input, input_updating = false, input_readonly_value, text1, text2, text3, text4;

		function onwindowclick(event) {
			component.handleWindowClick(event);	}
		window.addEventListener("click", onwindowclick);

		function onwindowkeydown(event) {
			component.handleKeyDown(event);	}
		window.addEventListener("keydown", onwindowkeydown);

		function onwindowresize(event) {
			component.getPosition();	}
		window.addEventListener("resize", onwindowresize);

		var if_block0 = (ctx.isMulti && ctx.selectedValue && ctx.selectedValue.length > 0) && create_if_block_4(component, ctx);

		function input_input_handler() {
			input_updating = true;
			component.set({ filterText: input.value });
			input_updating = false;
		}

		function focus_handler(event) {
			component.handleFocus();
		}

		var if_block1 = (!ctx.isMulti && ctx.showSelectedItem) && create_if_block_3(component, ctx);

		var if_block2 = (ctx.showSelectedItem && ctx.isClearable && !ctx.isDisabled && !ctx.isWaiting) && create_if_block_2(component, ctx);

		var if_block3 = (!ctx.isSearchable && !ctx.isDisabled && !ctx.isWaiting && (ctx.showSelectedItem && !ctx.isClearable || !ctx.showSelectedItem)) && create_if_block_1(component, ctx);

		var if_block4 = (ctx.isWaiting) && create_if_block$1(component, ctx);

		function click_handler(event) {
			component.handleClick();
		}

		return {
			c() {
				div = createElement("div");
				if (if_block0) if_block0.c();
				text0 = createText("\n\n  ");
				input = createElement("input");
				text1 = createText("\n\n  ");
				if (if_block1) if_block1.c();
				text2 = createText("\n\n  ");
				if (if_block2) if_block2.c();
				text3 = createText("\n\n  ");
				if (if_block3) if_block3.c();
				text4 = createText("\n\n  ");
				if (if_block4) if_block4.c();
				addListener(input, "input", input_input_handler);
				addListener(input, "focus", focus_handler);
				input.readOnly = input_readonly_value = !ctx.isSearchable;
				input.autocomplete = "off";
				setAttribute(input, "autocorrect", "off");
				input.spellcheck = "false";
				input.placeholder = ctx.placeholderText;
				input.disabled = ctx.isDisabled;
				input.style.cssText = ctx.inputStyles;
				input.className = "svelte-5604wf";
				addListener(div, "click", click_handler);
				div.className = "" + ctx.containerClasses + " svelte-5604wf";
				div.style.cssText = ctx.containerStyles;
			},

			m(target, anchor) {
				insert(target, div, anchor);
				if (if_block0) if_block0.m(div, null);
				append(div, text0);
				append(div, input);
				component.refs.input = input;

				input.value = ctx.filterText;

				append(div, text1);
				if (if_block1) if_block1.m(div, null);
				append(div, text2);
				if (if_block2) if_block2.m(div, null);
				append(div, text3);
				if (if_block3) if_block3.m(div, null);
				append(div, text4);
				if (if_block4) if_block4.m(div, null);
				component.refs.container = div;
			},

			p(changed, ctx) {
				if (ctx.isMulti && ctx.selectedValue && ctx.selectedValue.length > 0) {
					if (if_block0) {
						if_block0.p(changed, ctx);
					} else {
						if_block0 = create_if_block_4(component, ctx);
						if_block0.c();
						if_block0.m(div, text0);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (!input_updating && changed.filterText) input.value = ctx.filterText;
				if ((changed.isSearchable) && input_readonly_value !== (input_readonly_value = !ctx.isSearchable)) {
					input.readOnly = input_readonly_value;
				}

				if (changed.placeholderText) {
					input.placeholder = ctx.placeholderText;
				}

				if (changed.isDisabled) {
					input.disabled = ctx.isDisabled;
				}

				if (changed.inputStyles) {
					input.style.cssText = ctx.inputStyles;
				}

				if (!ctx.isMulti && ctx.showSelectedItem) {
					if (if_block1) {
						if_block1.p(changed, ctx);
					} else {
						if_block1 = create_if_block_3(component, ctx);
						if_block1.c();
						if_block1.m(div, text2);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (ctx.showSelectedItem && ctx.isClearable && !ctx.isDisabled && !ctx.isWaiting) {
					if (!if_block2) {
						if_block2 = create_if_block_2(component, ctx);
						if_block2.c();
						if_block2.m(div, text3);
					}
				} else if (if_block2) {
					if_block2.d(1);
					if_block2 = null;
				}

				if (!ctx.isSearchable && !ctx.isDisabled && !ctx.isWaiting && (ctx.showSelectedItem && !ctx.isClearable || !ctx.showSelectedItem)) {
					if (!if_block3) {
						if_block3 = create_if_block_1(component, ctx);
						if_block3.c();
						if_block3.m(div, text4);
					}
				} else if (if_block3) {
					if_block3.d(1);
					if_block3 = null;
				}

				if (ctx.isWaiting) {
					if (!if_block4) {
						if_block4 = create_if_block$1(component, ctx);
						if_block4.c();
						if_block4.m(div, null);
					}
				} else if (if_block4) {
					if_block4.d(1);
					if_block4 = null;
				}

				if (changed.containerClasses) {
					div.className = "" + ctx.containerClasses + " svelte-5604wf";
				}

				if (changed.containerStyles) {
					div.style.cssText = ctx.containerStyles;
				}
			},

			d(detach) {
				window.removeEventListener("click", onwindowclick);

				window.removeEventListener("keydown", onwindowkeydown);

				window.removeEventListener("resize", onwindowresize);

				if (detach) {
					detachNode(div);
				}

				if (if_block0) if_block0.d();
				removeListener(input, "input", input_input_handler);
				removeListener(input, "focus", focus_handler);
				if (component.refs.input === input) component.refs.input = null;
				if (if_block1) if_block1.d();
				if (if_block2) if_block2.d();
				if (if_block3) if_block3.d();
				if (if_block4) if_block4.d();
				removeListener(div, "click", click_handler);
				if (component.refs.container === div) component.refs.container = null;
			}
		};
	}

	// (9:2) {#if isMulti && selectedValue && selectedValue.length > 0}
	function create_if_block_4(component, ctx) {
		var div;

		var switch_value = ctx.MultiSelection;

		function switch_props(ctx) {
			var switch_instance_initial_data = {
			 	selectedValue: ctx.selectedValue,
			 	getSelectionLabel: ctx.getSelectionLabel
			 };
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		function focus_handler(event) {
			component.handleFocus();
		}

		return {
			c() {
				div = createElement("div");
				if (switch_instance) switch_instance._fragment.c();
				addListener(div, "focus", focus_handler);
				div.className = "multiSelectItems svelte-5604wf";
			},

			m(target, anchor) {
				insert(target, div, anchor);

				if (switch_instance) {
					switch_instance._mount(div, null);
				}

				component.refs.selectedItem = div;
			},

			p(changed, ctx) {
				var switch_instance_changes = {};
				if (changed.selectedValue) switch_instance_changes.selectedValue = ctx.selectedValue;
				if (changed.getSelectionLabel) switch_instance_changes.getSelectionLabel = ctx.getSelectionLabel;

				if (switch_value !== (switch_value = ctx.MultiSelection)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(div, null);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				if (switch_instance) switch_instance.destroy();
				removeListener(div, "focus", focus_handler);
				if (component.refs.selectedItem === div) component.refs.selectedItem = null;
			}
		};
	}

	// (28:2) {#if !isMulti && showSelectedItem }
	function create_if_block_3(component, ctx) {
		var div;

		var switch_value = ctx.Selection;

		function switch_props(ctx) {
			var switch_instance_initial_data = {
			 	selectedValue: ctx.selectedValue,
			 	getSelectionLabel: ctx.getSelectionLabel
			 };
			return {
				root: component.root,
				store: component.store,
				data: switch_instance_initial_data
			};
		}

		if (switch_value) {
			var switch_instance = new switch_value(switch_props(ctx));
		}

		function focus_handler(event) {
			component.handleFocus();
		}

		return {
			c() {
				div = createElement("div");
				if (switch_instance) switch_instance._fragment.c();
				addListener(div, "focus", focus_handler);
				div.className = "selectedItem svelte-5604wf";
			},

			m(target, anchor) {
				insert(target, div, anchor);

				if (switch_instance) {
					switch_instance._mount(div, null);
				}

				component.refs.selectedItem = div;
			},

			p(changed, ctx) {
				var switch_instance_changes = {};
				if (changed.selectedValue) switch_instance_changes.selectedValue = ctx.selectedValue;
				if (changed.getSelectionLabel) switch_instance_changes.getSelectionLabel = ctx.getSelectionLabel;

				if (switch_value !== (switch_value = ctx.Selection)) {
					if (switch_instance) {
						switch_instance.destroy();
					}

					if (switch_value) {
						switch_instance = new switch_value(switch_props(ctx));
						switch_instance._fragment.c();
						switch_instance._mount(div, null);
					} else {
						switch_instance = null;
					}
				}

				else if (switch_value) {
					switch_instance._set(switch_instance_changes);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				if (switch_instance) switch_instance.destroy();
				removeListener(div, "focus", focus_handler);
				if (component.refs.selectedItem === div) component.refs.selectedItem = null;
			}
		};
	}

	// (34:2) {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
	function create_if_block_2(component, ctx) {
		var div;

		function click_handler(event) {
			component.handleClear(event);
		}

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-5604wf"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
				addListener(div, "click", click_handler);
				div.className = "clearSelectedItem svelte-5604wf";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	// (44:2) {#if !isSearchable && !isDisabled && !isWaiting && (showSelectedItem && !isClearable || !showSelectedItem)}
	function create_if_block_1(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" class="css-19bqh2r svelte-5604wf"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;
				div.className = "indicator svelte-5604wf";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	// (53:2) {#if isWaiting}
	function create_if_block$1(component, ctx) {
		var div;

		return {
			c() {
				div = createElement("div");
				div.innerHTML = `<svg class="spinner_icon svelte-5604wf" viewBox="25 25 50 50"><circle class="spinner_path svelte-5604wf" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg>`;
				div.className = "spinner svelte-5604wf";
			},

			m(target, anchor) {
				insert(target, div, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function Select(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data$1(), options.data);

		this._recompute({ isMulti: 1, isDisabled: 1, isFocused: 1, selectedValue: 1, filterText: 1, placeholder: 1, items: 1, groupBy: 1, groupFilter: 1, getOptionLabel: 1 }, this._state);
		this._intro = true;

		this._handlers.state = [onstate];

		this._handlers.destroy = [ondestroy];

		if (!document.getElementById("svelte-5604wf-style")) add_css$2();

		onstate.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$4(this, this._state);

		this.root._oncreate.push(() => {
			oncreate.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(Select.prototype, proto);
	assign(Select.prototype, methods$1);

	Select.prototype._recompute = function _recompute(changed, state) {
		if (changed.isMulti || changed.isDisabled || changed.isFocused) {
			if (this._differs(state.containerClasses, (state.containerClasses = containerClasses(state)))) changed.containerClasses = true;
		}

		if (changed.selectedValue || changed.filterText) {
			if (this._differs(state.showSelectedItem, (state.showSelectedItem = showSelectedItem(state)))) changed.showSelectedItem = true;
		}

		if (changed.selectedValue || changed.placeholder) {
			if (this._differs(state.placeholderText, (state.placeholderText = placeholderText(state)))) changed.placeholderText = true;
		}

		if (changed.items || changed.filterText || changed.groupBy || changed.groupFilter || changed.getOptionLabel || changed.isMulti || changed.selectedValue) {
			if (this._differs(state.filteredItems, (state.filteredItems = filteredItems(state)))) changed.filteredItems = true;
		}
	};

	/* test/src/Select/Select--default.html generated by Svelte v2.15.3 */

	function add_css$3() {
		var style = createElement("style");
		style.id = 'svelte-k3oaj2-style';
		style.textContent = ".selectContainer.svelte-k3oaj2{border:1px solid #D8DBDF;border-radius:3px;height:44px}.selectContainer.svelte-k3oaj2 input.svelte-k3oaj2{border:none;color:#3F4F5F;height:44px;line-height:44px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px}.selectContainer.svelte-k3oaj2 input.svelte-k3oaj2::placeholder{color:#78848F}.selectContainer.svelte-k3oaj2:hover{border-color:#b2b8bf}.selectContainer.svelte-k3oaj2 input.svelte-k3oaj2:focus{outline:none}";
		append(document.head, style);
	}

	function create_main_fragment$5(component, ctx) {
		var link, text, div;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div = createElement("div");
				div.innerHTML = `<input autocomplete="off" autocorrect="off" spellcheck="true" placeholder="Select..." class="svelte-k3oaj2">`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div.className = "selectContainer svelte-k3oaj2";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div);
				}
			}
		};
	}

	function Select_default(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-k3oaj2-style")) add_css$3();

		this._fragment = create_main_fragment$5(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Select_default.prototype, proto);

	/* test/src/Select/Select--focus.html generated by Svelte v2.15.3 */

	function add_css$4() {
		var style = createElement("style");
		style.id = 'svelte-tpcifk-style';
		style.textContent = ".selectContainer.svelte-tpcifk{width:430px;border:1px solid #D8DBDF;border-radius:3px;height:44px}.selectContainer.svelte-tpcifk input.svelte-tpcifk{border:none;color:#3F4F5F;height:44px;line-height:44px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px}.selectContainer.svelte-tpcifk input.svelte-tpcifk::placeholder{color:#78848F}.selectContainer.svelte-tpcifk input.svelte-tpcifk:focus{outline:none}.selectContainer.focused.svelte-tpcifk{border-color:#006FE8}";
		append(document.head, style);
	}

	function create_main_fragment$6(component, ctx) {
		var link, text, div;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div = createElement("div");
				div.innerHTML = `<input autocomplete="off" autocorrect="off" spellcheck="true" placeholder="Select..." class="svelte-tpcifk">`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div.className = "selectContainer focused svelte-tpcifk";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div);
				}
			}
		};
	}

	function Select_focus(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-tpcifk-style")) add_css$4();

		this._fragment = create_main_fragment$6(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Select_focus.prototype, proto);

	/* test/src/Select/Select--itemSelected.html generated by Svelte v2.15.3 */

	function add_css$5() {
		var style = createElement("style");
		style.id = 'svelte-1eqcgt4-style';
		style.textContent = ".selectContainer.svelte-1eqcgt4{border:1px solid #D8DBDF;border-radius:3px;height:44px;position:relative}.selectContainer.svelte-1eqcgt4 input.svelte-1eqcgt4{border:none;color:#3F4F5F;height:44px;line-height:44px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px}.selectContainer.svelte-1eqcgt4 input.svelte-1eqcgt4::placeholder{color:#78848F}.selectContainer.svelte-1eqcgt4:hover{border-color:#b2b8bf}.selectContainer.svelte-1eqcgt4 input.svelte-1eqcgt4:focus{outline:none}.selectedItem.svelte-1eqcgt4{padding:0 16px;line-height:44px}.clearSelectedItem.svelte-1eqcgt4{position:absolute;right:10px;top:12px;width:20px;height:20px;color:#c5cacf}.clearSelectedItem.svelte-1eqcgt4:hover{color:#2c3e50}";
		append(document.head, style);
	}

	function create_main_fragment$7(component, ctx) {
		var link, text, div_2;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_2 = createElement("div");
				div_2.innerHTML = `<input autocomplete="off" autocorrect="off" spellcheck="true" placeholder="" class="svelte-1eqcgt4">
			  <div class="selectedItem svelte-1eqcgt4">Chips</div>
			  <div class="clearSelectedItem svelte-1eqcgt4"><svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg></div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_2.className = "selectContainer svelte-1eqcgt4";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_2, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_2);
				}
			}
		};
	}

	function Select_itemSelected(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-1eqcgt4-style")) add_css$5();

		this._fragment = create_main_fragment$7(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Select_itemSelected.prototype, proto);

	/* test/src/Select/Select--multiSelected.html generated by Svelte v2.15.3 */

	function add_css$6() {
		var style = createElement("style");
		style.id = 'svelte-apwq0z-style';
		style.textContent = ".selectContainer.svelte-apwq0z{border:1px solid #D8DBDF;border-radius:3px;height:44px;position:relative}.selectContainer.svelte-apwq0z input.svelte-apwq0z{border:none;color:#3F4F5F;height:44px;line-height:44px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px}.selectContainer.svelte-apwq0z input.svelte-apwq0z::placeholder{color:#78848F}.selectContainer.svelte-apwq0z:hover{border-color:#b2b8bf}.selectContainer.svelte-apwq0z input.svelte-apwq0z:focus{outline:none}.clearSelectedItem.svelte-apwq0z{position:absolute;right:10px;top:12px;width:20px;height:20px;color:#c5cacf}.clearSelectedItem.svelte-apwq0z:hover{color:#2c3e50}.multiSelect.svelte-apwq0z{display:flex;padding:0 16px}.multiSelectItems.svelte-apwq0z{display:flex;padding:8px 0}.multiSelectItem.svelte-apwq0z{background:#E8EAED;margin-right:5px;border-radius:4px;line-height:26px;display:flex;cursor:default}.multiSelectItem_label.svelte-apwq0z{padding:0 5px 0 10px}.selectContainer.multiSelect.svelte-apwq0z input.svelte-apwq0z{width:auto;padding:0;flex-grow:1}.multiSelectItem_clear.svelte-apwq0z{border-radius:0 4px 4px 0;width:20px;text-align:center}.multiSelectItem_clear.svelte-apwq0z:hover{background-color:red}.multiSelectItem_clear.svelte-apwq0z svg.svelte-apwq0z{width:14px;height:14px;position:relative;top:3px}";
		append(document.head, style);
	}

	function create_main_fragment$8(component, ctx) {
		var link, text, div_8;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_8 = createElement("div");
				div_8.innerHTML = `<div class="multiSelectItems svelte-apwq0z"><div class="multiSelectItem svelte-apwq0z"><div class="multiSelectItem_label svelte-apwq0z">
			        Pizza
			      </div>
			      <div class="multiSelectItem_clear svelte-apwq0z"><svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-apwq0z"><path d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg></div></div>
			    <div class="multiSelectItem svelte-apwq0z"><div class="multiSelectItem_label svelte-apwq0z">
			        Chips
			      </div>
			      <div class="multiSelectItem_clear svelte-apwq0z"><svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation" class="svelte-apwq0z"><path d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg></div></div></div>
			  <input autocomplete="off" autocorrect="off" spellcheck="true" placeholder="" class="svelte-apwq0z">
			  <div class="clearSelectedItem svelte-apwq0z"><svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg></div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_8.className = "selectContainer multiSelect svelte-apwq0z";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_8, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_8);
				}
			}
		};
	}

	function Select_multiSelected(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-apwq0z-style")) add_css$6();

		this._fragment = create_main_fragment$8(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Select_multiSelected.prototype, proto);

	/* test/src/Select/Select--multiSelectEmpty.html generated by Svelte v2.15.3 */

	function add_css$7() {
		var style = createElement("style");
		style.id = 'svelte-apwq0z-style';
		style.textContent = ".selectContainer.svelte-apwq0z{border:1px solid #D8DBDF;border-radius:3px;height:44px;position:relative}.selectContainer.svelte-apwq0z input.svelte-apwq0z{border:none;color:#3F4F5F;height:44px;line-height:44px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px}.selectContainer.svelte-apwq0z input.svelte-apwq0z::placeholder{color:#78848F}.selectContainer.svelte-apwq0z:hover{border-color:#b2b8bf}.selectContainer.svelte-apwq0z input.svelte-apwq0z:focus{outline:none}.multiSelect.svelte-apwq0z{display:flex;padding:0 16px}.selectContainer.multiSelect.svelte-apwq0z input.svelte-apwq0z{width:auto;padding:0;flex-grow:1}";
		append(document.head, style);
	}

	function create_main_fragment$9(component, ctx) {
		var link, text, div;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div = createElement("div");
				div.innerHTML = `<input autocomplete="off" autocorrect="off" spellcheck="true" placeholder="Select..." class="svelte-apwq0z">`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div.className = "selectContainer multiSelect svelte-apwq0z";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div);
				}
			}
		};
	}

	function Select_multiSelectEmpty(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-apwq0z-style")) add_css$7();

		this._fragment = create_main_fragment$9(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(Select_multiSelectEmpty.prototype, proto);

	/* test/src/List/List--default.html generated by Svelte v2.15.3 */

	function add_css$8() {
		var style = createElement("style");
		style.id = 'svelte-mj7ksi-style';
		style.textContent = ".listContainer.svelte-mj7ksi{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;height:176px;overflow-y:auto}.listItem.svelte-mj7ksi{padding:20px}.listItem.svelte-mj7ksi:hover,.listItem.hover.svelte-mj7ksi{background:#e7f2ff}.listItem.svelte-mj7ksi:first-child{border-radius:4px 4px 0 0}";
		append(document.head, style);
	}

	function create_main_fragment$a(component, ctx) {
		var link, text, div_5;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_5 = createElement("div");
				div_5.innerHTML = `<div class="listItem hover svelte-mj7ksi">Chocolate</div>
			  <div class="listItem svelte-mj7ksi">Pizza</div>
			  <div class="listItem svelte-mj7ksi">Cake</div>
			  <div class="listItem svelte-mj7ksi">Chips</div>
			  <div class="listItem svelte-mj7ksi">Ice Cream</div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_5.className = "listContainer svelte-mj7ksi";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_5, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_5);
				}
			}
		};
	}

	function List_default(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-mj7ksi-style")) add_css$8();

		this._fragment = create_main_fragment$a(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(List_default.prototype, proto);

	/* test/src/List/List--empty.html generated by Svelte v2.15.3 */

	function add_css$9() {
		var style = createElement("style");
		style.id = 'svelte-1padgs0-style';
		style.textContent = ".listContainer.svelte-1padgs0{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;max-height:176px;overflow-y:auto}.empty.svelte-1padgs0{text-align:center;padding:20px 0;color:#78848F}";
		append(document.head, style);
	}

	function create_main_fragment$b(component, ctx) {
		var link, text, div_1;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_1 = createElement("div");
				div_1.innerHTML = `<div class="empty svelte-1padgs0">No options</div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_1.className = "listContainer svelte-1padgs0";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_1, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_1);
				}
			}
		};
	}

	function List_empty(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-1padgs0-style")) add_css$9();

		this._fragment = create_main_fragment$b(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(List_empty.prototype, proto);

	/* test/src/List/List--grouped.html generated by Svelte v2.15.3 */

	function add_css$a() {
		var style = createElement("style");
		style.id = 'svelte-66i8ah-style';
		style.textContent = ".listContainer.svelte-66i8ah{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;height:176px;overflow-y:auto}.listGroupTitle.svelte-66i8ah{color:#8f8f8f;cursor:default;font-size:12px;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:uppercase}.listItem.svelte-66i8ah{padding:20px}.listItem.svelte-66i8ah:hover,.listItem.hover.svelte-66i8ah{background:#e7f2ff}.listItem.svelte-66i8ah:first-child{border-radius:4px 4px 0 0}";
		append(document.head, style);
	}

	function create_main_fragment$c(component, ctx) {
		var link, text, div_7;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_7 = createElement("div");
				div_7.innerHTML = `<div class="listGroupTitle svelte-66i8ah">Sweet</div>
			  <div class="listItem hover svelte-66i8ah">Chocolate</div>
			  <div class="listItem svelte-66i8ah">Cake</div>
			  <div class="listItem svelte-66i8ah">Ice Cream</div>
			  <div class="listGroupTitle svelte-66i8ah">Savory</div>
			  <div class="listItem svelte-66i8ah">Pizza</div>
			  <div class="listItem svelte-66i8ah">Chips</div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_7.className = "listContainer svelte-66i8ah";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_7, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_7);
				}
			}
		};
	}

	function List_grouped(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-66i8ah-style")) add_css$a();

		this._fragment = create_main_fragment$c(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(List_grouped.prototype, proto);

	/* test/src/List/List--groupedFiltered.html generated by Svelte v2.15.3 */

	function add_css$b() {
		var style = createElement("style");
		style.id = 'svelte-66i8ah-style';
		style.textContent = ".listContainer.svelte-66i8ah{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;height:176px;overflow-y:auto}.listGroupTitle.svelte-66i8ah{color:#8f8f8f;cursor:default;font-size:12px;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:uppercase}.listItem.svelte-66i8ah{padding:20px}.listItem.svelte-66i8ah:hover,.listItem.hover.svelte-66i8ah{background:#e7f2ff}.listItem.svelte-66i8ah:first-child{border-radius:4px 4px 0 0}";
		append(document.head, style);
	}

	function create_main_fragment$d(component, ctx) {
		var link, text, div_3;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_3 = createElement("div");
				div_3.innerHTML = `<div class="listGroupTitle svelte-66i8ah">Savory</div>
			  <div class="listItem hover svelte-66i8ah">Pizza</div>
			  <div class="listItem svelte-66i8ah">Chips</div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_3.className = "listContainer svelte-66i8ah";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_3, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_3);
				}
			}
		};
	}

	function List_groupedFiltered(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-66i8ah-style")) add_css$b();

		this._fragment = create_main_fragment$d(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(List_groupedFiltered.prototype, proto);

	/* test/src/List/List--groupedReversed.html generated by Svelte v2.15.3 */

	function add_css$c() {
		var style = createElement("style");
		style.id = 'svelte-66i8ah-style';
		style.textContent = ".listContainer.svelte-66i8ah{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;height:176px;overflow-y:auto}.listGroupTitle.svelte-66i8ah{color:#8f8f8f;cursor:default;font-size:12px;height:40px;line-height:40px;padding:0 20px;text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:uppercase}.listItem.svelte-66i8ah{padding:20px}.listItem.svelte-66i8ah:hover,.listItem.hover.svelte-66i8ah{background:#e7f2ff}.listItem.svelte-66i8ah:first-child{border-radius:4px 4px 0 0}";
		append(document.head, style);
	}

	function create_main_fragment$e(component, ctx) {
		var link, text, div_7;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_7 = createElement("div");
				div_7.innerHTML = `<div class="listGroupTitle svelte-66i8ah">Savory</div>
			  <div class="listItem hover svelte-66i8ah">Pizza</div>
			  <div class="listItem svelte-66i8ah">Chips</div>
			  <div class="listGroupTitle svelte-66i8ah">Sweet</div>
			  <div class="listItem svelte-66i8ah">Chocolate</div>
			  <div class="listItem svelte-66i8ah">Cake</div>
			  <div class="listItem svelte-66i8ah">Ice Cream</div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_7.className = "listContainer svelte-66i8ah";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_7, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_7);
				}
			}
		};
	}

	function List_groupedReversed(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-66i8ah-style")) add_css$c();

		this._fragment = create_main_fragment$e(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(List_groupedReversed.prototype, proto);

	/* test/src/List/List--activeItem.html generated by Svelte v2.15.3 */

	function add_css$d() {
		var style = createElement("style");
		style.id = 'svelte-1sufgn9-style';
		style.textContent = ".listContainer.svelte-1sufgn9{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;height:176px;overflow-y:auto}.listItem.svelte-1sufgn9{padding:20px}.listItem.svelte-1sufgn9:hover{background:#e7f2ff}.listItem.svelte-1sufgn9:first-child{border-radius:4px 4px 0 0}.listItem.active.svelte-1sufgn9{background:#007aff;color:#fff}";
		append(document.head, style);
	}

	function create_main_fragment$f(component, ctx) {
		var link, text, div_5;

		return {
			c() {
				link = createElement("link");
				text = createText("\n\n");
				div_5 = createElement("div");
				div_5.innerHTML = `<div class="listItem svelte-1sufgn9">Chocolate</div>
			  <div class="listItem active hover svelte-1sufgn9">Pizza</div>
			  <div class="listItem svelte-1sufgn9">Cake</div>
			  <div class="listItem svelte-1sufgn9">Chips</div>
			  <div class="listItem svelte-1sufgn9">Ice Cream</div>`;
				link.rel = "stylesheet";
				link.href = "../reset.css";
				div_5.className = "listContainer svelte-1sufgn9";
			},

			m(target, anchor) {
				insert(target, link, anchor);
				insert(target, text, anchor);
				insert(target, div_5, anchor);
			},

			p: noop,

			d(detach) {
				if (detach) {
					detachNode(link);
					detachNode(text);
					detachNode(div_5);
				}
			}
		};
	}

	function List_activeItem(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		if (!document.getElementById("svelte-1sufgn9-style")) add_css$d();

		this._fragment = create_main_fragment$f(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}
	}

	assign(List_activeItem.prototype, proto);

	/* test/src/Select/ParentContainer.html generated by Svelte v2.15.3 */



	function create_main_fragment$g(component, ctx) {
		var div, select_updating = {}, text0, p, text1_value = ctx.selectedValue.label, text1;

		var select_initial_data = { items: ctx.items };
		if (ctx.selectedValue  !== void 0) {
			select_initial_data.selectedValue = ctx.selectedValue ;
			select_updating.selectedValue = true;
		}
		var select = new Select({
			root: component.root,
			store: component.store,
			data: select_initial_data,
			_bind(changed, childState) {
				var newState = {};
				if (!select_updating.selectedValue && changed.selectedValue) {
					newState.selectedValue = childState.selectedValue;
				}
				component._set(newState);
				select_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			select._bind({ selectedValue: 1 }, select.get());
		});

		return {
			c() {
				div = createElement("div");
				select._fragment.c();
				text0 = createText("\n\n  ");
				p = createElement("p");
				text1 = createText(text1_value);
				p.className = "result";
				div.className = "container";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				select._mount(div, null);
				append(div, text0);
				append(div, p);
				append(p, text1);
			},

			p(changed, _ctx) {
				ctx = _ctx;
				var select_changes = {};
				if (changed.items) select_changes.items = ctx.items;
				if (!select_updating.selectedValue && changed.selectedValue) {
					select_changes.selectedValue = ctx.selectedValue ;
					select_updating.selectedValue = ctx.selectedValue  !== void 0;
				}
				select._set(select_changes);
				select_updating = {};

				if ((changed.selectedValue) && text1_value !== (text1_value = ctx.selectedValue.label)) {
					setData(text1, text1_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}

				select.destroy();
			}
		};
	}

	function ParentContainer(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = true;

		this._fragment = create_main_fragment$g(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(ParentContainer.prototype, proto);

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */













	function __awaiter(thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	var fulfil;
	var done = new Promise(function (f) {
	    fulfil = f;
	});
	function start() {
	    if (!running) {
	        running = true;
	        console.log('TAP version 13');
	        Promise.resolve().then(function () {
	            var hasOnly = tests.some(function (test) { return test.only; });
	            tests.forEach(function (test) {
	                test.shouldRun = test.skip
	                    ? false
	                    : hasOnly ? test.only : true;
	            });
	            dequeue();
	        });
	    }
	}
	var test = Object.assign(function test(name, fn) {
	    tests.push({ name: name, fn: fn, skip: false, only: false, shouldRun: false });
	    start();
	}, {
	    skip: function (name, fn) {
	        tests.push({ name: name, fn: fn, skip: true, only: false, shouldRun: null });
	        start();
	    },
	    only: function (name, fn) {
	        tests.push({ name: name, fn: fn, skip: false, only: true, shouldRun: null });
	        start();
	    }
	});
	var i = 0;
	var running = false;
	var tests = [];
	var passed = 0;
	var failed = 0;
	var skipped = 0;
	var isNode = typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]';
	function logResult(ok, operator, msg, info) {
	    if (info === void 0) { info = {}; }
	    if (ok) {
	        console.log("ok " + i + " \u2014 " + msg);
	        passed += 1;
	    }
	    else {
	        console.log("not ok " + i + " \u2014 " + msg);
	        failed += 1;
	        console.log('  ---');
	        console.log("  operator: " + operator);
	        if (isNode) {
	            var util = require('util');
	            if ('expected' in info)
	                console.log("  expected:\n    " + util.format(info.expected).replace(/\n/gm, "\n    "));
	            if ('actual' in info)
	                console.log("  actual:\n    " + util.format(info.actual).replace(/\n/gm, "\n    "));
	        }
	        else {
	            if ('expected' in info)
	                console.log("  expected:", info.expected);
	            if ('actual' in info)
	                console.log("  actual:", info.actual);
	        }
	        // find where the error occurred, and try to clean it up
	        var lines = new Error().stack.split('\n').slice(3);
	        var cwd_1 = '';
	        if (isNode) {
	            cwd_1 = process.cwd();
	            if (/[\/\\]/.test(cwd_1[0]))
	                cwd_1 += cwd_1[0];
	            var dirname = typeof __dirname === 'string' && __dirname.replace(/dist$/, '');
	            for (var i_1 = 0; i_1 < lines.length; i_1 += 1) {
	                if (~lines[i_1].indexOf(dirname)) {
	                    lines = lines.slice(0, i_1);
	                    break;
	                }
	            }
	        }
	        var stack = lines
	            .map(function (line) { return "    " + line.replace(cwd_1, '').trim(); })
	            .join('\n');
	        console.log("  stack:   \n" + stack);
	        console.log("  ...");
	    }
	}
	var assert = {
	    fail: function (msg) { return logResult(false, 'fail', msg); },
	    pass: function (msg) { return logResult(true, 'pass', msg); },
	    ok: function (value, msg) {
	        if (msg === void 0) { msg = 'should be truthy'; }
	        return logResult(Boolean(value), 'ok', msg, {
	            actual: value,
	            expected: true
	        });
	    },
	    equal: function (a, b, msg) {
	        if (msg === void 0) { msg = 'should be equal'; }
	        return logResult(a === b, 'equal', msg, {
	            actual: a,
	            expected: b
	        });
	    },
	    throws: function (fn, expected, msg) {
	        if (msg === void 0) { msg = 'should throw'; }
	        try {
	            fn();
	            logResult(false, 'throws', msg, {
	                expected: expected
	            });
	        }
	        catch (err) {
	            if (expected instanceof Error) {
	                logResult(err.name === expected.name, 'throws', msg, {
	                    actual: err.name,
	                    expected: expected.name
	                });
	            }
	            else if (expected instanceof RegExp) {
	                logResult(expected.test(err.toString()), 'throws', msg, {
	                    actual: err.toString(),
	                    expected: expected
	                });
	            }
	            else if (typeof expected === 'function') {
	                logResult(expected(err), 'throws', msg, {
	                    actual: err
	                });
	            }
	            else {
	                throw new Error("Second argument to t.throws must be an Error constructor, regex, or function");
	            }
	        }
	    }
	};
	function dequeue() {
	    return __awaiter(this, void 0, void 0, function () {
	        var test, err_1, total;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    test = tests[i++];
	                    if (!test) return [3 /*break*/, 5];
	                    if (!test.shouldRun) {
	                        if (test.skip) {
	                            console.log("# skip " + test.name);
	                        }
	                        skipped += 1;
	                        dequeue();
	                        return [2 /*return*/];
	                    }
	                    console.log("# " + test.name);
	                    _a.label = 1;
	                case 1:
	                    _a.trys.push([1, 3, , 4]);
	                    return [4 /*yield*/, test.fn(assert)];
	                case 2:
	                    _a.sent();
	                    return [3 /*break*/, 4];
	                case 3:
	                    err_1 = _a.sent();
	                    failed += 1;
	                    console.log("not ok " + i + " \u2014 " + err_1.message);
	                    console.error("  " + err_1.stack.replace(/^\s+/gm, '    '));
	                    return [3 /*break*/, 4];
	                case 4:
	                    dequeue();
	                    return [3 /*break*/, 6];
	                case 5:
	                    total = passed + failed + skipped;
	                    console.log("\n1.." + total);
	                    console.log("# tests " + total);
	                    if (passed)
	                        console.log("# pass " + passed);
	                    if (failed)
	                        console.log("# fail " + failed);
	                    if (skipped)
	                        console.log("# skip " + skipped);
	                    fulfil();
	                    if (isNode)
	                        process.exit(failed ? 1 : 0);
	                    _a.label = 6;
	                case 6: return [2 /*return*/];
	            }
	        });
	    });
	}
	//# sourceMappingURL=tape-modern.esm.js.map

	// setup
	const target = document.querySelector('main');
	const testTarget = document.getElementById('testTemplate');
	const extraTarget = document.getElementById('extra');
	const items = [
	  {value: 'chocolate', label: 'Chocolate'},
	  {value: 'pizza', label: 'Pizza'},
	  {value: 'cake', label: 'Cake'},
	  {value: 'chips', label: 'Chips'},
	  {value: 'ice-cream', label: 'Ice Cream'}
	];
	const itemsWithGroup = [
	  {value: 'chocolate', label: 'Chocolate', group: 'Sweet'},
	  {value: 'pizza', label: 'Pizza', group: 'Savory'},
	  {value: 'cake', label: 'Cake', group: 'Sweet'},
	  {value: 'chips', label: 'Chips', group: 'Savory'},
	  {value: 'ice-cream', label: 'Ice Cream', group: 'Sweet'}
	];
	const itemsWithIndex = [
	  {value: 'chocolate', label: 'Chocolate', index: 0},
	  {value: 'pizza', label: 'Pizza', index: 1},
	  {value: 'cake', label: 'Cake', index: 2},
	  {value: 'chips', label: 'Chips', index: 3},
	  {value: 'ice-cream', label: 'Ice Cream', index: 4},
	];

	function indent(node, spaces) {
	  if (node.childNodes.length === 0) return;

	  if (node.childNodes.length > 1 || node.childNodes[0].nodeType !== 3) {
	    const first = node.childNodes[0];
	    const last = node.childNodes[node.childNodes.length - 1];

	    const head = `\n${spaces}  `;
	    const tail = `\n${spaces}`;

	    if (first.nodeType === 3) {
	      first.data = `${head}${first.data}`;
	    } else {
	      node.insertBefore(document.createTextNode(head), first);
	    }

	    if (last.nodeType === 3) {
	      last.data = `${last.data}${tail}`;
	    } else {
	      node.appendChild(document.createTextNode(tail));
	    }

	    let lastType = null;
	    for (let i = 0; i < node.childNodes.length; i += 1) {
	      const child = node.childNodes[i];
	      if (child.nodeType === 1) {
	        indent(node.childNodes[i], `${spaces}  `);

	        if (lastType === 1) {
	          node.insertBefore(document.createTextNode(head), child);
	          i += 1;
	        }
	      }

	      lastType = child.nodeType;
	    }
	  }
	}

	function normalize(html) {
	  const div = document.createElement('div');
	  div.innerHTML = html
	    .replace(/<link.+\/?>/g, '')
	    .replace(/<!--.+?-->/g, '')
	    .replace(/<!---->/g, '')
	    .replace(/<object.+\/object>/g, '')
	    .replace(/svelte-ref-\w+/g, '')
	    .replace(/\s*svelte-\w+\s*/g, '')
	    .replace(/class=""/g, '')
	    .replace(/style=""/g, '')
	    .replace(/>\s+/g, '>')
	    .replace(/\s+</g, '<');

	  indent(div, '');

	  div.normalize();
	  return div.innerHTML;
	}

	assert.htmlEqual = (a, b, msg) => {
	  assert.equal(normalize(a), normalize(b));
	};

	// tests
	test('with no data creates default elements', async (t) => {
	  const testTemplate = new Select_default({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('when isFocused true container adds focused class', async (t) => {
	  const testTemplate = new Select_focus({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      isFocused: true
	    }
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('when isFocused changes to true input should focus', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      isFocused: false
	    }
	  });

	  const setFocus = () => {
	    select.set({isFocused: true});
	  };

	  const hasFocused = await focus(select.refs.input, setFocus);
	  t.ok(hasFocused);
	  select.destroy();
	});

	test('default empty list', async (t) => {
	  const testTemplate = new List_empty({
	    target: testTarget
	  });

	  const list = new List({
	    target,
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  list.destroy();
	});

	test('default list with five items', async (t) => {
	  const testTemplate = new List_default({
	    target: testTarget
	  });

	  const list = new List({
	    target,
	    data: {
	      items: itemsWithIndex
	    }
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  list.destroy();
	});

	test('should highlight active list item', async (t) => {
	  const testTemplate = new List_activeItem({
	    target: testTarget
	  });

	  const list = new List({
	    target,
	    data: {
	      items: itemsWithIndex,
	      selectedValue: {value: 'pizza', label: 'Pizza', index: 1},
	      activeItemIndex: 1,
	    }
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  list.destroy();
	});

	test('list scrolls to active item', async (t) => {
	  const extras = [
	    {value: 'chicken-schnitzel', label: 'Chicken Schnitzel', index: 5},
	    {value: 'fried-chicken', label: 'Fried Chicken', index: 6},
	    {value: 'sunday-roast', label: 'Sunday Roast', index: 7},
	  ];
	  const list = new List({
	    target,
	    data: {
	      items: itemsWithIndex.concat(extras),
	      selectedValue: {value: 'sunday-roast', label: 'Sunday Roast'},
	    }
	  });

	  const {container} = list.refs;
	  let offsetBounding;
	  const focusedElemBounding = container.querySelector('.listItem.active');
	  if (focusedElemBounding) {
	    offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
	  }

	  t.equal(offsetBounding, 0);
	  list.destroy();
	});

	test('hover item updates on keyUp or keyDown', async (t) => {
	  const list = new List({
	    target,
	    data: {
	      items: itemsWithIndex,
	      activeItem: {value: 'chocolate', label: 'Chocolate'},
	      activeItemIndex: 0,
	    }
	  });

	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  const {container} = list.refs;
	  const focusedElemBounding = container.querySelector('.listItem.hover');
	  t.equal(focusedElemBounding.innerHTML.trim(), `Pizza`);
	  list.destroy();
	});

	test('on enter active item fires a itemSelected event', async (t) => {
	  const list = new List({
	    target,
	    data: {
	      items: itemsWithIndex
	    }
	  });

	  let selectedValue = undefined;
	  list.on('itemSelected', event => {
	    selectedValue = event;
	  });

	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

	  t.equal(JSON.stringify(selectedValue), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
	  list.destroy();
	});

	test('on tab active item fires a itemSelected event', async (t) => {
	  const list = new List({
	    target,
	    data: {
	      items: itemsWithIndex
	    }
	  });

	  let selectedValue = undefined;
	  list.on('itemSelected', event => {
	    selectedValue = event;
	  });

	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));

	  t.equal(JSON.stringify(selectedValue), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
	  list.destroy();
	});

	test('selected item\'s default view', async (t) => {
	  const testTemplate = new Select_itemSelected({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      selectedValue: {value: 'chips', label: 'Chips'},
	    }
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
	  select.destroy();
	  testTemplate.destroy();
	});

	test('select view updates with selectedValue updates', async (t) => {
	  let testTemplate = new Select_default({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
	  testTemplate.destroy();

	  testTemplate = new Select_itemSelected({
	    target: testTarget
	  });

	  select.set({selectedValue: {value: 'chips', label: 'Chips'}});

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('clear wipes selectedValue and updates view', async (t) => {
	  let testTemplate = new Select_itemSelected({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      selectedValue: {value: 'chips', label: 'Chips'},
	    }
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
	  testTemplate.destroy();

	  testTemplate = new Select_default({
	    target: testTarget
	  });

	  select.set({selectedValue: undefined});

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('clicking on Select opens List', async (t) => {
	  const select = new Select({
	    target,
	  });

	  document.querySelector('.selectContainer').click();
	  const listContainer = document.querySelector('.listContainer');
	  t.ok(listContainer);

	  select.destroy();
	});

	test('Select opens List populated with items', async (t) => {
	  const testTemplate = new List_default({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  const listContainer = document.querySelector('.listContainer');
	  t.htmlEqual(listContainer.outerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('List starts with first item in hover state', async (t) => {
	  const testTemplate = new List_default({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();

	  testTemplate.destroy();
	  select.destroy();
	});

	test('List starts with first item in hover state', async (t) => {
	  const testTemplate = new List_default({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items,
	      activeItemIndex: 1,
	    }
	  });

	  document.querySelector('.selectContainer').click();

	  testTemplate.destroy();
	  select.destroy();
	});

	test('select item from list', async (t) => {
	  const testTemplate = new List_default({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items,
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
	  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify({value: 'cake', label: 'Cake'}));

	  testTemplate.destroy();
	  select.destroy();
	});

	test('blur should close list and remove focus from select', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  select.set({isFocused: true});
	  div.click();
	  div.remove();
	  t.ok(!document.querySelector('.listContainer'));
	  t.ok(document.querySelector('.selectContainer input') !== document.activeElement);
	  select.destroy();
	});

	test('selecting item should close list but keep focus on select', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
	  t.ok(!document.querySelector('.listContainer'));
	  t.ok(select.get().isFocused);
	  t.ok(document.querySelector('.selectContainer.focused'));
	  select.destroy();
	});

	test('clicking Select with selected item should open list with item listed as active', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
	  document.querySelector('.selectContainer').click();
	  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify({value: 'cake', label: 'Cake'}));
	  select.destroy();
	});

	test('focus on Select input updates focus state', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer input').focus();
	  t.ok(select.get().isFocused);

	  select.destroy();
	});

	test('key up and down when Select focused opens list', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer input').focus();
	  t.ok(select.get().isFocused);
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  t.ok(document.querySelector('.listContainer'));

	  select.destroy();
	});

	test('List should keep width of parent Select', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isFocused: true
	    }
	  });

	  document.querySelector('.selectContainer input').focus();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  const selectContainer = document.querySelector('.selectContainer');
	  const listContainer = document.querySelector('.listContainer');
	  t.equal(selectContainer.offsetWidth, listContainer.offsetWidth);

	  select.destroy();
	});

	test('Placeholder text should reappear when List is closed', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  div.click();
	  div.remove();
	  const selectInput = document.querySelector('.selectContainer input');
	  t.equal(selectInput.attributes.placeholder.value, 'Select...');

	  select.destroy();
	});

	test('typing in Select filter will hide selected Item', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  select.set({filterText: 'potato'});
	  t.ok(!document.querySelector('.selectContainer .selectedValue'));

	  select.destroy();
	});

	test('clearing selected item closes List if open', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  document.querySelector('.clearSelectedItem').click();
	  t.ok(!document.querySelector('.listContainer'));

	  select.destroy();
	});

	test('closing List clears Select filter text', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  select.set({filterText: 'potato'});
	  div.click();
	  div.remove();
	  const selectInput = document.querySelector('.selectContainer input');
	  t.equal(selectInput.attributes.placeholder.value, 'Select...');

	  select.destroy();
	});

	test('closing List clears Select filter text', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  select.set({filterText: 'potato'});
	  div.click();
	  div.remove();
	  const selectInput = document.querySelector('.selectContainer input');
	  t.equal(selectInput.attributes.placeholder.value, 'Select...');

	  select.destroy();
	});

	test('closing List item clears Select filter text', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  select.set({filterText: 'potato'});
	  div.click();
	  div.remove();
	  const selectInput = document.querySelector('.selectContainer input');
	  t.equal(selectInput.attributes.placeholder.value, 'Select...');

	  select.destroy();
	});

	test('typing while Select is focused populates Select filter text', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  select.set({isFocused: true});
	  document.querySelector('.selectContainer input').blur();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
	  // KeyboardEvent not firing in svelte - not sure why, manual test seems to work

	  select.destroy();
	});

	test('Select input placeholder wipes while item is selected', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      selectedValue: {name: 'Item #2'},
	      activeItemIndex: 1,
	    }
	  });

	  const selectInput = document.querySelector('.selectContainer input');
	  t.equal(selectInput.attributes.placeholder.value, '');

	  select.destroy();
	});

	test('Select listOpen state controls List', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      listOpen: true
	    }
	  });

	  t.ok(document.querySelector('.listContainer'));
	  select.set({
	    listOpen: false
	  });
	  t.ok(!document.querySelector('.listContainer'));

	  select.destroy();
	});

	test('clicking Select toggles List open state', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  t.ok(!document.querySelector('.listContainer'));
	  document.querySelector('.selectContainer').click();
	  t.ok(document.querySelector('.listContainer'));
	  document.querySelector('.selectContainer').click();
	  t.ok(!document.querySelector('.listContainer'));

	  select.destroy();
	});

	test('Select filter text filters list', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  t.ok(select.get().filteredItems.length === 5);
	  select.set({filterText: 'Ice Cream'});
	  t.ok(select.get().filteredItems.length === 1);

	  select.destroy();
	});

	test('Typing in the Select filter opens List', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isFocused: true
	    }
	  });

	  select.set({filterText: '5'});
	  t.ok(document.querySelector('.listContainer'));
	  select.destroy();
	});

	test('While filtering, the first item in List should receive hover class', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isFocused: true
	    }
	  });

	  select.set({filterText: 'I'});
	  t.ok(document.querySelector('.listItem.hover'));
	  select.destroy();
	});

	test('Select container styles can be overridden', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      selectedValue: {name: 'Item #2'},
	      activeItemIndex: 1,
	      containerStyles: `padding-left: 40px;`
	    }
	  });

	  t.equal(document.querySelector('.selectContainer').style.cssText, `padding-left: 40px;`);
	  select.destroy();
	});

	test('Select can be disabled', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isDisabled: true,
	    }
	  });

	  t.ok(document.querySelector('.selectContainer.disabled'));

	  select.destroy();
	});

	test('Select List closes when you click enter', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isFocused: true
	    }
	  });

	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));


	  select.destroy();
	});

	test('tabbing should move between tabIndexes and others Selects', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isFocused: false
	    }
	  });

	  const other = new Select({
	    target: extraTarget,
	    data: {
	      items,
	      isFocused: false
	    }
	  });

	  // window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
	  // TAB not working from Puppeteer - not sure why.

	  select.destroy();
	  other.destroy();
	});

	test(`shouldn't be able to clear a disabled Select`, async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isDisabled: true,
	      selectedValue: {name: 'Item #4'}
	    }
	  });


	  t.ok(!document.querySelector('.clearSelectedItem'));

	  select.destroy();
	});

	test(`two way binding between Select and it's parent component`, async (t) => {
	  const parent = new ParentContainer({
	    target,
	    data: {
	      items,
	      selectedValue: {value: 'chips', label: 'Chips'},
	    }
	  });

	  t.equal(document.querySelector('.selectedItem').innerHTML, document.querySelector('.result').innerHTML);
	  parent.set({
	    selectedValue: {value: 'ice-cream', label: 'Ice Cream'},
	  });
	  t.equal(document.querySelector('.selectedItem').innerHTML, document.querySelector('.result').innerHTML);
	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
	  t.equal(document.querySelector('.selectedItem').innerHTML, document.querySelector('.result').innerHTML);

	  parent.destroy();
	});

	test(`show ellipsis for overflowing text in a List item`, async (t) => {
	  const longest = 'super super super super super super super super super super super super super super super super super super super super super super super super super super super super loooooonnnng name';

	  target.style.width = '300px';

	  const list = new List({
	    target,
	    data: {
	      items: [
	        {
	          index: 0,
	          label: longest
	        },
	        {
	          index: 1,
	          label: 'Not so loooooonnnng name'
	        }
	      ]
	    }
	  });

	  const first = document.querySelector('.listItem');
	  const last = document.querySelector('.listItem:last-child');

	  t.ok(first.scrollWidth > first.clientWidth);
	  t.ok(last.scrollWidth === last.clientWidth);

	  list.destroy();
	  target.style.width = '';
	});


	test('clicking between Selects should close and blur other Select', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isFocused: false
	    }
	  });

	  const other = new Select({
	    target: extraTarget,
	    data: {
	      items,
	      isFocused: false
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  t.ok(select.get().list);
	  document.querySelector('#extra .selectContainer').click();
	  t.ok(!select.get().list);
	  t.ok(other.get().list);

	  select.destroy();
	  other.destroy();
	});

	test('if only one item in list it should have hover state', async (t) => {
	  const list = new List({
	    target,
	    data: {
	      items: [{
	        index: 0,
	        name: 'test one'
	      }]
	    }
	  });

	  t.ok(document.querySelector('.listItem').classList.contains('hover'));

	  list.destroy();
	});

	test(`hovered item in a filtered list shows hover state`, async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  select.set({filterText: 'i'});

	  // const lastItem = document.querySelector('.listItem:last-child');
	  // hover item and check for hover state

	  t.ok(true);

	  select.destroy();
	});

	test(`data shouldn't be stripped from item - currently only saves name`, async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  document.querySelector('.listItem').click();
	  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify({value: 'chocolate', label: 'Chocolate'}));

	  select.destroy();
	});

	test('should not be able to clear when clearing is disabled', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isClearable: false
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
	  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

	  t.ok(!document.querySelector('.clearSelectedItem'));

	  select.destroy();
	});

	test('should not be able to search when searching is disabled', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      isSearchable: false
	    }
	  });

	  const selectInput = document.querySelector('.selectContainer input');
	  t.ok(selectInput.attributes.readonly);

	  select.destroy();
	});

	test('should display indicator when searching is disabled', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items,
	      isSearchable: false
	    }
	  });

	  t.ok(document.querySelector('.indicator'));

	  select.destroy();
	});

	test('placeholder should be prop value', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const placeholder = 'Test placeholder value';

	  const select = new Select({
	    target,
	    data: {
	      items: itemsWithGroup,
	      placeholder
	    }
	  });

	  const selectInput = document.querySelector('.selectContainer input');
	  t.equal(selectInput.attributes.placeholder.value, placeholder);

	  select.destroy();
	});

	test('should display spinner when waiting is enabled', async (t) => {
	  const div = document.createElement('div');
	  document.body.appendChild(div);

	  const select = new Select({
	    target,
	    data: {
	      items,
	      isWaiting: true
	    }
	  });

	  t.ok(document.querySelector('.spinner'));

	  select.destroy();
	});

	test('inputStyles prop applies css to select input', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      items,
	      selectedValue: {value: 'pizza', label: 'Pizza'},
	      activeItemIndex: 1,
	      inputStyles: `padding-left: 40px;`
	    }
	  });

	  t.equal(document.querySelector('.selectContainer input').style.cssText, `padding-left: 40px;`);
	  select.destroy();
	});

	test('items should be grouped by groupBy expression', async (t) => {
	  const testTemplate = new List_grouped({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items: itemsWithGroup,
	      groupBy: (item) => item.group
	    }
	  });

	  document.querySelector('.selectContainer').click();

	  t.htmlEqual(target.querySelector('.listContainer').outerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('groups should be filtered by expression', async (t) => {
	  const testTemplate = new List_groupedFiltered({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items: itemsWithGroup,
	      groupBy: (item) => item.group,
	      groupFilter: (groups) => {
	        return groups.filter((group) => {
	          return group !== 'Sweet';
	        });
	      }
	    }
	  });

	  document.querySelector('.selectContainer').click();

	  t.htmlEqual(target.querySelector('.listContainer').outerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('groups should be sorted by expression', async (t) => {
	  const testTemplate = new List_groupedReversed({
	    target: testTarget
	  });

	  const select = new Select({
	    target,
	    data: {
	      items: itemsWithGroup,
	      groupBy: (item) => item.group,
	      groupFilter: (groups) => groups.reverse()
	    }
	  });

	  document.querySelector('.selectContainer').click();

	  t.htmlEqual(target.querySelector('.listContainer').outerHTML, testTarget.innerHTML);

	  testTemplate.destroy();
	  select.destroy();
	});

	test('when isMulti is true show each item in selectedValue', async (t) => {
	  const selectMultiSelected = new Select_multiSelected({
	    target: testTarget,
	  });

	  const select = new Select({
	    target,
	    data: {
	      isMulti: true,
	      items,
	      selectedValue: [
	        {value: 'pizza', label: 'Pizza'},
	        {value: 'chips', label: 'Chips'},
	      ],
	    }
	  });


	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
	  select.destroy();
	  selectMultiSelected.destroy();
	});

	test('when isMulti is true and selectedValue is undefined show placeholder text', async (t) => {
	  const selectDefault = new Select_multiSelectEmpty({
	    target: testTarget,
	  });

	  const select = new Select({
	    target,
	    data: {
	      isMulti: true,
	      items,
	      selectedValue: undefined
	    }
	  });

	  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

	  select.destroy();
	  selectDefault.destroy();
	});

	test('when isMulti is true clicking item in List will populate selectedValue', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      isMulti: true,
	      items,
	      selectedValue: undefined
	    }
	  });

	  document.querySelector('.selectContainer').click();
	  document.querySelector('.listItem').click();

	  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify([{value: 'chocolate', label: 'Chocolate'}]));

	  select.destroy();
	});

	test('when isMulti is true items in selectedValue will not appear in List', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      isMulti: true,
	      items,
	      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
	    }
	  });

	  t.equal(JSON.stringify(select.get().filteredItems), JSON.stringify([
	    {value: 'pizza', label: 'Pizza'},
	    {value: 'cake', label: 'Cake'},
	    {value: 'chips', label: 'Chips'},
	    {value: 'ice-cream', label: 'Ice Cream'}
	  ]));

	  select.destroy();
	});

	test('when isMulti is true both selectedValue and filterText filters List', async (t) => {
	  const select = new Select({
	    target,
	    data: {
	      isMulti: true,
	      items,
	      filterText: 'Pizza',
	      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
	    }
	  });

	  t.equal(JSON.stringify(select.get().filteredItems), JSON.stringify([
	    {value: 'pizza', label: 'Pizza'}
	  ]));

	  select.destroy();
	});


	function focus(element, setFocus) {
	  return new Promise(fulfil => {
	    element.addEventListener('focus', function handler() {
	      element.removeEventListener('focus', handler);
	      fulfil(true);
	    });

	    setFocus();
	  });
	}

	// this allows us to close puppeteer once tests have completed
	window.done = done;

}());
