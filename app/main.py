from chatbot import ask_bot

print("🔍 Smart Campus Bot Ready. Ask your question (type 'exit' to quit):\n")
while True:
    question = input("🧑 You: ")
    if question.lower() == "exit":
        break
    answer = ask_bot(question)
    print("🤖 Bot:", answer)
