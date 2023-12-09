import { initialize } from "zokrates-js";
import TextEncoder from "fastestsmallesttextencoderdecoder";

const getUintEncodedString = (plainString) => {
  const encoder = new TextEncoder();
  // const plainStringEncoded = encoder.encode(plainString);
  const plainStringEncoded = stringToUint8Array(plainString);
  // 64 length
  const leftPadding = new Array(64 - plainStringEncoded.length).fill(0);
  const u8FinalArray = [...leftPadding, ...plainStringEncoded];
  if (u8FinalArray.length !== 64) {
    throw new Error("Input array must have exactly 64 elements.");
  }

  const u32Array = new Uint32Array(16);
  u32Array.map((v) => v.toString());
  for (let i = 0; i < u32Array.length; i++) {
    // Combine four uint8 values to form a uint32 value
    u32Array[i] =
      (u8FinalArray[i * 4] << 24) |
      (u8FinalArray[i * 4 + 1] << 16) |
      (u8FinalArray[i * 4 + 2] << 8) |
      u8FinalArray[i * 4 + 3];
  }

  const numericU32Array = [];
  u32Array.forEach((element) => {
    numericU32Array.push(element.toString());
  });
  return numericU32Array;
};

const getSha256Hash = async (uint32Array) => {
  console.log({ uint32Array });
  try {
    const zokratesProvider = await initialize();
    const source =
      'import "hashes/sha256/512bit" as sha256; import "utils/pack/u32/pack128" as pack128; def main(u32[16] hashMe) -> field[2] { u32[8] lhs = [...hashMe[0..8]]; u32[8] rhs = [...hashMe[8..16]]; u32[8] r = sha256(lhs, rhs); return [pack128(r[0..4]), pack128(r[4..8])];}';
    // compilation
    const artifacts = zokratesProvider.compile(source);
    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [
      uint32Array,
    ]);
    console.log("output", output);
    const lineBreakCleanedOutput = output.split("\n");
    const cleanedArray = [...lineBreakCleanedOutput.slice(1, 3)].map((item) => {
      // Trim whitespace and remove quotes and trailing commas
      return item.trim().replace(/^"|"|,$/g, "");
    });

    console.log({ cleanedArray });
    return cleanedArray;
  } catch (error) {
    throw new Error(error);
  }
};

function stringToUint8Array(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0x80) {
      bytes.push(charCode);
    } else if (charCode < 0x800) {
      bytes.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      bytes.push(
        0xe0 | (charCode >> 12),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    } else {
      // surrogate pair
      i++;
      // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      const charCode2 = str.charCodeAt(i);
      const surrogateCharCode =
        0x10000 + (((charCode & 0x3ff) << 10) | (charCode2 & 0x3ff));
      bytes.push(
        0xf0 | (surrogateCharCode >> 18),
        0x80 | ((surrogateCharCode >> 12) & 0x3f),
        0x80 | ((surrogateCharCode >> 6) & 0x3f),
        0x80 | (surrogateCharCode & 0x3f)
      );
    }
  }
  return new Uint8Array(bytes);
}

export const generateStringHashMy = async (plainString) => {
  try {
    const uint32Encoded = getUintEncodedString(plainString);
    const hashedString = await getSha256Hash(uint32Encoded);
    console.log({ hashedString });
    return hashedString;
  } catch (error) {
    console.error(error);
  }
};
