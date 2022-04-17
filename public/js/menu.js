function entrarPartida(id) {

    const form = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', "entrarPartida");

    const i = document.createElement("input");
    i.setAttribute('type', "number");
    i.setAttribute('name', "id");
    i.setAttribute('value', id);
    form.appendChild(i);
    document.body.appendChild(form);
    form.submit();
}