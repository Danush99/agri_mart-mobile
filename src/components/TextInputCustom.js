import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';


export default function TextInput({ label, iconName,iconColor,Invalue, ...props }) {
    return(
  <Fumi
    label={label}
    iconClass={FontAwesomeIcon}
    iconName={iconName}
    iconColor={iconColor}
    iconSize={20}
    iconWidth={40}
    inputPadding={16}
    inputStyle={{ color: '#000000' }}
    style={{ backgroundColor: '#f9f5ed',borderWidth: 0.5,borderRadius: 15 }}
    value={Invalue}
  />
);
}