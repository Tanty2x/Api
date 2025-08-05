const queues = new Map();

/**
 * Đảm bảo xử lý tuần tự cho từng khóa (ví dụ: theo `userId`, `name`, ...)
 * @param {string} key - Khóa duy nhất để xác định hàng đợi (vd: name, userId)
 * @param {Function} task - Hàm async cần thực thi tuần tự
 * @returns {Promise<any>}
 */
export function enqueue(key, task) {
    if (!queues.has(key)) {
        queues.set(key, Promise.resolve());
    }

    const currentQueue = queues.get(key);

    // ✅ KHÔNG catch lỗi ở đây nữa
    const nextTask = currentQueue.then(() => task());

    queues.set(key, nextTask);
    return nextTask;
}

