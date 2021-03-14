module.exports = function (Handlebars) {
  Handlebars.registerHelper('eq', (v1, v2) => v1 === v2);
  Handlebars.registerHelper('ne', (v1, v2) => v1 !== v2);
  Handlebars.registerHelper('lt', (v1, v2) => v1 < v2);
  Handlebars.registerHelper('gt', (v1, v2) => v1 > v2);
  Handlebars.registerHelper('lte', (v1, v2) => v1 <= v2);
  Handlebars.registerHelper('gte', (v1, v2) => v1 >= v2);
  Handlebars.registerHelper('and', () => {
    return Array.prototype.every.call(arguments, Boolean);
  });
  Handlebars.registerHelper('or', () => {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  });
};
