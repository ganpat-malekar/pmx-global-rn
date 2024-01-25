import { useState } from 'react';
import { connect } from 'react-redux';

function ToggleAccountNo(props) {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      onClick={() => setToggle(!toggle)}
      className={props.classes.CustomLink}
    >
      {toggle ? props.accountNo : props.hashedAccountNo}
    </div>
  );
}

ToggleAccountNo.propTypes = {};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {})(ToggleAccountNo);
