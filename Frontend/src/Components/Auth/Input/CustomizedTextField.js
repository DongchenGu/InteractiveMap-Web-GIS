import {styled} from "@mui/material/styles";
import {TextField} from "@material-ui/core";

//自定义 一个MUI textfield
const CustomizedTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: 'green',
        padding: '4px !important', // override inline-style
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
    },
    //另外在 input.css中进行强行覆盖!!!!

});
export default CustomizedTextField;