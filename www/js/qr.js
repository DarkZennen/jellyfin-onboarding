const QR = {

    renderInto(elementId, text, cellSize = 4) {

        const el = document.getElementById(elementId);

        if (!el) return;

        try {

            if (typeof qrcode === "undefined") {

                el.innerHTML = "";

                return;

            }

            let svg = null;

            for (let typeNumber = 1; typeNumber <= 40 && !svg; typeNumber++) {

                try {

                    const code = qrcode(typeNumber, "M");

                    code.addData(text);

                    code.make();

                    svg = code.createSvgTag(cellSize, 2);

                } catch (e) {

                    // Data doesn't fit at this type number yet, try the next size up.

                }

            }

            el.innerHTML = svg || "";

        } catch (err) {

            console.error("QR render failed:", err);

            el.innerHTML = "";

        }

    }

};
