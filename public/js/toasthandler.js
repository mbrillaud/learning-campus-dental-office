document.addEventListener('DOMContentLoaded', () => {
    const errorToastElement = document.getElementById('error-toast');
    const successToastElement = document.getElementById('success-toast');
  
    function showToast(message, type) {
      let toastElement;
      if (type === 'error') {
        toastElement = errorToastElement;
      } else if (type === 'success') {
        toastElement = successToastElement;
      }
  
      const toastBody = toastElement.querySelector('.toast-body');
      toastBody.textContent = message;
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  
    window.showToast = showToast;
  });
  