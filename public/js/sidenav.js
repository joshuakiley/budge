document.addEventListener("DOMContentLoaded", () => {
    const sidenav = document.querySelectorAll(".sidenav");
    const colapse = document.querySelectorAll(".collapsible");
    const sideInstance = M.Sidenav.init(sidenav);
    const colapseInstance = M.Collapsible.init(colapse);

});