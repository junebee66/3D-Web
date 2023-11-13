(function (TextPlane) {
    // Helpers
    const wrapText = function (str, width) {
        const patt = new RegExp('(?![^\\n]{1,' + width + ')([^\\n]{1,' + width + '})\\s', 'g');
        return str.replace(patt, '$1\n');
    };

    const EOLConvert = (text) => {
        return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    };

    const chunk = function (arr, size) {
        const chunkedArr = [];
        arr = arr || [];
        size = size === undefined ? 1 : size;
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };

    const createLines = (canObj, rows) => {
        let i = 0;
        const lines = [];
        while (i < rows) {
            lines.push({
                text: '',
                x: 10, y: 0,
                lw: 1,
                fc: canObj.palette[1],
                sc: canObj.palette[2],
                a: 'left', f: 'arial', fs: '20px', bl: 'top'
            });
            i += 1;
        }
        return lines;
    };

    const smoothY = (lines, alpha, sy, dy) => {
        let i = 0;
        const len = lines.length;
        while (i < len) {
            const li = lines[i];
            li.y = sy + dy * i - dy * alpha * 1;
            i += 1;
        }
    };

    const drawText = (canObj, ctx, canvas, state) => {
        ctx.fillStyle = canObj.palette[0];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        state.lines.forEach((li) => {
            ctx.lineWidth = li.lw;
            ctx.textAlign = li.a;
            ctx.textBaseline = li.bl;
            ctx.font = li.fs + ' ' + li.f;
            ctx.fillStyle = li.fc;
            ctx.strokeStyle = li.sc;
            ctx.fillText(li.text, li.x, li.y);
            ctx.strokeText(li.text, li.x, li.y);
        });
    };

    // Public API
    TextPlane.createCanObj = (opt) => {
        opt = opt || {};
        let canObj = canvasMod.create({
            draw: drawText,
            size: opt.size === undefined ? 512 : opt.size,
            update_mode: opt.update_mode || 'canvas',
            state: {
                lines: []
            },
            palette: opt.palette || ['#080808', '#8a8a8a', '#ffffff']
        });
        canObj.state.lines = createLines(canObj, opt.rows === undefined ? 9 : opt.rows);
        return canObj;
    };

    TextPlane.createPlane = (opt) => {
        opt = opt || {};
        const canObj = TextPlane.createCanObj(opt);
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(opt.w, opt.h, 1, 1),
            new THREE.MeshBasicMaterial({
                map: canObj.updateMode === 'dual' ? canObj.texture_data : canObj.texture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 1
            })
        );
        plane.userData.canObj = canObj;
        return plane;
    };

    TextPlane.createTextLines = (text, cols) => {
        let arr = wrapText(EOLConvert(text), cols).split('\n');
        arr = arr.map((a) => {
            if (a.length >= cols) {
                return chunk(a.split(''), cols).map((b) => { return b.join('') });
            }
            return a;
        }).flat();
        return arr;
    };

    TextPlane.moveTextLines = (lines, textLines, alpha, sy, dy) => {
        linesLen = lines.length;
        const tli = Math.floor(textLines.length * alpha);
        textLines.slice(tli, tli + linesLen).forEach((text, i) => {
            lines[i].text = text;
        });
        smoothY(lines, alpha * textLines.length % 1, sy, dy);
    };
}(this['TextPlane'] = {}));
