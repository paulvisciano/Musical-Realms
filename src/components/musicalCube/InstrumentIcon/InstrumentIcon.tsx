import { getInstrumentFromSamplePath } from "instruments/InstrumentDetection";
import { InstrumentName } from "instruments/InstrumentName";

import "./InstrumentIcon.css";

interface Props {
    sound?: any,
    onClick: () => void
}

const InstumentIcon: React.FC<Props> = ({ sound, onClick }) => {
    const instrument: InstrumentName = getInstrumentFromSamplePath(sound);

    return (
        <div className={`instrument-icon ${instrument}`} onClick={onClick} style={{ backgroundImage: `url("${process.env.PUBLIC_URL}/assets/icon/instruments/${instrument}.svg")` }} />)
}

export default InstumentIcon