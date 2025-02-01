"use client";

import { Input, Tooltip } from "@heroui/react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useId, useMemo, useState, useEffect } from "react";

export default function PasswordInput({ value, onChange, errorMessage }) {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false); //default hidden
  const [tooltipPlacement, setTooltipPlacement] = useState("left"); //default placement

  //change Placement a tooltip when the screen size is less than 640px to bottom
  useEffect(() => {
    const handleResize = () => {
      setTooltipPlacement(
        window.matchMedia("(max-width: 640px)").matches ? "bottom" : "left"
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   show and hide password function
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  //   password strength function
  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);

  //password strength score function
  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  return (
    <Tooltip
      placement={tooltipPlacement}
      delay={2000}
      offset={22}
      showArrow={true}
      isOpen={value && strengthScore < 4}
      content={
        <>
          <div
            className="  mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>

          <p
            id={`${id}-description`}
            className="mb-2 text-sm font-medium text-foreground"
          >
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <Check
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <X
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      }
    >
      <Input
        variant="bordered"
        id={id}
        label="Password"
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        aria-invalid={strengthScore < 4}
        aria-describedby={`${id}-description`}
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
        endContent={
          <button
            className=" text-gray-400"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff aria-hidden="true" />
            ) : (
              <Eye aria-hidden="true" />
            )}
          </button>
        }
      />
    </Tooltip>
  );
}