/*
Copyright (c) 2020 Zakru

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

document.addEventListener('DOMContentLoaded', () => {
  const text = document.getElementById('text-input');
  const textOut = document.getElementById('text-output');
  const fileIn = document.getElementById('file-input');
  const chooseFile = document.getElementById('file-button');
  const nameIn = document.getElementById('name-input');

  const wordRegex = /\s*(\S{1,127})\s*/g;

  const rebuild = () => {
    const pasta = text.value;
    const lines = [];
    let match = wordRegex.exec(pasta);
    while (match != null) {
      if (lines.length === 0 || lines[lines.length-1].length + match[1].length + 1 > 127)
        lines.push(match[1]);
      else lines[lines.length-1] += ' ' + match[1];
      match = wordRegex.exec(pasta);
    }

    const name = nameIn.value;
    const commands = [];
    let index = 0;
    lines.forEach(l => {
      if (index !== lines.length - 1)
        commands.push(`alias ${name}_line${index} "alias ${name} ${name}_line${++index}; say ${l}"`);
      else
        commands.push(`alias ${name}_line${index} "alias ${name} ${name}_line0; say ${l}"`);
    });
    commands.push(`alias ${name} ${name}_line0`);
    textOut.value = commands.join('\n');
  }

  text.addEventListener('input', rebuild);
  nameIn.addEventListener('input', rebuild);

  fileIn.addEventListener('change', e => {
    if (!e.target.files) return;

    const reader = new FileReader();
    const target = e.target;

    reader.onload = () => {
      text.value = reader.result;
      target.value = '';
      rebuild();
    };

    reader.readAsText(e.target.files[0])
  });

  chooseFile.addEventListener('click', () => {
    fileIn.click();
  });

  rebuild();
});
