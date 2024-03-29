import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useCarritoContext } from "../context/ContextCarrito";

const ShopAlert = () => {
  const { alertState, alertStateValue } = useCarritoContext();

  return (
    <div className={alertState ? "AlertShop-active" : "AlertShop-hidden"}>
      <span>{alertStateValue ? "Saved" : "Removed"}</span>
      <FontAwesomeIcon
        className={alertStateValue ? "AlertIconAdd" : "AlertIconRemove"}
        icon={faBookmark}
      />
    </div>
  );
};

export default ShopAlert;
