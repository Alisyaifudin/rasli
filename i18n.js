const formatters = {
	id: new Intl.NumberFormat("de-DE"),
	en: new Intl.NumberFormat("en-EN"),
};

module.exports = {
	locales: ["en", "id"],
	defaultLocale: "en",
	pages: {
		"*": ["common"],
	},
	interpolation: {
    format: (value, format, lang) => {
      if(format === 'number') return formatters[lang].format(value)
      return value
    }
  }
};