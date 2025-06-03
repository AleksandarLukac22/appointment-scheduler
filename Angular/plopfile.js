module.exports = function (plop) {
  plop.setHelper('toKebab', function (text) {
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
  });

  plop.setHelper('firstCharToLower', function (text) {
      return text.charAt(0).toLowerCase() + text.slice(1);
  });

  plop.setGenerator('generate-complete', {
    description: 'Generate complete',
    prompts: [
      {
        type: 'input',
        name: 'filenames',
        message: 'Write entity names (comma-separated): ',
      }
    ],
    actions: function (data) {
      const filenames = data.filenames.split(',').map(name => name.trim());
      let actions = [];

      filenames.forEach(filename => {
        actions.push(
          {
            type: 'add',
            path: 'plop/output/{{filename}}/{{toKebab filename}}-details.component.html',
            templateFile: 'plop/spiderly-details-html-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{filename}}/{{toKebab filename}}-details.component.ts',
            templateFile: 'plop/spiderly-details-ts-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{filename}}/{{toKebab filename}}-table.component.html',
            templateFile: 'plop/spiderly-table-html-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{filename}}/{{toKebab filename}}-table.component.ts',
            templateFile: 'plop/spiderly-table-ts-template.hbs',
            data: {filename}
          },
          {
            type: 'add',
            path: 'plop/output/{{filename}}/{{filename}}Controller.cs',
            templateFile: 'plop/spiderly-controller-cs-template.hbs',
            data: {filename}
          },
        );
      });

      return actions;
    } 
  });
};
