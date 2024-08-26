export default function Confirmation(message) {
    const confirmDelete = window.confirm(message);
    if (!confirmDelete) { return false; }
    return true;
}
