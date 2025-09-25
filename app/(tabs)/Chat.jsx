// app/chat.js (if using expo-router)
// Improved Chat UI with Gemini API + Back Button + Typing Indicator
import { Linking } from "react-native";

import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

// Avatars
const AVATARS = {
  assistant: "🤖",
  user: "🧑",
};

const initialMessages = [
  {
    id: "m1",
    sender: "assistant",
    text: "Hi! I am your Gemini assistant. Ask me anything.",
    time: new Date().toISOString(),
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (flatListRef.current && messages.length) {
      setTimeout(
        () => flatListRef.current.scrollToEnd({ animated: true }),
        120
      );
    }
  }, [messages]);

  function renderMessage({ item }) {
  const isUser = item.sender === "user";

  // Helper: highlight links
  function renderTextWithLinks(text) {
    const regex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(part)}
          >
            {part}
          </Text>
        );
      }
      return (
        <Text key={index} style={isUser ? styles.userText : styles.assistantText}>
          {part}
        </Text>
      );
    });
  }

  return (
    <View
      style={[
        styles.messageRow,
        isUser ? styles.messageRowRight : styles.messageRowLeft,
      ]}
    >
      {!isUser && <Text style={styles.avatar}>{AVATARS.assistant}</Text>}
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}
      >
        <Text style={styles.messageText}>{renderTextWithLinks(item.text)}</Text>
        <Text style={styles.timeText}>{formatTime(item.time)}</Text>
      </View>
      {isUser && <Text style={styles.avatar}>{AVATARS.user}</Text>}
    </View>
  );
}

  function formatTime(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  }

  async function handleSend() {
    if (!input.trim()) return;
    const userMessage = {
      id: `m_${Date.now()}`,
      sender: "user",
      text: input.trim(),
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const assistantReply = await callGemini(userMessage.text);

      const assistantMessage = {
        id: `m_${Date.now() + 1}`,
        sender: "assistant",
        text: assistantReply,
        time: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `m_err_${Date.now()}`,
          sender: "assistant",
          text: "⚠️ Sorry — something went wrong while contacting Gemini.",
          time: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  // Gemini API
  async function callGemini(userText) {
const GEMINI_API_KEY = "AIzaSyDlKpGkfK8NPtpZL-tTcnUpQpUJVClhJGU"; 
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userText }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from Gemini"
    );
  }

  // Typing Indicator
  function TypingIndicator() {
    return (
      <View style={styles.typingContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, { animationDelay: "200ms" }]} />
        <View style={[styles.dot, { animationDelay: "400ms" }]} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gemini Assistant</Text>
        <View style={{ width: 40 }} /> {/* Spacer for alignment */}
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
        />

        {isSending && <TypingIndicator />}

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            placeholder={
              isSending ? "Assistant is typing..." : "Type a message"
            }
            value={input}
            onChangeText={setInput}
            editable={!isSending}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, isSending && { backgroundColor: "#888" }]}
            onPress={handleSend}
            disabled={isSending}
          >
            <Text style={styles.sendText}>{isSending ? "..." : "Send"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: "#f9fafb" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  backBtn: { paddingRight: 10 },
  backArrow: { fontSize: 22 },
  headerTitle: { fontSize: 18, fontWeight: "700" },

  messagesContainer: { padding: 14, paddingBottom: 22 },

  // Messages
  messageRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 14 },
  messageRowLeft: { justifyContent: "flex-start" },
  messageRowRight: { justifyContent: "flex-end" },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  assistantBubble: {
    backgroundColor: "#fff",
    marginLeft: 8,
    marginRight: 40,
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#007aff",
    marginLeft: 40,
    marginRight: 8,
    borderTopRightRadius: 4,
  },
  messageText: { fontSize: 15, lineHeight: 20 },
  assistantText: { color: "#222" },
  userText: { color: "#fff" },
  avatar: { fontSize: 26, marginHorizontal: 6 },
  timeText: { fontSize: 10, color: "#666", marginTop: 6, textAlign: "right" },

  // Typing Indicator
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: "#999",
    opacity: 0.6,
  },

  // Composer
  composer: {
    flexDirection: "row",
    padding: 8,
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    backgroundColor: "#fff",
  },
   linkText: {
    color: "#007aff", // iOS blue link color
    textDecorationLine: "underline",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#f2f3f5",
    marginRight: 8,
  },
  sendButton: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#111",
  },
  sendText: { color: "#fff", fontWeight: "600" },
});
