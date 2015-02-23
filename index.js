var React = require("react"),
    ReactForms = require("react-forms"),
    Mapping = ReactForms.schema.Mapping,
    Scalar = ReactForms.schema.Scalar,
    Form = ReactForms.Form;


var schema = Mapping({
    text: Scalar(),
    num: Scalar({type: "number"})
});

React.render(
    <Form schema={schema} />,
    document.getElementById("form")
);