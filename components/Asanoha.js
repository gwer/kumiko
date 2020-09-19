const e = React.createElement;
const { useState, useRef, useEffect, forwardRef } = React;

const SequenceGenerator = function* () {
  let i = 0;
  while (true) {
    yield i++;
  }
};

const Pattern = forwardRef(
  ({ viewportWidth, viewportHeight, size, width }, ref) => {
    const seq = SequenceGenerator();

    return e(
      "svg",
      {
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        width: viewportWidth,
        height: viewportHeight,
        viewBox: `0 0 ${viewportWidth} ${viewportHeight}`,
        ref,
      },
      [
        e(
          "defs",
          {
            key: seq.next().value,
          },
          [
            e(
              "pattern",
              {
                id: "asanohaPattern",
                x: 0,
                y: 0,
                width: size,
                height: size / 2,
                patternUnits: "userSpaceOnUse",
                key: seq.next().value,
              },
              [
                // вертикали
                e("line", {
                  x1: size / 2,
                  y1: 0,
                  x2: size / 2,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),
                e("line", {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),
                e("line", {
                  x1: size,
                  y1: 0,
                  x2: size,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),

                // горизонтали прерывистые
                e("line", {
                  x1: 0,
                  y1: 0,
                  x2: size,
                  y2: 0,
                  style: {
                    stroke: "#000",
                    strokeWidth: width,
                    strokeDasharray: `${size / 3} ${size / 3}`,
                  },
                  key: seq.next().value,
                }),
                e("line", {
                  x1: 0,
                  y1: size / 2,
                  x2: size,
                  y2: size / 2,
                  style: {
                    stroke: "#000",
                    strokeWidth: width,
                    strokeDasharray: `${size / 3} ${size / 3}`,
                  },
                  key: seq.next().value,
                }),

                // горизонтали серединные
                e("line", {
                  x1: size / 6,
                  y1: size / 4,
                  x2: size - size / 6,
                  y2: size / 4,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),

                // диагонали \
                e("line", {
                  x1: 0,
                  y1: 0,
                  x2: size,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),

                // диагонали /
                e("line", {
                  x1: size,
                  y1: 0,
                  x2: 0,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),

                // диагонали / внутренние
                e("line", {
                  x1: size / 3,
                  y1: 0,
                  x2: size - size / 3,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),

                // диагонали \ внутренние
                e("line", {
                  x1: size - size / 3,
                  y1: 0,
                  x2: size / 3,
                  y2: size / 2,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),

                // оставшиеся перемычки
                e("line", {
                  x1: 0,
                  y1: 0,
                  x2: size / 6,
                  y2: size / 4,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),
                e("line", {
                  x1: 0,
                  y1: size / 2,
                  x2: size / 6,
                  y2: size / 4,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),
                e("line", {
                  x1: size,
                  y1: 0,
                  x2: size - size / 6,
                  y2: size / 4,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),
                e("line", {
                  x1: size,
                  y1: size / 2,
                  x2: size - size / 6,
                  y2: size / 4,
                  style: { stroke: "#000", strokeWidth: width },
                  key: seq.next().value,
                }),
              ]
            ),
          ]
        ),
        e("rect", {
          x: 0,
          y: 0,
          width: viewportWidth,
          height: viewportHeight,
          style: { fill: "url(#asanohaPattern)" },
          key: seq.next().value,
        }),
      ]
    );
  }
);

const Control = ({ title, value, onChange, min, max }) => {
  return e(
    "div",
    {},
    e("label", {}, [
      e("input", {
        type: "range",
        value,
        min,
        max,
        onChange: (e) => onChange(e.target.value),
        key: "input",
      }),
      title,
    ])
  );
};

const Controls = ({
  viewportWidth,
  setViewportWidth,
  viewportHeight,
  setViewportHeight,
  size,
  setSize,
  width,
  setWidth,
}) => {
  return e("div", {}, [
    e(Control, {
      title: "Viewport width",
      value: viewportWidth,
      onChange: setViewportWidth,
      min: 100,
      max: 1000,
      key: "Viewport width",
    }),
    e(Control, {
      title: "Viewport height",
      value: viewportHeight,
      onChange: setViewportHeight,
      min: 100,
      max: 1000,
      key: "Viewport height",
    }),
    e(Control, {
      title: "Pattern size",
      value: size,
      onChange: setSize,
      min: 10,
      max: 1000,
      key: "Pattern size",
    }),
    e(Control, {
      title: "lines width",
      value: width,
      onChange: setWidth,
      min: 1,
      max: 20,
      key: "lines width",
    }),
  ]);
};

const Asanoha = () => {
  const [viewportWidth, setViewportWidth] = useState(400);
  const [viewportHeight, setViewportHeight] = useState(400);
  const [size, setSize] = useState(100);
  const [width, setWidth] = useState(4);
  const [isSvgReady, setIsSvgReady] = useState(false);
  const patternRef = useRef(null);

  const seq = SequenceGenerator();

  useEffect(() => {
    setIsSvgReady(true);
  }, []);

  return e("div", {}, [
    e(Controls, {
      viewportWidth,
      setViewportWidth,
      viewportHeight,
      setViewportHeight,
      size,
      setSize,
      width,
      setWidth,
      key: seq.next().value,
    }),
    e("div", { className: "imagesWrapper", key: seq.next().value }, [
      e(
        "div",
        {
          className: "realSvg",
          key: seq.next().value,
        },
        e(Pattern, {
          viewportWidth,
          viewportHeight,
          size,
          width,
          ref: patternRef,
          key: seq.next().value,
        })
      ),
      isSvgReady &&
        e("img", {
          width: viewportWidth,
          height: viewportHeight,
          src: `data:image/svg+xml, ${escape(patternRef.current.outerHTML)}`,
          className: "imgTag",
          key: seq.next().value,
        }),
    ]),
  ]);
};

export default Asanoha;
