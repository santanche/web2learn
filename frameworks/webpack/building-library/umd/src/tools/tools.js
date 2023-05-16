export class Tools {
  static zeroPad (number, length) {
    return String(number).padStart(length, '0')
  }
}