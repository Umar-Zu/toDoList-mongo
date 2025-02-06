/**
 * @file Handles DOM interactions for a to-do list application.
 * @description Adds event listeners for deleting, editing, canceling edits, and preventing empty form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Submits the form when a delete checkbox is checked.
   */
  const deleteCheckboxes = document.querySelectorAll('.delete-checkbox');
  deleteCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      this.closest('.delete-form').submit();
    });
  });

  /**
   * Displays the edit form and hides the item content when the edit button is clicked.
   */
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const itemContent = this.closest('.item-content');
      const editForm = itemContent.nextElementSibling;
      itemContent.style.display = 'none';
      editForm.style.display = 'flex';
      editForm.querySelector('input[type="text"]').focus();
    });
  });

  /**
   * Hides the edit form and restores the item content when the cancel button is clicked.
   */
  const cancelButtons = document.querySelectorAll('.cancel-btn');
  cancelButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const editForm = this.closest('.edit-form');
      const itemContent = editForm.previousElementSibling;
      editForm.style.display = 'none';
      itemContent.style.display = 'flex';
    });
  });

  /**
   * Prevents form submission if the input field is empty.
   */
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const input = form.querySelector('input[type="text"]');
      if (input && !input.value.trim()) {
        e.preventDefault();
        alert('Please enter a valid item name');
      }
    });
  });
});
