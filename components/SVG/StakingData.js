const StakingData = ({
  style,
  minimumLockedValue,
  totalChillRxStaked,
  percentPillsStaked,
}) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1920 66.45"
  >
    <g id="a" />
    <g id="b">
      <g id="c">
        <g>
          <rect
            style={{ fill: "#fdfdfd" }}
            x="0"
            y="3.6"
            width="1920"
            height="62.86"
          />
          <text
            style={{
              fontSize: "21.91px",
              fontFamily: "MoreSugarRegular, More Sugar",
            }}
            transform="translate(24.97 45.41)"
          >
            <tspan x="0" y="0">
              MINIMUM{" "}
            </tspan>
            <tspan style={{ letterSpacing: "-.1em" }} x="114.81" y="0">
              V
            </tspan>
            <tspan x="129.12" y="0">
              ALUE LOCKED:
            </tspan>
          </text>
          <text
            style={{
              fontSize: "21.91px",
              fontFamily: "MoreSugarRegular, More Sugar",
            }}
            transform="translate(320 45.41)"
          >
            <tspan x="0" y="0">
              {minimumLockedValue}ETH
            </tspan>
          </text>
          <text
            style={{
              fontSize: "23.73px",
              fontFamily: "MoreSugarRegular, More Sugar",
            }}
            transform="translate(1318.29 46.9)"
          >
            <tspan x="0" y="0">
              % OF PILLS STAKED:
            </tspan>
          </text>
          <text
            style={{
              fontSize: "21.91px",
              fontFamily: "MoreSugarRegular, More Sugar",
            }}
            transform="translate(1560 46.9)"
          >
            <tspan x="0" y="0">
              {percentPillsStaked}%
            </tspan>
          </text>
          <text
            style={{
              fontSize: "21.91px",
              fontFamily: "MoreSugarRegular, More Sugar",
            }}
            transform="translate(638.49 45.41)"
          >
            <tspan x="0" y="0">
              TOTAL CHILLRXS STAKED:
            </tspan>
          </text>
          <text
            style={{
              fontSize: "21.91px",
              fontFamily: "MoreSugarRegular, More Sugar",
            }}
            transform="translate(940 45.41)"
          >
            <tspan x="0" y="0">
              {totalChillRxStaked} pills
            </tspan>
          </text>
          <path d="M0,3.25C237.93-.69,481.94,.4,720,2.46c398.68-.95,801.42-5.45,1200,.79v.7c-398.55,6.24-801.34,1.74-1200,.78-176.98,1.29-363.14,2.93-540,1.22-29.63-.2-90.3-.78-120-1.16C40,4.55,20,4.3,0,3.95v-.7H0Z" />
          <g>
            <path d="M622.55,3.6c.72,10.05,1.34,21.07,1.75,31.18,.54,7.8,1,15.61-.24,23.38-.35,2.6-.79,5.2-1.51,7.79h-.5c-1.92-7.66-2.62-15.53-2.23-23.38,.35-4.51,.63-11.01,.81-15.59,.4-7.55,.86-15.88,1.41-23.38h.5Z" />
            <path d="M1297.95,3.85c.72,10.05,1.34,21.07,1.75,31.18,.54,7.8,1,15.61-.24,23.38-.35,2.6-.79,5.2-1.51,7.79h-.5c-1.92-7.66-2.62-15.53-2.23-23.38,.35-4.51,.63-11.01,.81-15.59,.4-7.55,.86-15.88,1.41-23.38h.5Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default StakingData;
