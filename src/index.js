export const toggleSlide = {
  install(
    app,
    options = {
      duration: 300,
      easing: "ease",
    }
  ) {
    function ref(initialValue) {
      let value = initialValue;

      const setRefValue = (newValue) => {
        value = newValue;
      };

      return {
        value,
        setRefValue,
      };
    }

    let targets = ref([]);

    const fireEvent = function (el, eventName) {
      el.dispatchEvent(new CustomEvent(eventName));
    };

    const getTargetByEl = function (el) {
      const target = targets.value.find((target) => target.el.isSameNode(el));

      if (target === undefined) throw "Element not found!";

      return target;
    };

    const slideOpen = function (el, target) {
      fireEvent(el, "slide-open-start");

      target.isOpen = true;
      target.isAnimating = true;

      el.style.display = "block";

      const scrollHeight = el.scrollHeight;
      const computedStyle = window.getComputedStyle(el);
      const borderBottom = parseFloat(
        computedStyle.getPropertyValue("border-bottom-width")
      );
      const borderTop = parseFloat(
        computedStyle.getPropertyValue("border-top-width")
      );

      el.style.height = `${scrollHeight + borderBottom + borderTop}px`;
      el.style.padding = "";
      el.style.margin = "";
      el.style.borderWidth = "";

      if (target.isAnimating) {
        clearTimeout(target.timeout);
      }
      const newTimeout = setTimeout(() => {
        el.style.height = "";
        target.isAnimating = false;

        fireEvent(el, "slide-open-end");
      }, target.duration);

      target.timeout = newTimeout;
    };

    const slideClose = function (el, target) {
      fireEvent(el, "slide-close-start");

      target.isOpen = false;
      target.isAnimating = true;

      const scrollHeight = el.scrollHeight;
      el.style.height = `${scrollHeight}px`;

      setTimeout(() => {
        el.style.height = "0px";
        el.style.padding = "0px";
        el.style.margin = "0px";
        el.style.borderWidth = "0px";
      }, 2);

      if (target.isAnimating) {
        clearTimeout(target.timeout);
      }

      const newTimeout = setTimeout(() => {
        target.isAnimating = false;
        el.style.display = "none";

        fireEvent(el, "slide-close-end");
      }, target.duration);

      target.timeout = newTimeout;
    };

    const handleClick = function (el) {
      const target = getTargetByEl(el);
      if (target.isOpen) {
        slideClose(el, target);
      } else {
        slideOpen(el, target);
      }
    };

    app.directive("toggle-slide", {
      mounted(_el, binding) {
        if (!binding) return;
        const arg = binding?.arg;
        const ref = arg ? binding?.instance?.$refs?.[arg] : undefined;
        let el = ref ? ref["$el"] : _el;
        if (!el) return;

        let easing = options.easing;
        let duration = options.duration;

        Object.keys(binding?.modifiers).forEach((modifier) => {
          if (!Number.isNaN(parseInt(modifier)))
            return (duration = parseInt(modifier));
          if (typeof modifier === "string") easing = modifier;
        });

        const display = function () {
          return (
            window.getComputedStyle(el).getPropertyValue("display") !== "none"
          );
        };

        if (ref ? !display() : !binding.value) {
          el.style.height = "0px";
          el.style.padding = "0px";
          el.style.margin = "0px";
          el.style.display = "none";
        }
        el.style.overflow = "hidden";
        el.style.transition = `height ${easing} ${duration}ms, padding ${easing} ${duration}ms, margin ${easing} ${duration}ms`;

        targets.value.push({
          el,
          isOpen: ref ? display() : binding.value,
          duration,
          durationInSeconds: `${duration / 1000}ms`,
          easing,
          isAnimating: false,
        });

        if (ref) _el.addEventListener("click", () => handleClick(el));
      },
      updated(_el, binding) {
        if (!binding) return;
        if (
          typeof binding?.value === "boolean" &&
          binding?.value !== binding?.oldValue
        ) {
          handleClick(_el);
        }
      },
      getSSRProps() {
        return {};
      },
    });
  },
};

if (typeof window !== "undefined" && window?.Vue) {
  window.Vue.use(toggleSlide);
}

export default toggleSlide;
