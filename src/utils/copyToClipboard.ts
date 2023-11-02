export const copyToClipboard = (value: string) => {
  const dummyInput = document.createElement("input");
  document.body.appendChild(dummyInput);
  dummyInput.setAttribute("value", value);
  dummyInput.select();
  document.execCommand("copy");
  document.body.removeChild(dummyInput);
};
