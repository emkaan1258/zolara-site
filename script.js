  document.addEventListener("DOMContentLoaded", function () {
        const selectBox = document.getElementById("kb_cat_select");
        const cards = document.querySelectorAll(".kb-card-item");
        const noResult = document.getElementById("kbNoResult");

        selectBox.addEventListener("change", function () {
            const selectedCategory = this.value;
            let visibleCards = 0;

            cards.forEach(function (card) {
                const cardCategories = card.getAttribute("data-cat").split(" ");

                if (selectedCategory === "all" || cardCategories.includes(selectedCategory)) {
                    card.classList.remove("d-none");
                    visibleCards++;
                } else {
                    card.classList.add("d-none");
                }
            });

            if (visibleCards === 0) {
                noResult.classList.remove("d-none");
            } else {
                noResult.classList.add("d-none");
            }
        });
    });

      function openQuoteForm(serviceName) {
    document.getElementById("servicesArea").style.display = "none";
    document.getElementById("quoteFormArea").classList.add("show");

    document.getElementById("selectedServiceInput").value = serviceName;
    document.getElementById("detailService").innerText = serviceName;

    showStep(1);

    document.getElementById("quoteFormArea").scrollIntoView({
      behavior: "smooth"
    });
  }

  function backToServices() {
    document.getElementById("quoteFormArea").classList.remove("show");
    document.getElementById("servicesArea").style.display = "block";
  }

  function showStep(stepNumber) {
    document.querySelectorAll(".quote-step").forEach(function(step) {
      step.classList.remove("active");
    });

    document.querySelectorAll(".quote-tabs span").forEach(function(tab) {
      tab.classList.remove("active");
    });

    document.getElementById("step" + stepNumber).classList.add("active");
    document.getElementById("tab" + stepNumber).classList.add("active");

    updateQuoteDetails();
  }

  function goNext(currentStep, nextStep) {
    var currentBox = document.getElementById("step" + currentStep);
    var requiredFields = currentBox.querySelectorAll("[required]");

    for (var i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].checkValidity()) {
        requiredFields[i].reportValidity();
        return;
      }
    }

    showStep(nextStep);
  }

  function updateQuoteDetails() {
    var from = document.getElementById("shippingFrom") ? document.getElementById("shippingFrom").value : "";
    var to = document.getElementById("shippingTo") ? document.getElementById("shippingTo").value : "";
    var date = document.getElementById("shippingDate") ? document.getElementById("shippingDate").value : "";
    var load = document.getElementById("loadDescription") ? document.getElementById("loadDescription").value : "";

    var firstName = document.getElementById("firstName") ? document.getElementById("firstName").value : "";
    var lastName = document.getElementById("lastName") ? document.getElementById("lastName").value : "";
    var email = document.getElementById("email") ? document.getElementById("email").value : "";
    var phone = document.getElementById("phone") ? document.getElementById("phone").value : "";

    document.getElementById("detailFrom").innerText = from || "---";
    document.getElementById("detailTo").innerText = to || "---";
    document.getElementById("detailDate").innerText = date || "---";
    document.getElementById("detailLoad").innerText = load || "---";
    document.getElementById("detailName").innerText = (firstName + " " + lastName).trim() || "---";
    document.getElementById("detailEmail").innerText = email || "---";
    document.getElementById("detailPhone").innerText = phone || "---";
  }

  document.addEventListener("input", updateQuoteDetails);
  document.addEventListener("change", updateQuoteDetails);