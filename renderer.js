const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  window.versions.close();
});

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

func();
