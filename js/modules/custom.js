export default function () {
  const cardNumberInput = document.querySelector("#card__form--input-number");
  const cardPreviewNumber = document.querySelector(".card__preview--number");
  const cardHolderInput = document.querySelector("#card__form--input-holder");
  card;
  const expirationDateMonthInput = document.querySelector(
    "#card__form--select-month"
  );
  const expirationDateYearInput = document.querySelector(
    "#card__form--select-year"
  );
  const cardCWInput = document.querySelector("#card__form--input-cw");

  cardNumberInput.addEventListener("input", (e) => {
    console.log("fdsfs");
  });
}
