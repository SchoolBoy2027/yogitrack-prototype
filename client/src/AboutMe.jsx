
import React from "react";
import coyoteLogo from './assets/GeezerPower2.png'
import coyoteLogo2 from './assets/HoneyDoFestival.png'

export default function AboutMe() {
    const parchment = {
        backgroundColor: "#f3e5c5",
        backgroundImage: "linear-gradient(135deg, #f8edcf, #e7d3a5)",
        border: "10px double #78552d",
        borderRadius: "8px",
        boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
        fontFamily: "'Algerian', Georgia, serif",
        color: "#3e2919"
    };

    const heading = {
        fontFamily: "'Algerian', Georgia, serif",
        color: "#70251e",
        textShadow: "1px 1px 1px #c5a46d"
    };

    return (
        <div
            className="container-fluid py-5 min-vh-100"
            style={{ backgroundColor: "#30271f" }}
        >
            <div className="container" style={{ maxWidth: "950px" }}>
                <div className="p-4 p-md-5 text-center" style={parchment}>
                    <div className="row fw-bold fs-3 ">
                        <div className="col-1">⚜️</div>
                        <div className="col-9 ">
                            <h3 className="fs-3 fw-bold" style={heading}>
                                A Tale of the Mighty Coyote
                            </h3>
                        </div>
                        <div className="col-1">⚜️</div>

                    </div>

                    <div
                        className="text-start fs-5"
                        style={{ lineHeight: "2", textAlign: "justify" }}
                    >
                        <p>
                            <img src={coyoteLogo} className="coollogo rounded"
                                alt="Missing" title="BEHOLD THE POWER OF GEEZER!" />
                            In the age of endless errors and cursed frameworks, when
                            kingdoms of heaven and earth trembled in fear before the
                            tyranny of the evil beast <b>React</b>, there
                            arose a legendary warrior known as  <b>Mighty Coyote</b>.
                        </p>

                        <p>
                            With his sword, <strong>Geezer Power</strong>,
                            forged from decades of stubborn determination,
                            Mighty Coyote marched fearlessly into the
                            dreaded Maze of Components, determined to
                            outlast any framework foolishness.
                        </p>

                        <p>
                            There he confronted <b>React</b>, a monstrous beast of
                            a thousand hooks, infinite dependencies, and
                            the terrifying power to render chaos upon the known universe, even Marvel's.
                        </p>

                        <p>
                            After an epic battle of 49 days and nights,
                            Mighty Coyote unleashed the legendary power of
                            <strong> Semester Over!</strong>, piercing
                            React's mind numbing heart and silencing the infernal
                            error messages forever.
                        </p>

                        <p>
                            React's treacherous minion, <strong>Xybook</strong>,
                            master of impossible assignments, cryptic
                            instructions, and merciless automated grading,
                            attempted to flee, but Mighty Coyote raised Geezer Power high
                            and thundered:
                        </p>

                        <blockquote
                            className="text-center p-1 my-1"
                            style={{
                                borderTop: "2px solid #78552d",
                                borderBottom: "2px solid #78552d",
                                color: "#822b20"
                            }}
                        >
                            <strong className="fs-6">
                                "BEGONE, FOUL BEAST! YOUR TRICKS AND ERROR
                                MESSAGES SHALL TORMENT ME NO MORE!"
                            </strong>
                        </blockquote>

                        <p>
                            With one mighty swing, he banished Xybook to
                            the deepest pits of the Underworld, where Hades
                            condemned the monster to endlessly repair its exasperating
                            sandboxes and print functions without subscription fees.
                        </p>

                        <p>
                            Peace returned to the earth and the console
                            fell silent.  Assignments lay where they were vanquished,
                            the heavens and earth rejoiced.
                            The Mighty Coyote standing victorious...
                        </p>

                        <p>
                            And so, he returned triumphantly to his domain, Geezer Power still
                            gleaming from battle.
                        </p>
                        <p>
                            <b><em>And yet...</em></b>, 
                            awaiting upon her royal throne, sat his beautiful <b>Annoyed Queen</b>, 
                             with golden hair shimering beneath her crown and arms crossed in perpetual
                            irritation.
                            <blockquote
                                className="text-center p-1 my-1"
                                style={{
                                    borderTop: "2px solid #78552d",
                                    borderBottom: "2px solid #78552d",
                                    color: "#822b20"
                                }}
                            >
                                <strong className="fs-6">
                                    With a mighty proclamation, she declared the commencement
                                    of Honey-Do!
                                </strong>
                            </blockquote>

                            And presented her champion with an enchanted scroll of
                            countless domestic horrors.
                        </p>
                        <p>
                            Mighty Coyote gazed upon this endless list of catastrophes and vowed with 
                            all his might to answer Annoyed Queen's challenge. 
                        </p>
                        <p>
                            Undaunted, he raised Geezer Power toward the heavens...
                            and went to Home Depot with his loyal companions, Silverado and Visa.
                        </p>
                        <p>
                            To the ends of the earth, the bards proclaim...
                        </p>
                    </div>

                    <div className="fs-2 my-4"></div>

                    <h3 className="fs-6" style={heading}>
                        "FEAR NOT THE YEARS, FOR GEEZER POWER SHALL ALWAYS PREVAIL!<br />
                        <em>BUT NOTHING CAN DEFEAT THE HONEY-DO!"</em>
                    </h3>

                    <hr className="my-4" />

                    <p className="fst-italic mb-0">
                        'Tis a tale Told by an idiot, full of sound and fury, Signifying nothing.
                        <img src={coyoteLogo2} className="coollogo rounded" alt="Missing" title="BEHOLD THE POWER OF GEEZER!" />
                    </p>

                </div>
            </div>
        </div>
    );
}
