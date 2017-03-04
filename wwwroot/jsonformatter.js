var JsonFormatter = function () {
};

JsonFormatter.prototype = (function () {
    var TAB = "  ";

    function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    function getIndent(indent) {
        var tabs = TAB.repeat(indent);
        return tabs;
    }

    var formatArray = function (arr, indent) {
        var open = "<span class='square'>[</span>";
        var close = "<span class='square'>]</span>";

        if (arr.length === 0) {
            return open + " " + close;
        } else {
            return open + insertCollapser(function () {
                return arr.reduce(function(previous, current, index) {
                    previous += getIndent(indent + 1) + formatElement(current, indent + 1);
                    if (index < arr.length) {
                        previous += "<span class='comma'>,</span>" + "\n";
                    } 
                    return previous;
                }, "");

            }) + getIndent(indent) + close;
        }
        return html;
    }

    var formatElement = function (elem, indent) {
        var type = getType(elem);
        return formatters[type].call(this, elem, indent);
    }

    var formatPropertyKey = function (key, indent) {
        return "<span class='property'>\"" + key + "\"</span>: ";
    }

    var formatPropertyValue = function (prop, indent) {
        var type = getType(prop);
        return formatters[type].call(this, prop, indent);
    }

    var formatProperty = function (prop, key, indent) {
        return formatPropertyKey(key, indent) + formatPropertyValue(prop, indent);
    }

    var insertCollapser = function (func) {
        return "<span><img src=\"img/min.gif\" class=\"image\" /></span><span class='collapsible'>\n" + func() + "</span>";
    }

    var formatObjectProperties = function (obj, indent) {

        var count = Object.keys(obj).length;
        return Object.keys(obj).reduce(function(previous, current, index) {
            previous += getIndent(indent + 1) + formatProperty(obj[current], current, indent + 1);
            if (index < count) {
                previous += "<span class='comma'>,</span>" + "\n";
            } 
            return previous;
        }, "");
    }

    var formatObject = function (obj, indent) {

        var open = "<span class='curly'>{</span>";
        var close = "<span class='curly'>}</span>";

        indent = indent || 0;

        if (Object.keys(obj).length === 0) {
            return getIndent(indent) + open + " " + getIndent(indent) + close;
        } else {
            return open + insertCollapser(function () {
                return formatObjectProperties(obj, indent);
            }) + getIndent(indent) + close;
        }
    }

    var formatNull = function (obj, indent) {
        return "<span class='null'>" + "null" + "</span>";
    }

    var formatUndefined = function (obj, indent) {
        return "<span class='null'>" + "undefined" + "</span>";
    }

    var formatNumber = function (obj, indent) {
        return "<span class='number'>" + obj + "</span>";
    }

    var formatBoolean = function (obj, indent) {
        return "<span class='boolean'>" + obj + "</span>";
    }

    var formatString = function (obj, indent) {
        return "<span class='string'>\"" + obj + "\"</span>";
    }

    var formatters = {
        'Array': formatArray,
        'Object': formatObject,
        'Null': formatNull,
        'Undefined': formatUndefined,
        'Number': formatNumber,
        'Boolean': formatBoolean,
        'Undefined': formatNull,
        'String': formatString
    }

    var toggleNode = function (img) {
        var collapsible = img.parentNode.nextSibling;
        if (!collapsible) {
            return
        };

        if (collapsible.style.display === "none") {
            collapsible.style.display = "inline";
            img.src = "img/min.gif";
        } else {
            collapsible.style.display = "none";
            img.src = "img/plus.gif";
        }

    }

    var formatJson = function (obj) {

        var type = getType(obj);
        return "<pre class='json'>" + formatters[type].call(this, obj, 0) + "</pre>";
    }

    return {
        toggleNode: toggleNode,
        formatJson: formatJson
    }

}());
