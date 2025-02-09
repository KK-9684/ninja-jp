import CustomButton from "./Common/customButton";

const AboutButtonGroup = () => {
  return (
    <div className="flex space-x-2.5">
      <CustomButton
        text="ABOUT"
        link="/#aboutNinjack"
        font="Geist"
        color="ninjack-text-gray"
      />
      <CustomButton
        text="Ninjack MAGAZINE"
        link="/magazine"
        font="Geist"
        color="ninjack-white"
        isArrow={true}
      />
    </div>
  );
};

export default AboutButtonGroup;
