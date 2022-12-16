export default function DownloadFile (blob: Blob, fileName: any){
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.dispatchEvent(new MouseEvent('click'));
}
