// Can use
// chrome.devtools.*
// chrome.extension.*

var getModel = function(sidebar) {

    function findClosestBaseComponent(element) {
        if (!!element.componentView) {
            return element;
        }

        while (element = element.parentElement) {
            if (!!element.componentView) {
                return element;
            }
        }

        return null;
    }

    function getBaseElementInformation(element) {
        const result = {
            'tagname': instance.tagName
        }

        const model = {};
        const state = {};
        const events = getEventListeners(instance);

        for (var [key, value] of instance.model._data) {
            if (instance.model.definition.has(key)) {
                model[key] = value;
            }
        }

        for (var [key, value] of instance.state._data) {
            state[key] = value;
        }

        if (Object.keys(model).length) {
            result.model = model;
        }

        if (Object.keys(state).length) {
            result.state = state;
        }

        if (Object.keys(events).length) {
            result.events = events;
        }

        return result;
    }

    const instance = findClosestBaseComponent($0);

    if (!instance || !instance.model) {
        return;
    }

    return getBaseElementInformation(instance);
}

chrome.devtools.panels.elements.createSidebarPane("Endorphin inspector", function(sidebar) {
    chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
        sidebar.setExpression("(" + getModel.toString() + ")()", "Selected Endorphin component");
    });
});