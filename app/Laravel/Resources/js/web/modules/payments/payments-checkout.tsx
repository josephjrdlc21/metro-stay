import { useEffect, useState } from "react";
import { useRoute } from "@ziggy";
import { Head } from "@inertiajs/react";

import MainLayout from "@web/layouts/main-layout";

import { Input, Field, Box, Heading, Text, Button } from "@chakra-ui/react";

interface Values {
  page_title: string;
}

declare global {
  interface Window {
    Xendit?: any;
  }
}

export default function PaymentsCheckout({ values }: { values: Values }) {
  const route = useRoute();

  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [xenditLoaded, setXenditLoaded] = useState(false);

  // Load Xendit.js dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.xendit.co/v1/xendit.min.js";
    script.onload = () => {
      if (window.Xendit) {
        window.Xendit.setPublishableKey(
          "xnd_public_development_KhppRkhdXeFojWasa_apFOEjU14c6c5Jbmh9w7ClQd8ayUSSxqab9HfHgYtQnx"
        );
        setXenditLoaded(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    if (!xenditLoaded || !window.Xendit) {
      alert("Xendit.js not ready yet. Please wait.");
      return;
    }

    setLoading(true);

    window.Xendit.card.createToken(
      {
        amount: amount,
        card_number: cardNumber,
        card_exp_month: expMonth,
        card_exp_year: expYear,
        card_cvn: cvv,
        card_holder_first_name: "Juan",
        card_holder_last_name: "Dela Cruz",
        card_holder_email: "juandelacruz@gmail.com",
      },
      (err: any, token: any) => {
        if (err) {
          alert("Tokenization error: " + err.message);
          setLoading(false);
        } else {
          fetch(route("web.payments.payment"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN":
                document
                  .querySelector('meta[name="csrf-token"]')
                  ?.getAttribute("content") || "",
            },
            body: JSON.stringify({
              token_id: token.id,
              amount: amount,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                alert("Payment successful!");
              } else {
                alert("Payment failed: " + data.message);
              }
              setLoading(false);
            })
            .catch((err) => {
              alert("Error: " + err.message);
              setLoading(false);
            });
        }
      }
    );
  };

  return (
    <MainLayout>
      <Head title={values.page_title} />
      <Box mt={10}>
        <Heading size="4xl">Payments</Heading>
        <Text color="gray.500" my={4}>
          Securely view your payment history, settle balances, and download
          receipts for your bookings. Check your bookings to complete your
          payment.
        </Text>
      </Box>

      <Box maxWidth="450px" spaceY={4} mt={10}>
        <Field.Root>
          <Input
            placeholder="Amount To Pay"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Input
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Input
            placeholder="MM"
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Input
            placeholder="YYYY"
            value={expYear}
            onChange={(e) => setExpYear(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Input
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Field.Root>
        <Button onClick={handlePay} loading={loading}>
          CHARGE CARD
        </Button>
      </Box>
    </MainLayout>
  );
}
