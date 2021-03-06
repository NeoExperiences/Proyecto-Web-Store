import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useTextInput } from "../../SharedHooks/customHooks";

export const ReplyBox = ({ articleID, commentID, refreshReplies }) => {
  const [userReply, setReply] = useTextInput("");
  const [enableReplyBox, setEnableReplyBox] = useState(false);
  const submitReply = async (event) => {
    event.preventDefault();
    if (userReply !== "") {
      try {
        const response = await fetch(
          `http://localhost:5000/articles/${articleID}/comments/${commentID}/replies`,
          {
            method: "post",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userReply }),
          }
        );
        if (response.ok) {
          toggleBox();
          refreshReplies();
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const toggleBox = () => {
    if (enableReplyBox) setEnableReplyBox(false);
    else setEnableReplyBox(true);
  };

  return (
    <div style={{ textAlign: "right" }}>
      {enableReplyBox ? (
        <Form onSubmit={submitReply}>
          <Button variant="warning" onClick={toggleBox}>
            Cerrar
          </Button>
          <Form.Label></Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              onChange={setReply}
              value={userReply}
              rows={5}
            />
            <Form.Control className="nt-3" type="submit" />
          </Form.Group>
        </Form>
      ) : (
        <div>
          <Image
            as={Button}
            onClick={toggleBox}
            src="https://i.imgur.com/zzRDt8e.png"
            alt="Reply Button"
          />
        </div>
      )}
    </div>
  );
};
