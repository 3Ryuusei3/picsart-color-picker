import toast from 'react-hot-toast';

export function copyToClipboard(color: string) {
  toast.dismiss();
  navigator.clipboard.writeText(color).then(() => {
    toast.success(`Copied to clipboard!`);
  }).catch(err => {
    toast.error('Error: ' + err);
  });
}
