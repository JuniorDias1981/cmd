document.addEventListener('DOMContentLoaded', () => {

  // Função para criar e baixar arquivo .bat
  function downloadBatFile(command, filename) {
    const content = `@echo off\r\n:: Script gerado automaticamente\r\n${command}\r\npause\r\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  // Copiar comando para área de transferência
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-command');
      navigator.clipboard.writeText(command).then(() => {
        alert(`Comando copiado:\n\n${command}`);
      }).catch(err => {
        console.error('Erro ao copiar comando:', err);
      });
    });
  });

// Baixar arquivo .bat para cada comando
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('⚠️ Aviso de segurança:\n\nArquivos .BAT podem executar comandos críticos no sistema.\nExecute somente se souber o que está fazendo.');

    const command = btn.getAttribute('data-command');

    // Gerar nome de arquivo baseado no primeiro termo do comando
    let baseName = command.split(' ')[0].replace(/[\\\/:*?"<>| ]/g, '');
    if (!baseName) baseName = 'script';
    const filename = baseName + '.bat';

    downloadBatFile(command, filename);
  });
});


  // Gerar script .bat com múltiplos comandos selecionados no form
  const form = document.getElementById('commandForm');
  const generateBtn = document.getElementById('generateScriptBtn');
  const downloadLinkDiv = document.getElementById('downloadLink');
  const downloadButton = document.getElementById('downloadButton');
  const instructionsDiv = document.getElementById('instructions');

  generateBtn.addEventListener('click', () => {
    const checkedCommands = [...form.elements['command']]
      .filter(input => input.checked)
      .map(input => input.value.trim())
      .filter(cmd => cmd.length > 0);

    if (checkedCommands.length === 0) {
      alert('Selecione pelo menos um comando para gerar o script.');
      return;
    }

    // Montar conteúdo do .bat com todos comandos
    const content =
      '@echo off\r\n:: Script gerado automaticamente\r\n' +
      checkedCommands.map(cmd => `${cmd}`).join('\r\n') +
      '\r\npause\r\n';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    downloadButton.href = url;
    downloadButton.download = 'script_comandos.bat';
    downloadLinkDiv.style.display = 'block';
    instructionsDiv.style.display = 'block';
  });
});
