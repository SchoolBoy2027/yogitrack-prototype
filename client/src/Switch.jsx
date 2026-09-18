
/**
 * 
 * @param {*} param text value
 * @param {*} defaultComponent Usually View
 * @param {*} children  View, Add or modify 
 *  
 * @returns 
 */
const Switch = ({ param, defaultComponent, children }) => {
  return children.find(child => {
    return child.props.value === param;
  }) || defaultComponent;
}
const Case = ({ value, children }) => {
  return children;
}


export default Switch(param);


