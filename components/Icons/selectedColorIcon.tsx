interface SelectedColorProps {
  fill?: string;
}

const SelectedColorIcon = ({ fill }: SelectedColorProps) => (
  <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 159.22 159.23">
    <path d="m79.61,0C35.64,0,0,35.64,0,79.61s35.64,79.62,79.61,79.62,79.61-35.65,79.61-79.62S123.58,0,79.61,0Zm0,144.51c-35.84,0-64.89-29.06-64.89-64.9S43.77,14.72,79.61,14.72s64.89,29.06,64.89,64.89-29.05,64.9-64.89,64.9Z" fill="#fff" fill-rule="evenodd" stroke-width="0"/>
    <path d="m79.61,2.82C37.19,2.82,2.81,37.2,2.81,79.61s34.38,76.8,76.8,76.8,76.8-34.38,76.8-76.8S122.03,2.82,79.61,2.82Zm0,141.69c-35.84,0-64.89-29.06-64.89-64.9S43.77,14.72,79.61,14.72s64.89,29.06,64.89,64.89-29.05,64.9-64.89,64.9Z" fill={fill} fill-rule="evenodd" stroke-width="0"/>
  </svg>
)
export default SelectedColorIcon;
