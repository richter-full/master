import arrayFrom from 'array-from';
import Generals from '../www/assets/javascript/Generals'
import AsideText from '../www/assets/javascript/AsideText'
import ContentOverview from '../www/assets/javascript/ContentOverview'
import ArticleRenderer from '../www/assets/javascript/ArticleRenderer'
// OVERRIDES
/*
  override defineClassesMaster and defineClassesAdditional in sub projects of dotCMS master
 */
const defineClassesMaster = () => ({
  AsideText,
  ContentOverview,
  ArticleRenderer,
  Generals,
});

// ToDo: put classes to their subproject
// ToDo: create new webpack entry points!

const defineClassesAdditional = () => (window.classesAdditional || {
});

// Global placeholder for optional additional entrypoints
// window.additionalEntrypoints = window.additionalEntrypoints || [];

// Global storage for optional additional classes/objects/modules
window.sharedObjects = window.sharedObjects || {};


// GLOBAL INIT
/*
  all components that have a javascript module attached must provide "data-module" attribute in markup with the name of their JS class
  then their JS module will be instantiated
 */
const getModuleForInit = () => {
  const classesMaster = defineClassesMaster();
  const classesAdditional = defineClassesAdditional();

  return Object.assign({}, classesMaster, classesAdditional);
};

// Add additional dom entrypoints before initializing modules
// const prepareAdditionalEntrypoints = (additionalEntrypoints) => {
//   additionalEntrypoints.forEach((entrypoint) => {
//     const parent = document.querySelector(entrypoint.selector);
//     parent.insertAdjacentHTML(entrypoint.insert, entrypoint.markup);
//   });
// };

const initModules = () => {

  // prepareAdditionalEntrypoints(window.additionalEntrypoints);

  // get all modules that will be used for auto initialization
  const classes = getModuleForInit();

  // get all modules to initialize on page
  const moduleElements = document.querySelectorAll('[data-module]');

  // initialize modules
  window.initializedModuleInstances = arrayFrom(moduleElements).map((moduleElement) => {
    const moduleClassName = moduleElement.getAttribute('data-module');

    try {
      if (moduleClassName !== '') {
        const instance = new (classes[moduleClassName])({
          element: moduleElement,
          // globalEventHandler,
        });
        instance.init();
        return instance;
      }
      return null;
    } catch (er) {
      console.error(`error initializing module instance with class "${moduleClassName}"`);
      console.error(er);
      return null;
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initModules();
  // removeEmptyContainers();
  console.log('Modules Initialized: ', getModuleForInit());
});
