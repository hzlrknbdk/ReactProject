import SpecialForm from "./SpecialForm";
import MySpecialList from "./MySpecialList";

const MySpecialLibrary = () => {
  return (
    <div className="special-container mx-5">
      <h5 className="my-4">Yeni Kitap Ekle</h5>
      <SpecialForm />
      <MySpecialList />
    </div>
  );
};
export default MySpecialLibrary;
